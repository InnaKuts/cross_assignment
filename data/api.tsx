import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OutfitDB, useWardrobeStore } from './db';
import { Cloth, Outfit, Slot } from './models';
import { joinClothData, joinOutfitData, joinClothesBySlot } from './joins';

// Async functions that return client models
const fetchClothes = async (): Promise<Cloth[]> => {
  const store = useWardrobeStore.getState();
  return Object.values(store.clothes).map(joinClothData);
};

const fetchCloth = async (id: string): Promise<Cloth | null> => {
  const store = useWardrobeStore.getState();
  const cloth = store.clothes[id];
  return cloth ? joinClothData(cloth) : null;
};

const fetchOutfits = async (): Promise<Outfit[]> => {
  const store = useWardrobeStore.getState();
  return Object.values(store.outfits).map((outfit) => joinOutfitData(outfit, store.clothes));
};

const fetchOutfit = async (id: string): Promise<Outfit | null> => {
  const store = useWardrobeStore.getState();
  const outfit = store.outfits[id];
  return outfit ? joinOutfitData(outfit, store.clothes) : null;
};

const fetchClothesBySlot = async (): Promise<Record<Slot, Cloth[]>> => {
  const store = useWardrobeStore.getState();
  return joinClothesBySlot(store.clothes);
};

// React Query hooks
export const useClothes = () => {
  return useQuery({
    queryKey: ['clothes'],
    queryFn: fetchClothes,
  });
};

export const useCloth = (id: string) => {
  return useQuery({
    queryKey: ['clothes', id],
    queryFn: () => fetchCloth(id),
    enabled: !!id,
  });
};

export const useOutfits = () => {
  return useQuery({
    queryKey: ['outfits'],
    queryFn: fetchOutfits,
  });
};

export const useOutfit = (id: string) => {
  return useQuery({
    queryKey: ['outfits', id],
    queryFn: () => fetchOutfit(id),
    enabled: !!id,
  });
};

export const useClothesBySlot = () => {
  return useQuery({
    queryKey: ['clothes', 'bySlot'],
    queryFn: fetchClothesBySlot,
  });
};

// Mutation hooks
export const useCreateCloth = () => {
  const queryClient = useQueryClient();
  const addCloth = useWardrobeStore((state) => state.addCloth);

  return useMutation({
    mutationFn: async (clothData: Omit<Cloth, 'id' | 'createdAt' | 'updatedAt'>) => {
      addCloth(clothData);
      return clothData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
      queryClient.invalidateQueries({ queryKey: ['clothes', 'bySlot'] });
    },
  });
};

export const useUpdateCloth = () => {
  const queryClient = useQueryClient();
  const updateCloth = useWardrobeStore((state) => state.updateCloth);

  return useMutation({
    mutationFn: async (clothData: Omit<Cloth, 'createdAt' | 'updatedAt'>) => {
      updateCloth(clothData.id, clothData);
      return clothData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clothes'] });
      queryClient.invalidateQueries({ queryKey: ['clothes', 'bySlot'] });
    },
  });
};

export const useCreateOutfit = () => {
  const queryClient = useQueryClient();
  const addOutfit = useWardrobeStore((state) => state.addOutfit);

  return useMutation({
    mutationFn: async (outfitData: Omit<OutfitDB, 'id' | 'createdAt' | 'updatedAt'>) => {
      addOutfit(outfitData);
      return outfitData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outfits'] });
    },
  });
};
