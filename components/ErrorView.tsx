import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ds } from '~/constants';
import { Button } from './Button';

export function ErrorView({ onRetry }: { onRetry?: () => void }) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={48} color={ds.colors.error.dark} style={styles.icon} />
      <Text style={styles.text}>Something went wrong</Text>
      {onRetry && <Button title="Try again" variant="secondary" onPress={onRetry} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: ds.spacing.lg,
    gap: ds.spacing.md,
  },
  icon: {},
  text: {
    ...ds.font.heading.h3,
    color: ds.colors.error.dark,
    textAlign: 'center',
  },
});
