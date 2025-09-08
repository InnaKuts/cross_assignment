# API Integration Documentation

## Overview

This application integrates with a mock API service to manage clothing items and outfits data. The implementation has proper state management and error handling.

## Video Demo

![API Integration Demo](assets/api.mp4)

## API Service

### MockAPI.io Integration

I use **MockAPI.io** as our backend service for managing data:

- **Base URL**: `https://683ab5db43bb370a86737e12.mockapi.io/api/v1`
- **Endpoints**:
  - `/clothes` - Clothing items management
  - `/outfits` - Outfits management

### API Structure

```typescript
// Clothes endpoint
GET /clothes?userId={userId}     // Fetch user's clothes
POST /clothes                    // Create new cloth
PUT /clothes/{id}                // Update cloth
DELETE /clothes/{id}             // Delete cloth

// Outfits endpoint
GET /outfits?userId={userId}     // Fetch user's outfits
POST /outfits                    // Create new outfit
PUT /outfits/{id}                // Update outfit
DELETE /outfits/{id}             // Delete outfit
```

## React Query Integration

### State Management

I use **React Query** for async state management instead of traditional useState:

```typescript
// data/api.tsx
export const useClothes = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: ['clothes', userId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/clothes?userId=${userId}`);
      return tryParseArray<Cloth, typeof ClothSchema>(data, ClothSchema);
    },
    enabled: !!userId,
  });
};
```

### Key Benefits

- **Automatic caching** and background updates
- **Built-in loading states** and error handling
- **Optimistic updates** for better UX
- **Query invalidation** for data consistency

## Component Integration

### Data Fetching in Components

```typescript
// screens/WardrobeScreen.tsx
function WardrobeContent() {
  const { data, isLoading, error, refetch } = useClothes({
    select: (data) => data.map((item) => ({
      id: item.id,
      image: item.photo.source,
      title: item.name,
      onButtonPress: () => navigation.navigate(SCREENS.CLOTH, { clothId: item.id }),
    })),
  });

  if (isLoading) return <LoadingView />;
  if (error) return <ErrorView onRetry={refetch} />;
  if (!data?.length) return <EmptyView />;

  return <CardsGrid cards={data} />;
}
```

### Loading & Error States

**Loading State**:

```typescript
if (isLoading) {
  return <LoadingView />;
}
```

**Error Handling**:

```typescript
if (error) {
  return (
    <ErrorView
      onRetry={() => refetch()}
    />
  );
}
```

**Empty State**:

```typescript
if (!data || data.length === 0) {
  return (
    <EmptyView
      header="Nothing here. For now."
      details="This is where you'll find your clothes. Start by adding one."
    />
  );
}
```

## Authentication Integration

### User Filtering

Authentication serves as a **placeholder for data filtering**:

```typescript
// data/auth.tsx
export const useUserId = () => useAuthStore((state) => state.user?.id);

// All API calls include userId for filtering
const response = await fetch(`${API_BASE_URL}/clothes?userId=${userId}`);
```

### Anonymous Users

- Each user gets a unique ID (`user_${uuid.v4()}`)
- Data is filtered by `userId` parameter
- No real authentication - just data isolation

## Data Validation

### Zod Schema Validation

```typescript
// data/models.tsx
export const ClothSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  photo: z.object({
    source: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Graceful error handling
const tryParseArray = <T, S extends z.ZodType<T>>(data: unknown, schema: S): T[] => {
  if (!Array.isArray(data)) throw new Error('Expected data to be an array');
  return data.map((item) => tryParse<T, S>(item, schema)).filter((item) => item !== null);
};
```

## Navigation Integration

### Screen Navigation

```typescript
// Navigate to detail screen with item ID
navigation.navigate(SCREENS.CLOTH, { clothId: item.id });

// Navigate to create new item
navigation.navigate(SCREENS.CLOTH, { clothId: null });
```

### Route Parameters

```typescript
// screens/ClothScreen.tsx
type ClothRouteProp = RouteProp<ReactNavigation.RootParamList, typeof SCREENS.CLOTH>;

export default function ClothScreen() {
  const route = useRoute<ClothRouteProp>();
  const { clothId } = route.params;

  // clothId === null for create mode
  // clothId === string for edit mode
}
```

## Key Features Implemented

✅ **Mock API Integration** - MockAPI.io for data persistence  
✅ **React Query** - Modern async state management  
✅ **Component Integration** - Seamless data flow to UI  
✅ **Loading/Error States** - Proper UX feedback  
✅ **Authentication Placeholder** - User-based data filtering  
✅ **Data Validation** - Zod schema validation  
✅ **Navigation Integration** - Screen-to-screen data passing  
✅ **Modular Architecture** - Separated concerns and clean code
