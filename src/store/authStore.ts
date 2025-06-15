import { create } from 'zustand';

// Debug: Log environment variables
console.log('Environment variables:', {
  VITE_API_URL: (import.meta as any).env.VITE_API_URL,
  PROD: (import.meta as any).env.PROD,
  MODE: (import.meta as any).env.MODE,
  NODE_ENV: process.env.NODE_ENV
});

// Force the correct API URL for now
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'http://localhost:5000/api';
console.log('Using API_BASE_URL:', API_BASE_URL);

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateUser: (updates: Partial<User>) => void;
  initializeAuth: () => void;
  validateToken: () => Promise<boolean>;
}

// Add error logging
const handleApiError = async (response: Response) => {
  try {
    const error = await response.json();
    throw new Error(error.message || `API Error: ${response.status}`);
  } catch (e) {
    throw new Error(`Failed with status: ${response.status}`);
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Clear any existing auth state before login
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // Add cache control to prevent caching issues
        cache: 'no-cache',
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Login failed. Please check your credentials.';
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // If JSON parsing fails, use the raw text or default message
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (firstName: string, lastName: string, email: string, password: string, _phone?: string) => {
    set({ isLoading: true });
    try {
      // Note: Backend currently doesn't accept phone field, so we exclude it for now
      const requestBody = { firstName, lastName, email, password };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Registration failed. Please try again.';
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.details && Array.isArray(errorData.details)) {
            errorMessage = errorData.details.join(', ');
          }
        } catch (e) {
          // If JSON parsing fails, use the raw text or default message
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Don't auto-login since email verification is required
      set({ isLoading: false });
      
      // Return success - user needs to verify email before login
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    const currentToken = get().token;
    
    // Clear frontend state immediately
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Try to call backend logout to invalidate token
    if (currentToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`,
          },
        });
      } catch (error) {
        // If logout fails, we've already cleared frontend state
        console.warn('Backend logout failed:', error);
      }
    }
    
    // Redirect to homepage after logout
    window.location.href = '/';
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  setToken: (token: string) => {
    set({ token, isAuthenticated: true });
    localStorage.setItem('token', token);
  },

  updateUser: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      set({ user: updatedUser });
    }
  },

  validateToken: async () => {
    const token = get().token;
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          set({ user: data.user, isAuthenticated: true });
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return true;
      } else {
        // Token is invalid, clear auth state
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
    } catch (error) {
      console.warn('Token validation failed:', error);
      return false;
    }
  },

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ 
        token, 
        user: JSON.parse(user), 
        isAuthenticated: true 
      });
      // Validate token with backend in the background
      get().validateToken();
    } else if (token) {
      // If we have a token but no user data, validate it
      get().validateToken();
    }
  },
})); 