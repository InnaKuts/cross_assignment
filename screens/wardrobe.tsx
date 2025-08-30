import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Fab } from '~/components';
import { ds } from '~/constants';

export default function Wardrobe() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Wardrobe</Text>
        <Fab
          icon="add"
          onPress={() => {
            navigation.navigate('Cloth', { clothId: '124' });
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
