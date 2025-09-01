import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { EmptyView, ErrorView, Fab, LoadingView, OutfitsGrid } from '~/components';
import { ds } from '~/constants';
import { useOutfits } from '~/data/api';

export default function Outfits() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Outfits</Text>
        <OutfitsContent />
      </View>
      <View style={styles.fabContainer}>
        <Fab
          icon="add"
          onPress={() => {
            navigation.navigate('Outfit', { outfitId: null });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function OutfitsContent() {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useOutfits({
    select: (data) =>
      data.map((item) => ({
        id: item.id,
        title: item.name,
        cards: item.clothes.map((cloth) => ({
          id: cloth.id,
          image: cloth.photo,
          title: cloth.name,
        })),
        onEdit: () => {
          navigation.navigate('Outfit', { outfitId: item.id });
        },
      })),
  });

  if (isLoading) {
    return <LoadingView />;
  }
  if (error) {
    return (
      <ErrorView
        onRetry={() => {
          refetch();
        }}
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <EmptyView
        header="Nothing here. For now."
        details="This is where you'll find your outfits. Start by adding one."
      />
    );
  }
  return <OutfitsGrid outfits={data} />;
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ds.colors.light.lightest,
  },
  container: {
    flex: 1,
    padding: ds.spacing.md,
    gap: ds.spacing.md,
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: ds.spacing.lg,
    right: ds.spacing.lg,
  },
});
