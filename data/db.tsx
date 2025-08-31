import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Raw DB schemas
export const SlotSchema = z.enum(['head', 'neck', 'torso', 'legs', 'feet']);
export type Slot = z.infer<typeof SlotSchema>;

export const ImageSchema = z.object({
  uri: z.url(),
  width: z.number(),
  height: z.number(),
});
export type Image = z.infer<typeof ImageSchema>;

export const ClothDBSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slot: SlotSchema,
  photo: ImageSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ClothDB = z.infer<typeof ClothDBSchema>;

export const OutfitDBSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  clothIds: z.array(z.uuid()),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type OutfitDB = z.infer<typeof OutfitDBSchema>;

// Zustand store for raw data
interface WardrobeDB {
  clothes: Record<string, ClothDB>;
  outfits: Record<string, OutfitDB>;
}

interface WardrobeActions {
  addCloth: (cloth: Omit<ClothDB, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCloth: (
    id: string,
    updates: Partial<Omit<ClothDB, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void;
  deleteCloth: (id: string) => void;
  addOutfit: (outfit: Omit<OutfitDB, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOutfit: (
    id: string,
    updates: Partial<Omit<OutfitDB, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void;
  deleteOutfit: (id: string) => void;
}

export const useWardrobeStore = create<WardrobeDB & WardrobeActions>()(
  persist(
    (set, get) => ({
      clothes: {},
      outfits: {},

      addCloth: (clothData) => {
        const id = uuid.v4() as string;
        const now = new Date();
        const cloth: ClothDB = {
          ...clothData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          clothes: { ...state.clothes, [id]: cloth },
        }));
      },

      updateCloth: (id, updates) =>
        set((state) => ({
          clothes: {
            ...state.clothes,
            [id]: {
              ...state.clothes[id],
              ...updates,
              updatedAt: new Date(),
            },
          },
        })),

      deleteCloth: (id) =>
        set((state) => {
          const { [id]: deleted, ...remaining } = state.clothes;
          return { clothes: remaining };
        }),

      addOutfit: (outfitData) => {
        const id = uuid.v4() as string;
        const now = new Date();
        const outfit: OutfitDB = {
          ...outfitData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          outfits: { ...state.outfits, [id]: outfit },
        }));
      },

      updateOutfit: (id, updates) =>
        set((state) => ({
          outfits: {
            ...state.outfits,
            [id]: {
              ...state.outfits[id],
              ...updates,
              updatedAt: new Date(),
            },
          },
        })),

      deleteOutfit: (id) =>
        set((state) => {
          const { [id]: deleted, ...remaining } = state.outfits;
          return { outfits: remaining };
        }),
    }),
    {
      name: 'wardrobe-db',
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
