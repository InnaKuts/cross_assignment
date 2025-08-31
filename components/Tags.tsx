import { forwardRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Tag } from './Tag';
import { ds } from '~/constants';

type TagItem = {
  id: string;
  text: string;
};

type TagsProps = {
  tags: TagItem[];
  selectedTagId?: string;
  onSelectionChange?: (tagId: string) => void;
};

export const Tags = forwardRef<View, TagsProps & TouchableOpacityProps>(
  ({ tags, selectedTagId, onSelectionChange, ...touchableProps }, ref) => {
    const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedTagId);

    const handleTagPress = (tagId: string) => {
      const newSelectedId = internalSelectedId === tagId ? undefined : tagId;
      setInternalSelectedId(newSelectedId);
      onSelectionChange?.(newSelectedId || '');
    };

    return (
      <View ref={ref} style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              text={tag.text}
              selected={tag.id === (selectedTagId ?? internalSelectedId)}
              onPress={() => handleTagPress(tag.id)}
              {...touchableProps}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
);

Tags.displayName = 'Tags';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    gap: ds.spacing.sm,
  },
});
