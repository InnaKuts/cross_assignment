import { forwardRef } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ds } from '~/constants';
import { useThemeColors } from '~/contexts/ThemeContext';

type FabProps = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export const Fab = forwardRef<View, FabProps>(
  ({ icon = 'add', variant = 'primary', ...touchableProps }, ref) => {
    const colors = useThemeColors();
    const buttonStyle = [
      styles.button,
      styles[`${variant}Button`],
      variant === 'primary' && { backgroundColor: colors.highlight.darkest },
      variant === 'secondary' && { backgroundColor: colors.highlight.lightest },
      variant === 'primary' && { shadowColor: colors.secondary.darkest },
      touchableProps.style,
    ];
    const iconStyle = [
      variant === 'primary' && { color: colors.primary.lightest },
      variant === 'secondary' && { color: colors.highlight.darkest },
    ];
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
    borderRadius: ds.borderRadius.full,
    padding: ds.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  secondaryButton: {
    // backgroundColor will be set dynamically
  },
});
