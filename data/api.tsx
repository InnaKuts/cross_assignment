import { z } from 'zod';
import { ClothDB, OutfitDB, ClothDBSchema, OutfitDBSchema } from './schema';

const API_BASE_URL = 'https://683ab5db43bb370a86737e12.mockapi.io/api/v1';

const tryParse = <T, S extends z.ZodType<T>>(data: unknown, schema: S): T | null => {
  try {
    return schema.parse(data);
  } catch {
    return null;
  }
};

const tryParseArray = <T, S extends z.ZodType<T>>(data: unknown, schema: S): T[] => {
  if (!Array.isArray(data)) throw new Error('Expected data to be an array');
  return data.map((item) => tryParse<T, S>(item, schema)).filter((item) => item !== null);
};

export const clothesApi = {
  get: (userId: Pick<ClothDB, 'userId'>) => ({
    queryKey: ['clothes', 'user', userId] as const,
    queryFn: async (): Promise<Record<string, ClothDB>> => {
      const response = await fetch(`${API_BASE_URL}/clothes?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch clothes');
      const data = await response.json();
      const list = tryParseArray<ClothDB, typeof ClothDBSchema>(data, ClothDBSchema);
      return Object.fromEntries(list.map((cloth) => [cloth.id, cloth]));
    },
    enabled: !!userId,
  }),

  // Mutations
  create: () => ({
    mutationFn: async (clothData: ClothDB): Promise<ClothDB> => {
      const response = await fetch(`${API_BASE_URL}/clothes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clothData),
      });
      if (!response.ok) throw new Error('Failed to create cloth');
      const data = await response.json();
      return ClothDBSchema.parse(data);
    },
  }),

  update: () => ({
    mutationFn: async ({
      id,
      ...clothData
    }: Pick<ClothDB, 'id'> & Partial<Omit<ClothDB, 'id'>>): Promise<ClothDB> => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clothData),
      });
      if (!response.ok) throw new Error('Failed to update cloth');
      const data = await response.json();
      return ClothDBSchema.parse(data);
    },
  }),

  delete: () => ({
    mutationFn: async (id: Pick<ClothDB, 'id'>): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete cloth');
    },
  }),
};

export const outfitsApi = {
  get: (userId: Pick<OutfitDB, 'userId'>) => ({
    queryKey: ['outfits', 'user', userId] as const,
    queryFn: async (): Promise<Record<string, OutfitDB>> => {
      const response = await fetch(`${API_BASE_URL}/outfits?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch outfits');
      const data = await response.json();
      const list = tryParseArray<OutfitDB, typeof OutfitDBSchema>(data, OutfitDBSchema);
      return Object.fromEntries(list.map((outfit) => [outfit.id, outfit]));
    },
    enabled: !!userId,
  }),

  create: () => ({
    mutationFn: async (outfitData: OutfitDB): Promise<OutfitDB> => {
      const response = await fetch(`${API_BASE_URL}/outfits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outfitData),
      });
      if (!response.ok) throw new Error('Failed to create outfit');
      const data = await response.json();
      return OutfitDBSchema.parse(data);
    },
  }),

  update: () => ({
    mutationFn: async ({
      id,
      ...outfitData
    }: Pick<OutfitDB, 'id'> & Partial<Omit<OutfitDB, 'id'>>): Promise<OutfitDB> => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outfitData),
      });
      if (!response.ok) throw new Error('Failed to update outfit');
      const data = await response.json();
      return OutfitDBSchema.parse(data);
    },
  }),

  delete: () => ({
    mutationFn: async (id: Pick<OutfitDB, 'id'>): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete outfit');
    },
  }),
};
