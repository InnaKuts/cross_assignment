import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ds } from '~/constants';
import { useCreateOutfit, useDeleteOutfit, useOutfit, useUpdateOutfit } from '~/data/api';
import { Button, EmptyView, ErrorView, LoadingView, TextField } from '~/components';
import { Outfit } from '~/data/models';
import { useState } from 'react';

type OutfitRouteProp = RouteProp<ReactNavigation.RootParamList, 'Outfit'>;

export default function OutfitScreen() {
  const route = useRoute<OutfitRouteProp>();
  const { outfitId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
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
  const [title, setTitle] = useState(outfit?.name || '');

  const isPending =
    createOutfitMutation.isPending ||
    updateOutfitMutation.isPending ||
    deleteOutfitMutation.isPending;

  return (
    <View style={styles.container}>
      <TextField
        value={title}
        label="Outfit Name"
        onChangeText={setTitle}
        placeholder="Outfit Name"
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={() => {
            if (outfit) {
              updateOutfitMutation.mutate(
                { id: outfit.id, name: title, clothIds: [] },
                {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    Alert.alert('Error', error.message);
                  },
                }
              );
            } else {
              createOutfitMutation.mutate(
                { name: title, clothIds: [] },
                {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    Alert.alert('Error', error.message);
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

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ds.colors.light.lightest,
  },
  container: {
    flex: 1,
    padding: ds.spacing.md,
    gap: ds.spacing.lg,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: ds.spacing.lg,
  },
});
