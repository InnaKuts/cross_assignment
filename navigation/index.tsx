import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import Wardrobe from '../screens/WardrobeScreen';
import Outfits from '../screens/OutfitsScreen';
import Settings from '../screens/SettingsScreen';
import Cloth from '../screens/ClothScreen';
import Outfit from '../screens/OutfitScreen';
import Overview from '../screens/OverviewScreen';

// Create tab navigator
const Tab = createBottomTabNavigator({
  screens: {
    Wardrobe: {
      screen: Wardrobe,
      options: {
        title: 'Wardrobe',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="shirt-outline" size={size} color={color} />
        ),
      },
    },
    Outfits: {
      screen: Outfits,
      options: {
        title: 'Outfits',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
      },
    },
    Settings: {
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

// Create stack navigator
const Stack = createStackNavigator({
  screens: {
    Home: {
      screen: Tab,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Cloth: {
      screen: Cloth,
      options: {
        title: 'Cloth',
        headerShown: true,
      },
    },
    Outfit: {
      screen: Outfit,
      options: {
        title: 'Outfit',
        headerShown: true,
      },
    },
    Overview: {
      screen: Overview,
      options: {
        title: 'Overview',
        headerShown: true,
      },
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParamList {
      Cloth: { clothId: string | null };
      Outfit: { outfitId: string | null };
      [key: string]: object | undefined;
    }
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
