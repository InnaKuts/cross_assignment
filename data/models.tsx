import { z } from 'zod';

export const SlotSchema = z.enum(['head', 'neck', 'torso', 'legs', 'feet']);
export type Slot = z.infer<typeof SlotSchema>;

export const ImageSchema = z.object({
  uri: z.url(),
  width: z.number(),
  height: z.number(),
});
export type Image = z.infer<typeof ImageSchema>;

export const ClothSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  name: z.string().nonempty(),
  slot: SlotSchema,
  photo: z.object({
    source: ImageSchema.nullable(),
  }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Cloth = z.infer<typeof ClothSchema>;

export const OutfitSchema = z.object({
  id: z.string().nonempty(),
  userId: z.string().nonempty(),
  name: z.string().nonempty(),
  clothes: z.array(ClothSchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Outfit = z.infer<typeof OutfitSchema>;
