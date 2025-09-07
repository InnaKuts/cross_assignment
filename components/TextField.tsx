import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { ds } from '~/constants';
import { useThemeColors } from '~/contexts/ThemeContext';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
} & TextInputProps;

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, placeholder, style, ...textInputProps }, ref) => {
    const colors = useThemeColors();
    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, { color: colors.secondary.dark }]}>{label}</Text>}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={colors.secondary.lightest}
          style={[
            styles.textInput,
            {
              borderColor: colors.primary.darkest,
              color: colors.secondary.darkest,
              backgroundColor: colors.primary.lightest,
            },
            style,
          ]}
          {...textInputProps}
        />
      </View>
    );
  }
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...ds.font.heading.h5,
    marginBottom: ds.spacing.xs,
  },
  textInput: {
    ...ds.font.body.md,
    borderWidth: ds.borderWidth.xs,
    borderRadius: ds.borderRadius.md,
    paddingHorizontal: ds.spacing.md,
    paddingVertical: ds.spacing.md,
  },
});
