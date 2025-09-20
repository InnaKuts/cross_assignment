import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ds } from '~/constants';
import { Button, CardsGrid, CardsRow, Fab, Icons, Tags, TextField } from '~/components';
import { requireImage } from '~/components/helpers/requireImage';
import { useThemeColors } from '~/contexts/ThemeContext';

export default function Overview() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary.lightest }]}>
      <View style={styles.topSection}>
        <TopSectionContent colors={colors} />
      </View>
      <View style={styles.bottomSection}>
        <BottomSectionContent />
      </View>
    </SafeAreaView>
  );
}

const BottomSectionContent = () => {
  return (
    <CardsGrid
      cards={[
        {
          id: '1',
          image: requireImage('~/assets/images/card-image.jpg'),
          title: 'Grid Card 1',
        },
        {
          id: '2',
          image: requireImage('~/assets/images/card-image.jpg'),
          title: 'Grid Card 2',
        },
        {
          id: '3',
          image: requireImage('~/assets/images/card-image.jpg'),
          title: 'Grid Card 3',
          buttonTitle: 'Button',
        },
        {
          id: '4',
          image: requireImage('~/assets/images/card-image.jpg'),
          title: 'Grid Card 4',
          buttonTitle: 'Button',
        },
      ]}
    />
  );
};

const TopSectionContent = ({ colors }: { colors: ReturnType<typeof useThemeColors> }) => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <Text style={[ds.font.heading.h1, { color: colors.secondary.darkest }]}>Overview</Text>
      <Button title="Primary Button" onPress={() => {}} />
      <Button title="Secondary Button" variant="secondary" onPress={() => {}} />
      <View style={styles.fabContainer}>
        <Fab icon={Icons.addOutline} onPress={() => {}} />
        <Fab icon={Icons.addOutline} variant="secondary" onPress={() => {}} />
      </View>
      <Tags
        tags={[
          { id: '1', text: 'Tag 1' },
          { id: '2', text: 'Tag 2' },
          { id: '3', text: 'Tag 3' },
        ]}
        onSelectionChange={() => {}}
      />
      <TextField label="TextField" placeholder="TextField" onPress={() => {}} />
      <CardsRow
        cards={[
          {
            id: '1',
            image: requireImage('~/assets/images/card-image.jpg'),
            title: 'Row Card 1',
          },
          {
            id: '2',
            image: requireImage('~/assets/images/card-image.jpg'),
            title: 'Row Card 2',
          },
          {
            id: '3',
            image: requireImage('~/assets/images/card-image.jpg'),
            title: 'Row Card 3',
            buttonTitle: 'Action',
          },
          {
            id: '4',
            image: requireImage('~/assets/images/card-image.jpg'),
            title: 'Row Card 4',
            buttonTitle: 'Action',
          },
          {
            id: '5',
            image: requireImage('~/assets/images/card-image.jpg'),
            title: 'Row Card 5',
            buttonTitle: 'Action',
          },
          {
            id: 'addButton',
            icon: Icons.addOutline,
            onButtonPress: () => {},
          },
        ]}
      />
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topSection: {
    flex: 0.7,
  },
  bottomSection: {
    flex: 0.3,
    padding: ds.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: ds.spacing.md,
    gap: ds.spacing.md,
    alignItems: 'center',
  },
  fabContainer: {
    flexDirection: 'row',
    gap: ds.spacing.md,
  },
});
