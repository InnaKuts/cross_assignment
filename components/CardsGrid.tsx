import { forwardRef, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, ImageItemProps } from './Card';
import { ds } from '~/constants';
import { useDeviceKind } from './helpers/useDeviceKind';

export type CardItem = {
  id: string;
  image?: ImageItemProps | null;
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

  // Memoize resolved columns calculation
  const resolvedColumns = useMemo(() => {
    return columns ?? (isTablet ? 4 : isDesktop ? 6 : 2);
  }, [columns, isTablet, isDesktop]);

  // Memoize renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: CardItem }) => (
      <View style={[styles.cardWrapper, { flex: 1 / resolvedColumns }]}>
        <Card
          image={item.image}
          title={item.title}
          buttonTitle={item.buttonTitle}
          onButtonPress={item.onButtonPress}
        />
      </View>
    ),
    [resolvedColumns]
  );

  const keyExtractor = useCallback((item: CardItem) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={resolvedColumns}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
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
  },
  cardWrapper: {
    paddingHorizontal: ds.spacing.xs,
    paddingVertical: ds.spacing.xs,
  },
});
