# Overview

StyleSnap lets you add clothes with photos, browse your wardrobe, and edit items. The purpose is to make managing clothes and building looks simple and enjoyable. Before the final improvements, the app didn't have a complete "compose an outfit" flow or an easy way to pick items for specific body slots. This iteration focuses on adding that missing flow while keeping the app lightweight and easy to use.

- Core: wardrobe to manage clothes with photos; `Cloth` CRUD (add/edit/delete).
- Structure: Tab navigation (`Wardrobe`, `Outfits`, `Settings`) + Stack (`Cloth`, `Overview`).
- Data: TanStack Query hooks (`useClothes`, `useCloth`) with Zod schemas for validation.
- UI: `CardsGrid` + `Card` for lists, basic error/empty/loading states, theme via `ThemeContext`.
- Gaps: no outfit management flow, no per-slot selection, basic parameter passing.

## What was selected and why

- Outfit management: key user need to compose looks.
- Cloth selection modal: natural per-slot selection flow.
- API slot filter: nedded for per-slot selection.
- UX polish: clearer errors.

## Implemented solutions

- Screens: `OutfitsScreen` (list) and `OutfitScreen` (edit, per-slot rows with add/remove).
- Selection: `SelectClothScreen` (modal) filters by `slot`; returns the chosen cloth to caller via param merge.
- API: `useClothes({ slot })` adds server-side filtering with React Query caching.
- Components: `CardsRow` for slot rows; reuse `CardsGrid`.

## Navigation pattern (concise)

```ts
navigation.navigate(SCREENS.SELECT_CLOTH, {
  slot: 'torso',
  returnToScreen: SCREENS.OUTFIT,
});
// In SelectClothScreen on select
navigation.navigate({ name: returnToScreen, params: { selectedCloth: item }, merge: true });
```

## State management

- Context API for theme.
- TanStack Query for server state (fetching/caching/invalidations).
- Zustand for shared state management.

## Impact

- Outfit creation; clear per-slot selection.
- Predictable param passing with modal flow.
- Cleaner, reusable components; strict typing.

## 📱 Screenshots

| Screen        | Phone                                                       | Tablet                                                        |
| ------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| Wardrobe      | ![Wardrobe Phone](assets/phone/screen_wardrobe.jpg)         | ![Wardrobe Tablet](assets/tablet/screen_wardrobe.jpg)         |
| Outfits       | ![Outfits Phone](assets/phone/screen_outfits.jpg)           | ![Outfits Tablet](assets/tablet/screen_outfits.jpg)           |
| Cloth Details | ![Cloth Phone](assets/phone/screen_cloth.jpg)               | ![Cloth Tablet](assets/tablet/screen_cloth.jpg)               |
| Outfit Editor | ![Outfit Phone](assets/phone/screen_outfit.jpg)             | ![Outfit Tablet](assets/tablet/screen_outfit.jpg)             |
| Select Cloth  | ![Select Cloth Phone](assets/phone/screen_select_cloth.jpg) | ![Select Cloth Tablet](assets/tablet/screen_select_cloth.jpg) |
