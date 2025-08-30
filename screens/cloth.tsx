import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { ds } from '~/constants';

export default function Cloth() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Cloth</Text>
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
