import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (userData: User) => {
        localStorage.setItem('astronomy-token', userData.token);
        set({ user: userData, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('astronomy-token');
        set({ user: null, isAuthenticated: false });
      },
      checkAuth: async () => {
        const token = localStorage.getItem('astronomy-token');
        if (!token) return false;
        
        try {
          // If profile endpoint exists, we can verify the token
          const res = await api.get('/auth/profile');
          if (res.data) {
            set({ user: { ...get().user, ...res.data, token }, isAuthenticated: true });
            return true;
          }
        } catch (error) {
          get().logout();
        }
        return false;
      }
    }),
    {
      name: 'astronomy-auth-storage',
    }
  )
);
