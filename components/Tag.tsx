import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ds } from '~/constants';

type TagProps = {
  text: string;
  selected?: boolean;
} & TouchableOpacityProps;

export const Tag = forwardRef<View, TagProps>(
  ({ text, selected = false, ...touchableProps }, ref) => {
    const tagStyle = [styles.tag, selected && styles.selected, touchableProps.style];
    const tagTextStyle = [styles.tagText, selected && styles.selectedText];

    return (
      <TouchableOpacity ref={ref} {...touchableProps} style={tagStyle}>
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
    backgroundColor: ds.colors.highlight.lightest,
    borderRadius: ds.borderRadius.md,
  },
  tagText: {
    ...ds.font.caption.md,
    color: ds.colors.highlight.darkest,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  selected: {
    backgroundColor: ds.colors.highlight.darkest,
  },
  selectedText: {
    color: ds.colors.light.lightest,
  },
});
