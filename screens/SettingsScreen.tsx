import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from '~/components';
import { ds } from '~/constants';
import { SCREENS } from '~/navigation/screens';
import { useAuth, useResetAuth } from '~/data/auth';

export default function Settings() {
  const navigation = useNavigation();
  const { data: user, isLoading } = useAuth();
  const resetAuth = useResetAuth();

  const handleResetAuth = () => {
    Alert.alert(
      'Reset Authentication',
      'Are you sure you want to reset your authentication? This will create a new anonymous user.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetAuth();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Settings</Text>

        <View style={styles.authSection}>
          <Text style={ds.font.heading.h3}>Auth Status</Text>
          <Text style={ds.font.body.md}>Loading: {isLoading ? 'Yes' : 'No'}</Text>
          <Text style={ds.font.body.md}>User ID: {user?.id || 'None'}</Text>
          <Text style={ds.font.body.md}>Anonymous: {user?.isAnonymous ? 'Yes' : 'No'}</Text>
        </View>

        <Button title="Reset Auth" onPress={handleResetAuth} />

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
  authSection: {
    padding: ds.spacing.md,
    backgroundColor: ds.colors.highlight.lightest,
    borderRadius: ds.borderRadius.md,
    gap: ds.spacing.sm,
    width: '100%',
  },
});
