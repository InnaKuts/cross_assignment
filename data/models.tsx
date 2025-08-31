import { z } from 'zod';
import { SlotSchema } from './db';

export { SlotSchema, Slot } from './db';

export const ClothSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slot: SlotSchema,
  photo: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Cloth = z.infer<typeof ClothSchema>;

export const OutfitSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  clothes: z.array(ClothSchema),
  clothesBySlot: z.record(SlotSchema, z.array(ClothSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Outfit = z.infer<typeof OutfitSchema>;
