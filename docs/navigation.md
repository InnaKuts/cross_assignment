# Cross Assignment 4 - Navigation Documentation

This document covers the navigation architecture implemented in the Cross Assignment 4 React Native project.

## Navigation Flow Examples

### Navigation Demo Videos

> Check videos in `docs/assets`

| iPhone                                  | iPad                                | Android                                   |
| --------------------------------------- | ----------------------------------- | ----------------------------------------- |
| ![iPhone](assets/navigation-iphone.mp4) | ![iPad](assets/navigation-ipad.mp4) | ![Android](assets/navigation-android.mp4) |

## Task 1: Navigation Structure Design

### Navigation Types Used

- **Stack Navigation**: For linear transitions (Wardrobe → Cloth Details, Outfits → Outfit Details)
- **Tab Navigation**: For main app sections (Wardrobe, Outfits, Settings)
- **No Drawer Navigation**: Not implemented

### Screen Relationships

```text
Root Stack Navigator
├── Home (Tab Navigator)
│   ├── Wardrobe → Cloth (Stack)
│   ├── Outfits → Outfit (Stack)
│   └── Settings
├── Cloth (Direct Stack)
├── Outfit (Direct Stack)
└── Overview (Direct Stack)
```

### Parameters Passed Between Screens

- `clothId: string | null` - For cloth details (null for new cloth)
- `outfitId: string | null` - For outfit details (null for new outfit)

## Task 2: Navigation Implementation

### Navigation Containers Created

#### Stack Navigator (`navigation/StackNavigator.tsx`)

```typescript
const Stack = createStackNavigator({
  screens: {
    [SCREENS.HOME]: {
      screen: Tab, // Contains the Tab Navigator
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    [SCREENS.CLOTH]: {
      screen: Cloth,
      options: {
        title: 'Cloth',
        headerShown: true,
      },
    },
    [SCREENS.OUTFIT]: {
      screen: Outfit,
      options: {
        title: 'Outfit',
        headerShown: true,
      },
    },
    [SCREENS.OVERVIEW]: {
      screen: Overview,
      options: {
        title: 'Overview',
        headerShown: true,
      },
    },
  },
});
```

#### Tab Navigator (`navigation/TabNavigator.tsx`)

```typescript
const Tab = createBottomTabNavigator({
  screens: {
    [SCREENS.WARDROBE]: {
      screen: Wardrobe,
      options: {
        title: 'Wardrobe',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="shirt-outline" size={size} color={color} />
        ),
      },
    },
    [SCREENS.OUTFITS]: {
      screen: Outfits,
      options: {
        title: 'Outfits',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
      },
    },
    [SCREENS.SETTINGS]: {
      screen: Settings,
      options: {
        title: 'Settings',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      },
    },
  },
});
```

### Component Integration

- Custom components integrated into screens
- Consistent styling with design system
- Responsive navigation elements

## Task 3: Data Passing Between Screens

### Navigation Parameters Implementation

```typescript
// navigation/index.tsx
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof Stack> {
      [SCREENS.CLOTH]: { clothId: string | null };
      [SCREENS.OUTFIT]: { outfitId: string | null };
      [key: string]: object | undefined;
    }
  }
}
```

### Navigation Usage Examples

```typescript
// Navigating to cloth details (WardrobeScreen.tsx)
navigation.navigate(SCREENS.CLOTH, { clothId: item.id });

// Navigating to new cloth
navigation.navigate(SCREENS.CLOTH, { clothId: null });

// Receiving parameters (ClothScreen.tsx)
const route = useRoute<ClothRouteProp>();
const { clothId } = route.params;
```

## Task 4: Navigation Styling

### Header Configuration

- Custom header titles for each screen
- Consistent header styling across the app
- Hidden headers for tab screens to maintain clean UI

### Tab Bar Styling

- Custom icons using Ionicons
- Consistent color scheme
- Responsive tab bar layout

### Back Button Handling

- Automatic back button for stack navigation
- Custom back button styling
- Proper navigation flow

### FAB Button

- FAB is used in Wardrobe and Outfits screens to add new items
- In Wardrobe: navigates to Cloth screen with `clothId: null` for new cloth
- In Outfits: navigates to Outfit screen with `outfitId: null` for new outfit

## Task 5: Adaptability and Testing

### Cross-Platform Compatibility

- Tested on both iOS and Android
- Consistent navigation behavior
- Platform-specific optimizations

### Error Handling

- Parameter validation with TypeScript
- Loading, Error, and Empty screens for data fetching states
- Handling invalid clothId/outfitId parameters with appropriate UI states

## Additional Requirements

Navigation files are organized in separate modules with additional comments on complex parts.

```text
navigation/
├── index.tsx              # Root navigation configuration
├── StackNavigator.tsx     # Stack navigation setup
├── TabNavigator.tsx       # Tab navigation setup
└── screens.tsx            # Screen name constants
```
