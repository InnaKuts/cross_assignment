import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Icons } from '../components/Icon';

// Import screens
import Wardrobe from '../screens/WardrobeScreen';
import Outfits from '../screens/OutfitsScreen';
import Settings from '../screens/SettingsScreen';

// Import constants
import { SCREENS } from './screens';

/**
 * Tab Navigator Configuration
 *
 * This component defines the bottom tab navigation structure.
 * Each tab represents a main section of the app:
 * - Wardrobe: Main clothing management screen
 * - Outfits: Outfit creation and management
 * - Settings: App configuration and preferences
 *
 * Each tab has its own icon and title configuration.
 */
const Tab = createBottomTabNavigator({
  screens: {
    [SCREENS.WARDROBE]: {
      screen: Wardrobe,
      options: {
        title: 'Wardrobe',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name={Icons.shirtOutline} size={size} color={color} />
        ),
      },
    },
    [SCREENS.OUTFITS]: {
      screen: Outfits,
      options: {
        title: 'Outfits',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name={Icons.peopleOutline} size={size} color={color} />
        ),
      },
    },
    [SCREENS.SETTINGS]: {
      screen: Settings,
      options: {
        title: 'Settings',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name={Icons.settingsOutline} size={size} color={color} />
        ),
      },
    },
  },
});

export default Tab;
