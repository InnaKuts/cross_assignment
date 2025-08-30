import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import Wardrobe from '../screens/wardrobe';
import Outfits from '../screens/outfits';
import Settings from '../screens/settings';
import Cloth from '../screens/cloth';
import Outfit from '../screens/outfit';
import Overview from '../screens/overview';

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
    Tabs: {
      screen: Tab,
      options: {
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
      Cloth: { clothId: string };
      Outfit: { outfitId: string };
      [key: string]: object | undefined;
    }
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
