import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { ds } from '~/constants';

type EmptyViewProps = {
  header: string;
  details: string;
  imageSource?: ImageSourcePropType;
};

export function EmptyView({ header, details, imageSource }: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource ?? require('~/assets/images/empty-state.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ds.spacing.lg,
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: ds.spacing.md,
  },
  header: {
    ...ds.font.heading.h2,
    textAlign: 'center',
    marginBottom: ds.spacing.sm,
    color: ds.colors.dark.darkest,
  },
  details: {
    ...ds.font.body.md,
    textAlign: 'center',
    color: ds.colors.dark.light,
  },
});
