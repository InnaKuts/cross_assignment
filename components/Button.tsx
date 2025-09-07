import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ds } from '~/constants';
import { useThemeColors } from '~/contexts/ThemeContext';

type ButtonProps = {
  title?: string;
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', ...touchableProps }, ref) => {
    const colors = useThemeColors();
    const buttonStyle = [
      styles.button,
      styles[`${variant}Button`],
      variant === 'primary' && { backgroundColor: colors.highlight.darkest },
      variant === 'secondary' && { borderColor: colors.highlight.darkest },
      touchableProps.style,
    ];
    const buttonTextStyle = [
      styles.buttonText,
      styles[`${variant}ButtonText`],
      variant === 'primary' && { color: colors.primary.lightest },
      variant === 'secondary' && { color: colors.highlight.darkest },
    ];
    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={buttonStyle}>
        <Text style={buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: ds.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: ds.spacing.md,
    paddingVertical: ds.spacing.sm,
  },
  primaryButton: {
    // backgroundColor will be set dynamically
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    // borderColor will be set dynamically
    borderWidth: ds.borderWidth.sm,
    paddingHorizontal: ds.spacing.md - ds.borderWidth.sm,
    paddingVertical: ds.spacing.sm - ds.borderWidth.sm,
  },
  buttonText: {
    // color will be set dynamically
    ...ds.font.action.md,
    textAlign: 'center',
  },
  primaryButtonText: {
    // color will be set dynamically
  },
  secondaryButtonText: {
    // color will be set dynamically
  },
});
