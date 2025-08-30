import { forwardRef } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { ds } from '~/constants';

type CardProps = {
  imageSource: ImageSourcePropType;
  title: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
};

export const Card = forwardRef<View, CardProps>(
  ({ imageSource, title, buttonTitle, onButtonPress }, ref) => {
    return (
      <View ref={ref} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {buttonTitle && (
            <Button title={buttonTitle} variant="secondary" onPress={onButtonPress} />
          )}
        </View>
      </View>
    );
  }
);

Card.displayName = 'Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: ds.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: ds.colors.highlight.lightest,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
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
    color: ds.colors.dark.darkest,
    marginBottom: ds.spacing.sm,
  },
});
