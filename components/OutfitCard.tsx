import { forwardRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ds } from '~/constants';
import { CardItem } from './CardsGrid';
import { Card } from './Card';

type OutfitCardProps = {
  title: string;
  onEdit?: () => void;
  cards: CardItem[];
};

export const OutfitCard = forwardRef<View, OutfitCardProps>(({ title, onEdit, cards }, ref) => {
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

      {/* Horizontal Scroll for clothes cards */}
      <ScrollView
        style={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        <TouchableOpacity style={styles.addCardButton} onPress={onEdit}>
          <Ionicons name="add-outline" size={20} color={ds.colors.highlight.darkest} />
        </TouchableOpacity>
      </ScrollView>
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
    color: ds.colors.dark.darkest,
    flex: 1,
  },
  editButton: {
    padding: ds.spacing.xs,
  },
  scrollContainer: {
    height: 100,
  },
  addCardButton: {
    padding: ds.spacing.xs,
    width: 100,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ds.borderRadius.md,
    backgroundColor: ds.colors.highlight.lightest,
  },
});
