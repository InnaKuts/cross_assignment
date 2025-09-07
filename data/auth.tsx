import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export interface User {
  id: string;
  isAnonymous: boolean;
  createdAt: Date;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const generateUserId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `user_${random}.${timestamp}`;
};

const generateUser = (): User => {
  return {
    id: generateUserId(),
    isAnonymous: true,
    createdAt: new Date(),
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
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

export const authQueryOptions = {
  queryKey: ['auth', 'init'],
  queryFn: async (): Promise<User> => {
    const { user, setUser } = useAuthStore.getState();
    if (user) {
      return user;
    }

    const newUser = generateUser();
    setUser(newUser);
    return newUser;
  },
  staleTime: Infinity,
  gcTime: Infinity,
};

export const useAuth = <T = User,>(select?: (user: User) => T) =>
  useQuery({
    ...authQueryOptions,
    select,
  });

export const useUserId = () => useAuth((user) => user.id);

export const useResetAuth = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useCallback(() => {
    clearUser();
    queryClient.invalidateQueries({ queryKey: authQueryOptions.queryKey });
  }, [clearUser, queryClient]);
};
