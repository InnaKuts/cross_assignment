import { forwardRef } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Card } from './Card';
import { ds } from '~/constants';
import { useDeviceKind } from './helpers/useDeviceKind';

type CardItem = {
  id: string;
  imageSource: ImageSourcePropType;
  title: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
};

type CardsGridProps = {
  cards: CardItem[];
  columns?: number;
};

export const CardsGrid = forwardRef<FlatList, CardsGridProps>(({ cards, columns }, ref) => {
  const { isTablet, isDesktop } = useDeviceKind();
  const resolvedColumns = columns ?? (isTablet ? 4 : isDesktop ? 6 : 2);

  const renderItem = ({ item }: { item: CardItem }) => (
    <Card
      key={item.id}
      imageSource={item.imageSource}
      title={item.title}
      buttonTitle={item.buttonTitle}
      onButtonPress={item.onButtonPress}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        key={`grid-${resolvedColumns}`}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={resolvedColumns}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        horizontal={false}
      />
    </View>
  );
});

CardsGrid.displayName = 'CardsGrid';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gridContainer: {
    padding: 0,
    gap: ds.spacing.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: ds.spacing.md,
  },
});
