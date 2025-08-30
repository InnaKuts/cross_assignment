import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ds } from '~/constants';

type OutfitRouteProp = RouteProp<ReactNavigation.RootParamList, 'Outfit'>;

export default function Outfit() {
  const route = useRoute<OutfitRouteProp>();
  const { outfitId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Outfit: {outfitId}</Text>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ds.colors.light.lightest,
  },
  container: {
    flex: 1,
    padding: ds.spacing.md,
    gap: ds.spacing.md,
    alignItems: 'center',
  },
});
