import { z } from 'zod';
import { SlotSchema } from './db';

export { SlotSchema, Slot } from './db';

// Client schemas (joined, enriched data)
export const ClothClientSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slot: SlotSchema,
  photo: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ClothClient = z.infer<typeof ClothClientSchema>;

export const OutfitClientSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  clothes: z.array(ClothClientSchema),
  clothesBySlot: z.record(SlotSchema, z.array(ClothClientSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type OutfitClient = z.infer<typeof OutfitClientSchema>;
