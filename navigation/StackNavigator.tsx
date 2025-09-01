import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Cloth from '../screens/ClothScreen';
import Outfit from '../screens/OutfitScreen';
import Overview from '../screens/OverviewScreen';

// Import Tab Navigator
import Tab from './TabNavigator';

// Import constants
import { SCREENS } from './screens';

/**
 * Stack Navigator Configuration
 *
 * This component defines the main stack navigation structure.
 * It includes:
 * - Home: The main tab navigator containing all primary screens
 * - Cloth: Detailed view for individual clothing items
 * - Outfit: Detailed view for individual outfits
 * - Overview: Summary/analytics screen
 *
 * The stack navigator allows for modal-style navigation between screens
 * while maintaining the tab structure at the root level.
 */
const Stack = createStackNavigator({
  screens: {
    [SCREENS.HOME]: {
      screen: Tab,
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

export default Stack;
