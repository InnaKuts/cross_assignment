import { forwardRef, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from './Card';
import { ds } from '~/constants';
import { CardItem } from './CardsGrid';
import { useDeviceKind } from './helpers/useDeviceKind';
import { Icon, IconName } from './Icon';

type ActionItem = {
  id: string;
  icon: IconName;
  onButtonPress: () => void;
};

type RowItem = CardItem | ActionItem;

type CardsRowProps = {
  cards: RowItem[];
  cardWidth?: number;
};

export const CardsRow = forwardRef<FlatList, CardsRowProps>(({ cards, cardWidth = null }, ref) => {
  const { isTablet, isDesktop } = useDeviceKind();

  const resolvedCardWidth = useMemo(() => {
    return cardWidth ?? (isTablet ? 200 : isDesktop ? 300 : 170);
  }, [cardWidth, isTablet, isDesktop]);

  // Memoize renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: RowItem }) => (
      <View style={[styles.cardWrapper, { width: resolvedCardWidth }]}>
        {'image' in item && (
          <Card
            image={item.image}
            title={item.title}
            buttonTitle={item.buttonTitle}
            onButtonPress={item.onButtonPress}
          />
        )}
        {'icon' in item && (
          <TouchableOpacity
            style={[styles.addCardButton, cards.length === 1 && { height: resolvedCardWidth }]}
            onPress={item.onButtonPress}>
            <Icon name={item.icon} size={20} color={ds.colors.highlight.darkest} />
          </TouchableOpacity>
        )}
      </View>
    ),
    [resolvedCardWidth, cards]
  );

  const keyExtractor = useCallback((item: RowItem) => item.id, []);

  return (
    <FlatList
      ref={ref}
      data={cards}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
});

CardsRow.displayName = 'CardsRow';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    gap: ds.spacing.xs,
  },
  cardWrapper: {
    paddingVertical: ds.spacing.xs,
  },
  addCardButton: {
    height: '100%',
    padding: ds.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ds.borderRadius.md,
    backgroundColor: ds.colors.highlight.lightest,
  },
});
