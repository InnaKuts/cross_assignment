import { z } from 'zod';
import { Cloth, Outfit, ClothSchema, OutfitSchema } from './models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserId } from './auth';

type IdData = {
  id: string;
};

type ClothData = Omit<Cloth, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

type OutfitData = Omit<Outfit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

const API_BASE_URL = 'https://683ab5db43bb370a86737e12.mockapi.io/api/v1';

const safeParseArray = <T, S extends z.ZodType<T>>(data: unknown, schema: S): T[] => {
  if (!Array.isArray(data)) throw new Error('Expected data to be an array');

  const parsedItems: T[] = [];
  for (const item of data) {
    try {
      parsedItems.push(schema.parse(item));
    } catch (error) {
      console.warn('Skipping invalid item:', error);
    }
  }
  return parsedItems;
};

export const useClothes = <T = Cloth[],>({ select }: { select?: (clothes: Cloth[]) => T }) => {
  const userId = useUserId();

  return useQuery({
    queryKey: ['clothes', userId] as const,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/clothes?userId=${userId}`);
      if (response.status === 404) return [];
      if (!response.ok) throw new Error('Failed to fetch clothes');
      const data = await response.json();
      return safeParseArray<Cloth, typeof ClothSchema>(data, ClothSchema);
    },
    select,
  });
};

export const useCloth = (id: string) => {
  const userId = useUserId();
  return useQuery({
    queryKey: ['cloth', id, userId] as const,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
  });
};

export const useCreateCloth = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();

  return useMutation({
    mutationFn: async (clothData: ClothData) => {
      const body = {
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...clothData,
      };
      ClothSchema.omit({ id: true }).parse(body);
      const response = await fetch(`${API_BASE_URL}/clothes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to create cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['cloth', result.id, result.userId], result);
      queryClient.invalidateQueries({ queryKey: ['clothes', result.userId] });
    },
  });
};

export const useUpdateCloth = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();
  return useMutation({
    mutationFn: async ({ id, ...clothData }: Partial<ClothData> & IdData) => {
      const body = {
        ...clothData,
        id,
        userId,
        updatedAt: new Date().toISOString(),
      };
      ClothSchema.partial({ name: true, slot: true, photo: true, createdAt: true }).parse(body);
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to update cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['cloth', result.id, result.userId], result);
      queryClient.invalidateQueries({ queryKey: ['clothes', result.userId] });
    },
  });
};

export const useDeleteCloth = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['cloth', result.id, result.userId] });
      queryClient.invalidateQueries({ queryKey: ['clothes', result.userId] });
    },
  });
};

export const useOutfits = <T = Outfit[],>({ select }: { select?: (outfits: Outfit[]) => T }) => {
  const userId = useUserId();
  return useQuery({
    queryKey: ['outfits', userId] as const,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/outfits?userId=${userId}`);
      if (response.status === 404) return [];
      if (!response.ok) throw new Error('Failed to fetch outfits');
      const data = await response.json();
      return safeParseArray<Outfit, typeof OutfitSchema>(data, OutfitSchema);
    },
    select,
  });
};

export const useOutfit = (id: string) => {
  const userId = useUserId();
  return useQuery({
    queryKey: ['outfit', id, userId] as const,
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`);
      if (!response.ok) throw new Error('Failed to fetch outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
  });
};

export const useCreateOutfit = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();
  return useMutation({
    mutationFn: async (outfitData: OutfitData) => {
      const body = {
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...outfitData,
      };
      OutfitSchema.omit({ id: true }).parse(body);
      const response = await fetch(`${API_BASE_URL}/outfits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to create outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['outfit', result.id, result.userId], result);
      queryClient.invalidateQueries({ queryKey: ['outfits', result.userId] });
    },
  });
};

export const useUpdateOutfit = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();
  return useMutation({
    mutationFn: async ({ id, ...outfitData }: Partial<OutfitData> & IdData) => {
      const body = {
        ...outfitData,
        id,
        userId,
        updatedAt: new Date().toISOString(),
      };
      OutfitSchema.partial({ name: true, clothes: true, createdAt: true }).parse(body);
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Failed to update outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['outfit', result.id, result.userId], result);
      queryClient.invalidateQueries({ queryKey: ['outfits', result.userId] });
    },
  });
};

export const useDeleteOutfit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['outfit', result.id, result.userId] });
      queryClient.invalidateQueries({ queryKey: ['outfits', result.userId] });
    },
  });
};
