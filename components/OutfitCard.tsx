import { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from './Icon';
import { ds } from '~/constants';
import { CardItem } from './CardsGrid';
import { CardsRow } from './CardsRow';

type OutfitCardProps = {
  title: string;
  onEdit?: () => void;
  cards: CardItem[];
};

export const OutfitCard = forwardRef<View, OutfitCardProps>(({ title, onEdit, cards }, ref) => {
  const resolvedCards = useMemo(() => {
    return onEdit
      ? [
          ...cards,
          {
            id: 'addButton',
            icon: Icons.addOutline,
            onButtonPress: onEdit,
          },
        ]
      : cards;
  }, [cards, onEdit]);

  return (
    <View ref={ref} style={styles.container}>
      {/* HeaderRow with space between */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={[ds.font.action.md, { color: ds.colors.highlight.darkest }]}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <CardsRow cards={resolvedCards} />
    </View>
  );
});

OutfitCard.displayName = 'OutfitCard';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    ...ds.font.heading.h4,
    color: ds.colors.secondary.darkest,
    flex: 1,
  },
  editButton: {
    padding: ds.spacing.xs,
  },
});
