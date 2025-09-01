import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button } from '~/components';
import { ds } from '~/constants';
import { SCREENS } from '~/navigation/screens';

export default function Settings() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Settings</Text>
        <Button
          title="Overview"
          onPress={() => {
            navigation.navigate(SCREENS.OVERVIEW);
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
