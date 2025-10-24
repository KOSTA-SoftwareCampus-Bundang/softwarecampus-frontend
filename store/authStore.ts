import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  role: 'admin' | 'user' | 'academy';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (id: string, password: string) => boolean;
  logout: () => void;
}

// 임시 계정 데이터
const TEMP_ACCOUNTS = {
  admin: { id: 'admin', password: 'test', role: 'admin' as const },
  user: { id: 'user', password: 'test', role: 'user' as const },
  academy: { id: 'academy', password: 'user', role: 'academy' as const }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (id: string, password: string) => {
        const account = TEMP_ACCOUNTS[id as keyof typeof TEMP_ACCOUNTS];
        
        if (account && account.password === password) {
          set({
            user: { id: account.id, role: account.role },
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
