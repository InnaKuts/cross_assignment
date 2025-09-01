import { createStaticNavigation, StaticParamList } from '@react-navigation/native';

// Import navigators
import Stack from './StackNavigator';
import { SCREENS } from './screens';

/**
 * Root Navigation Configuration
 *
 * This is the main navigation entry point that:
 * 1. Creates the static navigation instance from the stack navigator
 * 2. Defines the root parameter list with the screens
 * 3. Exports the configured navigation component
 *
 * The static navigation approach provides better performance
 * and type safety compared to dynamic navigation.
 */

// Create the static navigation instance
const Navigation = createStaticNavigation(Stack);

// Export the main navigation component
export default Navigation;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof Stack> {
      [SCREENS.CLOTH]: { clothId: string | null };
      [SCREENS.OUTFIT]: { outfitId: string | null };
      [key: string]: object | undefined;
    }
  }
}
