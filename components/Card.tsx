import { forwardRef, memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { ds } from '~/constants';
import { Icon, Icons } from './Icon';
import { useThemeColors } from '~/contexts/ThemeContext';

export type ImageItemProps = {
  uri: string;
  width: number;
  height: number;
};

type CardProps = {
  image?: ImageItemProps | null;
  title: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
};

export const Card = memo(
  forwardRef<View, CardProps>(({ image, title, buttonTitle, onButtonPress }, ref) => {
    const colors = useThemeColors();
    return (
      <View ref={ref} style={[styles.container, { backgroundColor: colors.highlight.lightest }]}>
        <View style={[styles.imageContainer, { backgroundColor: colors.highlight.light }]}>
          {image ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Icon name={Icons.image} size={24} color={colors.highlight.darkest} />
          )}
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.secondary.darkest }]}>{title}</Text>
          {buttonTitle && (
            <Button title={buttonTitle} variant="secondary" onPress={onButtonPress} />
          )}
        </View>
      </View>
    );
  })
);

Card.displayName = 'Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: ds.borderRadius.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: ds.spacing.md,
  },
  title: {
    ...ds.font.heading.h4,
    marginBottom: ds.spacing.sm,
  },
});
