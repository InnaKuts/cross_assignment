import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { CardsGrid, Fab, LoadingView, EmptyView, ErrorView } from '~/components';
import { ds } from '~/constants';
import { useClothes } from '~/data/api';
import { SCREENS } from '~/navigation/screens';

export default function Wardrobe() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Wardrobe</Text>
        <WardrobeContent />
      </View>
      <View style={styles.fabContainer}>
        <Fab
          icon="add"
          onPress={() => {
            navigation.navigate(SCREENS.CLOTH, { clothId: null });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function WardrobeContent() {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useClothes({
    select: (data) =>
      data.map((item) => ({
        id: item.id,
        image: item.photo,
        title: item.name,
        buttonTitle: 'Edit',
        onButtonPress: () => {
          navigation.navigate(SCREENS.CLOTH, { clothId: item.id });
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
        details="This is where you'll find your clothes. Start by adding one."
      />
    );
  }
  return <CardsGrid cards={data} />;
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
