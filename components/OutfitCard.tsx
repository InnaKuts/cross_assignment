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
            <Ionicons name="create-outline" size={20} color={ds.colors.highlight.darkest} />
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
      </ScrollView>
    </View>
  );
});

OutfitCard.displayName = 'OutfitCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ds.colors.highlight.lightest,
    borderRadius: ds.borderRadius.md,
    padding: ds.spacing.md,
    marginVertical: ds.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ds.spacing.md,
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
    maxHeight: 300, // Adjust based on your needs
  },
});
