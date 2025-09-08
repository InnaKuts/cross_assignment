# State Management Documentation

## Overview

This application implements state management patterns using **Zustand** for global user state and **React Context** for theme management. The architecture provides clean separation of concerns with efficient state updates and persistence.

## Video Demo

![State Management Demo](assets/state.mp4)

## State Management Architecture

### Global State Analysis

The application manages two primary aspects of global state appart from async-api state:

1. **User Authentication & Profile** - Managed with Zustand
2. **Theme Management** - Managed with React Context

## Zustand Implementation

### User State Management

**Zustand** is used for shared user storage with persistence:

```typescript
// data/auth.tsx
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserName: (name: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUserName: (name) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, name } });
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-store',
      storage: AsyncStorage,
    }
  )
);
```

### User State Features

- **Persistent Storage**: User data survives app restarts
- **Type Safety**: Full TypeScript support
- **Simple API**: Clean hooks for state access
- **Automatic Updates**: Components re-render on state changes

### Usage in Components

```typescript
// Access user data
const user = useUser();
const userId = useUserId();
const updateUserName = useUpdateUserName();

// Update user name
updateUserName('New Name');

// Reset user
const resetUser = useResetUser();
resetUser();
```

## Theme Context Implementation

### Theme Provider

**React Context** manages theme state across the application:

```typescript
// contexts/ThemeContext.tsx
interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const colors = useMemo(() => getThemeColors(mode), [mode]);

  const toggle = useCallback(() => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const contextValue = useMemo(() => ({
    mode,
    colors,
    setMode,
    toggle,
  }), [mode, colors, setMode, toggle]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Theme Hooks

```typescript
// Custom hooks for theme access
export const useTheme = () => useContext(ThemeContext);
export const useThemeColors = () => useTheme().colors;
export const useThemeMode = () => {
  const { mode, setMode, toggle } = useTheme();
  return { mode, setMode, toggle };
};
```

### Theme Integration

```typescript
// App.tsx - Provider setup
export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

// Component usage
function MyComponent() {
  const colors = useThemeColors();
  const { mode, setMode, toggle } = useThemeMode();

  return (
    <View style={{ backgroundColor: colors.primary.lightest }}>
      <Text style={{ color: colors.secondary.darkest }}>
        Current theme: {mode}
      </Text>
      <Button title="Toggle Theme" onPress={toggle} />
    </View>
  );
}
```

## State Management Benefits

### Zustand Advantages

- **Minimal Boilerplate**: Less code than Redux
- **TypeScript Support**: Full type safety
- **Persistence**: Built-in storage integration
- **Performance**: Selective subscriptions
- **Simplicity**: Easy to learn and use

### Context API Advantages

- **React Native**: Built-in React solution
- **Component Tree**: Natural prop drilling alternative
- **Flexibility**: Custom hook patterns
- **Performance**: Optimized with useMemo/useCallback

## Implementation Examples

### User Profile Management

```typescript
// screens/SettingsScreen.tsx
function UserProfileSection() {
  const user = useUser();
  const updateUserName = useUpdateUserName();
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      updateUserName(name.trim());
      setIsEditingName(false);
    }
  };

  return (
    <View>
      <Text>Name: {user?.name || 'None'}</Text>
      {isEditingName ? (
        <TextField value={name} onChangeText={setName} />
      ) : (
        <Button title="Edit Name" onPress={() => setIsEditingName(true)} />
      )}
    </View>
  );
}
```

### Theme Switching

```typescript
// screens/SettingsScreen.tsx
function ThemeSection() {
  const { mode, setMode, toggle } = useThemeMode();
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.highlight.lightest }}>
      <Text style={{ color: colors.secondary.darkest }}>
        Current: {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </Text>

      <TouchableOpacity onPress={() => setMode('light')}>
        <Text>Light</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMode('dark')}>
        <Text>Dark</Text>
      </TouchableOpacity>

      <Button title="Toggle Theme" onPress={toggle} />
    </View>
  );
}
```

## Key Features

✅ **Zustand User Store** - Persistent user state management  
✅ **Theme Context** - Global theme switching  
✅ **Type Safety** - Full TypeScript integration  
✅ **Persistence** - User data survives app restarts  
✅ **Performance** - Optimized re-renders  
✅ **Modularity** - Clean separation of concerns  
✅ **Custom Hooks** - Reusable state access patterns
