import { create } from 'zustand';

// Debug: Log environment variables
console.log('Environment variables:', {
  VITE_API_URL: (import.meta as any).env.VITE_API_URL,
  PROD: (import.meta as any).env.PROD,
  MODE: (import.meta as any).env.MODE,
  NODE_ENV: process.env.NODE_ENV
});

// Force the correct API URL for now
const API_BASE_URL = 'https://freedom-be-production.up.railway.app/api';

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
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateUser: (updates: Partial<User>) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
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
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      localStorage.setItem('token', data.token);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (firstName: string, lastName: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      // Registration successful - auto-login
      await get().login(email, password);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
    // Redirect to homepage after logout
    window.location.href = '/';
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
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
    if (token) {
      set({ token, isAuthenticated: true });
      // TODO: Validate token with backend
    }
  },
})); 