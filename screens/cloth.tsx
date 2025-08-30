import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ds } from '~/constants';

type ClothRouteProp = RouteProp<ReactNavigation.RootParamList, 'Cloth'>;

export default function Cloth() {
  const route = useRoute<ClothRouteProp>();
  const { clothId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Cloth: {clothId}</Text>
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
