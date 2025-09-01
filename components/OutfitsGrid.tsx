import { FlatList, StyleSheet, View } from 'react-native';
import { OutfitCard } from './OutfitCard';
import { CardItem } from './CardsGrid';
import { ds } from '~/constants';

type OutfitItem = {
  id: string;
  title: string;
  onEdit?: () => void;
  cards: CardItem[];
};

type OutfitsGridProps = {
  outfits: OutfitItem[];
};

export const OutfitsGrid = ({ outfits }: OutfitsGridProps) => {
  const renderOutfit = ({ item }: { item: OutfitItem }) => (
    <OutfitCard title={item.title} cards={item.cards} onEdit={item.onEdit} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={outfits}
        renderItem={renderOutfit}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: ds.spacing.md,
    paddingVertical: ds.spacing.sm,
  },
});
