import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useRef } from 'react';

const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
};

export interface User {
  id: string;
  name: string;
  isAnonymous: boolean;
  createdAt: Date;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserName: (name: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUserName: (name) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, name } });
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export const useUser = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || user) {
      return;
    }
    initialized.current = true;
    const newUser = {
      id: `user_${generateId()}`,
      name: 'Anonymous User',
      isAnonymous: true,
      createdAt: new Date(),
    };
    setUser(newUser);
  }, [user, setUser]);

  return user;
};

export const useResetUser = () => useAuthStore((state) => state.clearUser);

export const useUpdateUserName = () => useAuthStore((state) => state.updateUserName);

export const useUserId = () => useAuthStore((state) => state.user?.id);
