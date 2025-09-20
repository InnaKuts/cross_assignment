import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CardsGrid, LoadingView, EmptyView, ErrorView } from '~/components';
import { ds } from '~/constants';
import { useClothes } from '~/data/api';
import { SCREENS } from '~/navigation/screens';
import { useThemeColors } from '~/contexts/ThemeContext';
import { Slot } from '~/data/models';

type SelectClothRouteProp = RouteProp<ReactNavigation.RootParamList, typeof SCREENS.SELECT_CLOTH>;

export default function SelectClothScreen() {
  const colors = useThemeColors();
  const route = useRoute<SelectClothRouteProp>();
  const { slot, returnToScreen } = route.params;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary.lightest }]}>
      <View style={styles.container}>
        <SelectClothContent slot={slot} returnToScreen={returnToScreen} />
      </View>
    </SafeAreaView>
  );
}

function SelectClothContent({ slot, returnToScreen }: { slot?: Slot; returnToScreen: string }) {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useClothes({
    slot,
    select: (data) =>
      data.map((item) => ({
        id: item.id,
        image: item.photo.source,
        title: item.name,
        buttonTitle: 'Select',
        onButtonPress: () => {
          // Merge selected cloth id back to the caller screen using its key
          navigation.navigate({
            name: returnToScreen,
            params: { selectedCloth: item },
            merge: true,
            pop: true,
          } as never);
        },
      })),
  });

  if (isLoading) {
    return <LoadingView />;
  }
  if (error) {
    return <ErrorView onRetry={refetch} />;
  }
  if (!data || data.length === 0) {
    return (
      <EmptyView
        header="No clothes match this slot"
        details={slot ? `No clothes found for slot "${slot}".` : 'No clothes yet.'}
      />
    );
  }
  return <CardsGrid cards={data} />;
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: ds.spacing.md,
    gap: ds.spacing.md,
    alignItems: 'center',
  },
});
