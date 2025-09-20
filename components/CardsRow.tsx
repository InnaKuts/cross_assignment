import { forwardRef, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card } from './Card';
import { ds } from '~/constants';
import { CardItem } from './CardsGrid';
import { useDeviceKind } from './helpers/useDeviceKind';

type CardsRowProps = {
  cards: CardItem[];
  cardWidth?: number;
};

export const CardsRow = forwardRef<FlatList, CardsRowProps>(({ cards, cardWidth = null }, ref) => {
  const { isTablet, isDesktop } = useDeviceKind();

  const resolvedCardWidth = useMemo(() => {
    return cardWidth ?? (isTablet ? 200 : isDesktop ? 300 : 170);
  }, [cardWidth, isTablet, isDesktop]);

  // Memoize renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: CardItem }) => (
      <View style={[styles.cardWrapper, { width: resolvedCardWidth }]}>
        <Card
          image={item.image}
          title={item.title}
          buttonTitle={item.buttonTitle}
          onButtonPress={item.onButtonPress}
        />
      </View>
    ),
    [resolvedCardWidth]
  );

  const keyExtractor = useCallback((item: CardItem) => item.id, []);

  return (
    <FlatList
      ref={ref}
      data={cards}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
});

CardsRow.displayName = 'CardsRow';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cardWrapper: {
    paddingHorizontal: ds.spacing.xs,
    paddingVertical: ds.spacing.xs,
  },
});
