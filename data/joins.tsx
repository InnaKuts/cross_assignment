import { ClothDB, OutfitDB, Slot } from './db';
import { Cloth, Outfit } from './models';

export const joinClothData = (clothDB: ClothDB): Cloth => {
  return {
    ...clothDB,
  };
};

export const joinOutfitData = (outfitDB: OutfitDB, clothesDB: Record<string, ClothDB>): Outfit => {
  const clothes = outfitDB.clothIds
    .map((id) => clothesDB[id])
    .filter(Boolean)
    .map(joinClothData);

  const clothesBySlot = clothes.reduce(
    (acc, cloth) => {
      if (!acc[cloth.slot]) {
        acc[cloth.slot] = [];
      }
      acc[cloth.slot].push(cloth);
      return acc;
    },
    {} as Record<Slot, Cloth[]>
  );

  return {
    id: outfitDB.id,
    name: outfitDB.name,
    clothes,
    clothesBySlot,
    createdAt: outfitDB.createdAt,
    updatedAt: outfitDB.updatedAt,
  };
};

export const joinClothesBySlot = (clothesDB: Record<string, ClothDB>) => {
  const clothes = Object.values(clothesDB).map(joinClothData);

  return clothes.reduce(
    (acc, cloth) => {
      if (!acc[cloth.slot]) {
        acc[cloth.slot] = [];
      }
      acc[cloth.slot].push(cloth);
      return acc;
    },
    {} as Record<Slot, Cloth[]>
  );
};
