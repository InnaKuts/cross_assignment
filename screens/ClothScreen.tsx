import { useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ds } from '~/constants';
import {
  Button,
  TextField,
  Tags,
  LoadingView,
  ErrorView,
  EmptyView,
  DeleteButton,
} from '~/components';
import { useCloth, useCreateCloth, useUpdateCloth, useDeleteCloth } from '~/data/api';
import { Slot, Cloth } from '~/data/models';
import { Ionicons } from '@expo/vector-icons';

type ClothRouteProp = RouteProp<ReactNavigation.RootParamList, 'Cloth'>;

const SLOT_OPTIONS = [
  { id: 'head', text: 'Head' },
  { id: 'neck', text: 'Neck' },
  { id: 'torso', text: 'Torso' },
  { id: 'legs', text: 'Legs' },
  { id: 'feet', text: 'Feet' },
];

export default function ClothScreen() {
  const route = useRoute<ClothRouteProp>();
  const { clothId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ClothContent clothId={clothId} />
      </View>
    </SafeAreaView>
  );
}

function ClothContent({ clothId }: { clothId: string | null }) {
  if (clothId === null) {
    return <ClothView cloth={null} />;
  }
  return <ExistingClothView clothId={clothId} />;
}

function ExistingClothView({ clothId }: { clothId: string }) {
  const { data, isLoading, error, refetch } = useCloth(clothId);

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
    return <EmptyView header="Cloth not found" details="Cloth not found" />;
  }
  return <ClothView cloth={data} />;
}

function ClothView({ cloth }: { cloth: Cloth | null }) {
  const createClothMutation = useCreateCloth();
  const updateClothMutation = useUpdateCloth();
  const deleteClothMutation = useDeleteCloth();
  const navigation = useNavigation();

  const isPending =
    updateClothMutation.isPending || deleteClothMutation.isPending || createClothMutation.isPending;

  const [title, setTitle] = useState(cloth?.name || '');
  const [selectedSlot, setSelectedSlot] = useState(cloth?.slot || 'head');
  const [image] = useState(cloth?.photo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: !cloth
        ? undefined
        : () => (
            <DeleteButton
              onDelete={() => {
                deleteClothMutation.mutate(cloth.id, {
                  onSuccess: () => {
                    navigation.goBack();
                  },
                  onError: (error) => {
                    Alert.alert('Error', error.message);
                  },
                });
              }}
              title="Delete Cloth"
              message={`Are you sure you want to delete "${cloth.name}"?`}
              style={{ marginRight: ds.spacing.md }}
            />
          ),
    });
  }, [cloth, navigation, deleteClothMutation]);

  const handleSave = () => {
    if (cloth) {
      updateClothMutation.mutate(
        {
          id: cloth.id,
          name: title,
          slot: selectedSlot as Slot,
          photo: image,
        },
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
      createClothMutation.mutate(
        {
          name: title,
          slot: selectedSlot as Slot,
          photo: image,
        },
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
  };

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={[styles.imageContainer, image && { aspectRatio: image.width / image.height }]}>
        {image ? (
          <Image source={{ uri: image.url }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera" size={24} color={ds.colors.highlight.darkest} />
          </View>
        )}
      </View>

      {/* Slot Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Slot</Text>
        <Tags
          disabled={isPending}
          tags={SLOT_OPTIONS}
          selectedTagId={selectedSlot}
          radio={true}
          onSelectionChange={(tagId) => {
            setSelectedSlot(tagId as Slot);
          }}
        />
      </View>

      {/* Title Input */}
      <View style={styles.section}>
        <TextField
          label="Title"
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          editable={!isPending}
        />
      </View>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={isPending ? 'Saving...' : 'Save'}
          onPress={handleSave}
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: ds.spacing.md,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: ds.borderRadius.md,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: ds.borderRadius.md,
    backgroundColor: ds.colors.highlight.lightest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ds.borderWidth.sm,
    borderColor: ds.colors.highlight.darkest,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    ...ds.font.body.md,
    color: ds.colors.dark.lightest,
  },
  section: {
    gap: ds.spacing.sm,
  },
  sectionTitle: {
    ...ds.font.heading.h5,
    color: ds.colors.dark.dark,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: ds.spacing.lg,
  },
});
