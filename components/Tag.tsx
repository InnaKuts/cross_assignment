import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ds } from '~/constants';
import { useThemeColors } from '~/contexts/ThemeContext';

type TagProps = {
  text: string;
  selected?: boolean;
} & TouchableOpacityProps;

export const Tag = forwardRef<View, TagProps>(
  ({ text, selected = false, disabled = false, ...touchableProps }, ref) => {
    const colors = useThemeColors();
    const tagStyle = [
      styles.tag,
      { backgroundColor: colors.highlight.lightest },
      selected && { backgroundColor: colors.highlight.darkest },
      disabled && { backgroundColor: colors.primary.light, opacity: 0.6 },
      touchableProps.style,
    ];
    const tagTextStyle = [
      styles.tagText,
      { color: colors.highlight.darkest },
      selected && { color: colors.primary.lightest },
      disabled && { color: colors.secondary.light },
    ];

    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={tagStyle} disabled={disabled}>
        <Text style={tagTextStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
);

Tag.displayName = 'Tag';

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ds.spacing.xxs,
    paddingHorizontal: ds.spacing.sm,
    borderRadius: ds.borderRadius.md,
  },
  tagText: {
    ...ds.font.caption.md,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
