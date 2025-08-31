import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClothDB, OutfitDB, useWardrobeStore } from './db';
import { ClothClient, OutfitClient, Slot } from './models';
import { joinClothData, joinOutfitData, joinClothesBySlot } from './joins';

// Async functions that return client models
const fetchClothes = async (): Promise<ClothClient[]> => {
  const store = useWardrobeStore.getState();
  return Object.values(store.clothes).map(joinClothData);
};

const fetchCloth = async (id: string): Promise<ClothClient | null> => {
  const store = useWardrobeStore.getState();
  const cloth = store.clothes[id];
  return cloth ? joinClothData(cloth) : null;
};

const fetchOutfits = async (): Promise<OutfitClient[]> => {
  const store = useWardrobeStore.getState();
  return Object.values(store.outfits).map((outfit) => joinOutfitData(outfit, store.clothes));
};

const fetchOutfit = async (id: string): Promise<OutfitClient | null> => {
  const store = useWardrobeStore.getState();
  const outfit = store.outfits[id];
  return outfit ? joinOutfitData(outfit, store.clothes) : null;
};

const fetchClothesBySlot = async (): Promise<Record<Slot, ClothClient[]>> => {
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
    mutationFn: async (clothData: Omit<ClothDB, 'id' | 'createdAt' | 'updatedAt'>) => {
      addCloth(clothData);
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
