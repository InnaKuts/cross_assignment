import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { ds } from '~/constants';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
} & TextInputProps;

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, placeholder, style, ...textInputProps }, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={ds.colors.dark.lightest}
          style={[styles.textInput, style]}
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
    color: ds.colors.dark.dark,
    marginBottom: ds.spacing.xs,
  },
  textInput: {
    ...ds.font.body.md,
    borderWidth: ds.borderWidth.xs,
    borderColor: ds.colors.light.darkest,
    borderRadius: ds.borderRadius.md,
    paddingHorizontal: ds.spacing.md,
    paddingVertical: ds.spacing.md,
    color: ds.colors.dark.darkest,
    backgroundColor: ds.colors.light.lightest,
  },
});
