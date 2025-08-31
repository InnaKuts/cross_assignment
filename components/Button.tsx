import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ds } from '~/constants';

type ButtonProps = {
  title?: string;
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', ...touchableProps }, ref) => {
    const buttonStyle = [styles.button, styles[`${variant}Button`], touchableProps.style];
    const buttonTextStyle = [styles.buttonText, styles[`${variant}ButtonText`]];
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
    backgroundColor: ds.colors.highlight.darkest,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: ds.colors.highlight.darkest,
    borderWidth: ds.borderWidth.sm,
    paddingHorizontal: ds.spacing.md - ds.borderWidth.sm,
    paddingVertical: ds.spacing.sm - ds.borderWidth.sm,
  },
  buttonText: {
    color: ds.colors.light.lightest,
    ...ds.font.action.md,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: ds.colors.light.lightest,
  },
  secondaryButtonText: {
    color: ds.colors.highlight.darkest,
  },
});
