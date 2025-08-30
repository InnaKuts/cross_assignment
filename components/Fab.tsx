import { forwardRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ds } from '~/constants';

type FabProps = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export const Fab = forwardRef<View, FabProps>(
  ({ icon = 'add', variant = 'primary', ...touchableProps }, ref) => {
    const buttonStyle = [styles.button, styles[`${variant}Button`], touchableProps.style];
    const iconStyle = [styles[`${variant}Icon`]];
    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={buttonStyle}>
        <Ionicons name={icon} size={ds.size[8]} style={iconStyle} />
      </TouchableOpacity>
    );
  }
);

Fab.displayName = 'Fab';

const styles = StyleSheet.create({
  button: {
    backgroundColor: ds.colors.highlight.darkest,
    borderRadius: ds.borderRadius.full,
    padding: ds.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: ds.colors.highlight.darkest,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    shadowColor: ds.colors.dark.darkest,
    shadowOffset: { width: 0, height: 2 },
  },
  secondaryButton: {
    backgroundColor: ds.colors.highlight.lightest,
  },
  primaryIcon: {
    color: ds.colors.light.lightest,
  },
  secondaryIcon: {
    color: ds.colors.highlight.darkest,
  },
});
