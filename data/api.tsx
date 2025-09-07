import { Cloth, Outfit, ClothSchema, OutfitSchema } from './models';

const API_BASE_URL = 'https://683ab5db43bb370a86737e12.mockapi.io/api/v1';

export const clothesApi = {
  get: (userId: string) => ({
    queryKey: ['clothes', 'user', userId] as const,
    queryFn: async (): Promise<Cloth[]> => {
      const response = await fetch(`${API_BASE_URL}/clothes?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch clothes');
      const data = await response.json();
      return data.map((item: unknown) => ClothSchema.parse(item));
    },
    enabled: !!userId,
  }),

  // Mutations
  create: () => ({
    mutationFn: async (
      clothData: Omit<Cloth, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Cloth> => {
      const response = await fetch(`${API_BASE_URL}/clothes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clothData),
      });
      if (!response.ok) throw new Error('Failed to create cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
  }),

  update: () => ({
    mutationFn: async ({
      id,
      ...clothData
    }: Omit<Cloth, 'createdAt' | 'updatedAt'>): Promise<Cloth> => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clothData),
      });
      if (!response.ok) throw new Error('Failed to update cloth');
      const data = await response.json();
      return ClothSchema.parse(data);
    },
  }),

  delete: () => ({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/clothes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete cloth');
    },
  }),
};

export const outfitsApi = {
  get: (userId: string) => ({
    queryKey: ['outfits', 'user', userId] as const,
    queryFn: async (): Promise<Outfit[]> => {
      const response = await fetch(`${API_BASE_URL}/outfits?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch outfits');
      const data = await response.json();
      return data.map((item: unknown) => OutfitSchema.parse(item));
    },
    enabled: !!userId,
  }),

  create: () => ({
    mutationFn: async (
      outfitData: Omit<Outfit, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<Outfit> => {
      const response = await fetch(`${API_BASE_URL}/outfits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outfitData),
      });
      if (!response.ok) throw new Error('Failed to create outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
  }),

  update: () => ({
    mutationFn: async ({
      id,
      ...outfitData
    }: Omit<Outfit, 'createdAt' | 'updatedAt'>): Promise<Outfit> => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outfitData),
      });
      if (!response.ok) throw new Error('Failed to update outfit');
      const data = await response.json();
      return OutfitSchema.parse(data);
    },
  }),

  delete: () => ({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/outfits/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete outfit');
    },
  }),
};
