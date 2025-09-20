import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ds } from '~/constants';
import { useCreateOutfit, useDeleteOutfit, useOutfit, useUpdateOutfit } from '~/data/api';
import {
  Button,
  EmptyView,
  ErrorView,
  LoadingView,
  TextField,
  DeleteButton,
  showErrorAlert,
  CardsRow,
  RowItem,
  Icons,
  toProperCase,
} from '~/components';
import { Cloth, Outfit, Slot, SlotSchema } from '~/data/models';
import { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import { SCREENS } from '~/navigation/screens';
import { useThemeColors } from '~/contexts/ThemeContext';

type OutfitRouteProp = RouteProp<ReactNavigation.RootParamList, typeof SCREENS.OUTFIT>;

export default function OutfitScreen() {
  const route = useRoute<OutfitRouteProp>();
  const { outfitId } = route.params;
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary.lightest }]}>
      <OutfitContent outfitId={outfitId} />
    </SafeAreaView>
  );
}

function OutfitContent({ outfitId }: { outfitId: string | null }) {
  if (outfitId === null) {
    return <OutfitView outfit={null} />;
  }
  return <ExistingOutfitView outfitId={outfitId} />;
}

function ExistingOutfitView({ outfitId }: { outfitId: string }) {
  const { data, isLoading, error, refetch } = useOutfit(outfitId);

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
  if (!data) {
    return <EmptyView header="Outfit not found" details="Outfit not found" />;
  }
  return <OutfitView outfit={data} />;
}

function OutfitView({ outfit }: { outfit: Outfit | null }) {
  const createOutfitMutation = useCreateOutfit();
  const updateOutfitMutation = useUpdateOutfit();
  const deleteOutfitMutation = useDeleteOutfit();
  const navigation = useNavigation();
  const route = useRoute<OutfitRouteProp>();
  const { selectedCloth } = route.params;
  const [title, setTitle] = useState(outfit?.name || '');

  const [clothBySlots, setClothBySlots] = useState<Record<Slot, Cloth[]>>(() => {
    const grouped = Object.fromEntries(
      SlotSchema.options.map((slot) => [slot, []]) as [Slot, Cloth[]][]
    ) as Record<Slot, Cloth[]>;
    for (const cloth of outfit?.clothes || []) {
      grouped[cloth.slot].push(cloth);
    }
    return grouped;
  });

  useEffect(() => {
    if (selectedCloth) {
      setClothBySlots((prev) => {
        const newSlots = { ...prev };
        newSlots[selectedCloth.slot] = [
          ...newSlots[selectedCloth.slot].filter((c) => c.id !== selectedCloth.id),
          selectedCloth,
        ];
        return newSlots;
      });
    }
  }, [selectedCloth]);

  const cardsBySlots = useMemo(() => {
    return Object.fromEntries(
      (Object.entries(clothBySlots) as [Slot, Cloth[]][]).map(([slot, clothes]) => [
        slot,
        clothes
          .map(
            (cloth) =>
              ({
                id: cloth.id,
                image: cloth.photo.source,
                title: cloth.name,
                buttonTitle: 'Remove',
                onButtonPress: () => {
                  setClothBySlots((prev) => {
                    const newSlots = { ...prev };
                    newSlots[slot] = newSlots[slot].filter((c) => c.id !== cloth.id);
                    return newSlots;
                  });
                },
              }) as RowItem
          )
          .concat({
            id: 'addButton',
            icon: Icons.addOutline,
            onButtonPress: () => {
              navigation.navigate(SCREENS.SELECT_CLOTH, {
                slot: slot,
                returnToScreen: SCREENS.OUTFIT,
              });
            },
          } as RowItem),
      ])
    ) as Record<Slot, RowItem[]>;
  }, [clothBySlots, navigation]);

  const isPending =
    createOutfitMutation.isPending ||
    updateOutfitMutation.isPending ||
    deleteOutfitMutation.isPending;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: !outfit
        ? undefined
        : () => (
            <DeleteButton
              onDelete={() => {
                deleteOutfitMutation.mutate(outfit.id, {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    showErrorAlert(error);
                  },
                });
              }}
              title="Delete Outfit"
              message={`Are you sure you want to delete "${outfit.name}"?`}
              style={{ marginRight: ds.spacing.md }}
            />
          ),
    });
  }, [outfit, navigation, deleteOutfitMutation]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <TextField
          value={title}
          label="Outfit Name"
          onChangeText={setTitle}
          placeholder="Outfit Name"
        />
        {(Object.entries(cardsBySlots) as [Slot, RowItem[]][]).map(([slot, cards]) => (
          <SlotRow key={slot} slot={slot} cards={cards} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={() => {
            const allClothes = Object.values(clothBySlots).flat();

            if (outfit) {
              updateOutfitMutation.mutate(
                { id: outfit.id, name: title, clothes: allClothes },
                {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    showErrorAlert(error);
                  },
                }
              );
            } else {
              createOutfitMutation.mutate(
                { name: title, clothes: allClothes },
                {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    showErrorAlert(error);
                  },
                }
              );
            }
          }}
          disabled={isPending}
        />
      </View>
    </View>
  );
}

const SlotRow = ({ slot, cards }: { slot: Slot; cards: RowItem[] }) => {
  const colors = useThemeColors();
  const slotText = useMemo(() => toProperCase(slot), [slot]);
  return (
    <View style={styles.slotRow}>
      <Text style={[ds.font.action.md, { color: colors.secondary.darkest }]}>{slotText}</Text>
      <CardsRow cards={cards} />
    </View>
  );
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: ds.spacing.md,
    gap: ds.spacing.lg,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  slotRow: {},
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: ds.spacing.md,
  },
});
