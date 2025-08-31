import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { CardsGrid, Fab, LoadingView, EmptyView, ErrorView } from '~/components';
import { ds } from '~/constants';
import { useClothes } from '~/data/api';

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
            navigation.navigate('Cloth', { clothId: null });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function WardrobeContent() {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useClothes();

  const items = useMemo(() => {
    return (
      data?.map((item) => ({
        id: item.id,
        imageSource: item.photo ? { uri: item.photo } : null,
        title: item.name,
        buttonTitle: 'Edit',
        onButtonPress: () => {
          navigation.navigate('Cloth', { clothId: item.id });
        },
      })) ?? []
    );
  }, [data, navigation]);

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
  if (items.length === 0) {
    return (
      <EmptyView
        header="Nothing here. For now."
        details="This is where you'll find your clothes. Start by adding one."
      />
    );
  }
  return <CardsGrid cards={items} />;
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
