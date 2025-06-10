import { UserType } from '@/interfaces/user-type';
import { create } from 'zustand';

interface AuthState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
