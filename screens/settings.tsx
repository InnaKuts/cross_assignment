import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Fab } from '~/components';
import { ds } from '~/constants';

export default function Settings() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Settings</Text>x{' '}
        <Fab
          icon="visibility"
          onPress={() => {
            // navigate to overview screen
          }}
        />
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
