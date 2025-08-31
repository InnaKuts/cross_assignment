import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ds } from '~/constants';
import { Button, CardsGrid, Fab, Tags, TextField } from '~/components';

export default function Overview() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={ds.font.heading.h1}>Overview</Text>
        <Button title="Primary Button" onPress={() => {}} />
        <Button title="Secondary Button" variant="secondary" onPress={() => {}} />
        <View style={styles.fabContainer}>
          <Fab icon="add" onPress={() => {}} />
          <Fab icon="add" variant="secondary" onPress={() => {}} />
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
        <CardsGrid
          cards={[
            { id: '1', imageSource: require('~/assets/images/card-image.jpg'), title: 'Card 1' },
            { id: '2', imageSource: require('~/assets/images/card-image.jpg'), title: 'Card 2' },
            {
              id: '3',
              imageSource: require('~/assets/images/card-image.jpg'),
              title: 'Card 3',
              buttonTitle: 'Button',
            },
            {
              id: '4',
              imageSource: require('~/assets/images/card-image.jpg'),
              title: 'Card 4',
              buttonTitle: 'Button',
            },
          ]}
        />
      </View>
    </SafeAreaView>
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
    gap: ds.spacing.md,
    alignItems: 'center',
  },
  fabContainer: {
    flexDirection: 'row',
    gap: ds.spacing.md,
  },
});
