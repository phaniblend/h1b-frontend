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
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateUser: (updates: Partial<User>) => void;
  initializeAuth: () => void;
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
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        await handleApiError(response);
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

  register: async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    set({ isLoading: true });
    try {
      const requestBody: any = { firstName, lastName, email, password };
      if (phone) {
        requestBody.phone = phone;
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        await handleApiError(response);
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
  
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ 
        token, 
        user: JSON.parse(user), 
        isAuthenticated: true 
      });
      // TODO: Validate token with backend
    } else if (token) {
      // If we have a token but no user data, create a mock user for demo
      const mockUser = {
        id: '1',
        email: 'demo@h1bconnect.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user'
      };
      set({ 
        token, 
        user: mockUser, 
        isAuthenticated: true 
      });
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  },
})); 