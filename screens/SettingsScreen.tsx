import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button, TextField } from '~/components';
import { ds } from '~/constants';
import { SCREENS } from '~/navigation/screens';
import { useResetUser, useUser, useUpdateUserName } from '~/data/auth';
import { useThemeMode, useThemeColors } from '~/contexts/ThemeContext';
import { useState } from 'react';

export default function Settings() {
  const navigation = useNavigation();
  const user = useUser();
  const resetAuth = useResetUser();
  const updateUserName = useUpdateUserName();
  const { mode, setMode, toggle } = useThemeMode();
  const colors = useThemeColors();
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);

  const handleResetAuth = () => {
    Alert.alert(
      'Reset Authentication',
      'Are you sure you want to reset your authentication? This will create a new anonymous user.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetAuth();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary.lightest }]}>
      <View style={styles.container}>
        <Text style={[ds.font.heading.h1, { color: colors.secondary.darkest }]}>Settings</Text>

        <View style={[styles.authSection, { backgroundColor: colors.highlight.lightest }]}>
          <Text style={[ds.font.heading.h3, { color: colors.secondary.darkest }]}>
            User Profile
          </Text>

          {isEditingName ? (
            <View style={styles.nameEditContainer}>
              <TextField
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                label="Name"
              />
              <View style={styles.nameEditButtons}>
                <Button
                  title="Save"
                  onPress={() => {
                    if (name.trim()) {
                      updateUserName(name.trim());
                      setIsEditingName(false);
                    }
                  }}
                />
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => {
                    setName(user?.name || '');
                    setIsEditingName(false);
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.nameDisplayContainer}>
              <Text style={[ds.font.body.md, { color: colors.secondary.darkest }]}>
                Name: {user?.name || 'None'}
              </Text>
              <Button
                title="Edit Name"
                variant="secondary"
                onPress={() => setIsEditingName(true)}
              />
            </View>
          )}

          <Text style={[ds.font.body.md, { color: colors.secondary.darkest }]}>
            User ID: {user?.id || 'None'}
          </Text>
          <Text style={[ds.font.body.md, { color: colors.secondary.darkest }]}>
            Anonymous: {user?.isAnonymous ? 'Yes' : 'No'}
          </Text>
        </View>

        <View style={[styles.themeSection, { backgroundColor: colors.highlight.lightest }]}>
          <Text style={[ds.font.heading.h3, { color: colors.secondary.darkest }]}>Theme</Text>
          <Text style={[ds.font.body.md, { color: colors.secondary.darkest }]}>
            Current: {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Text>

          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: colors.primary.medium },
                mode === 'light' && styles.themeButtonActive,
              ]}
              onPress={() => setMode('light')}>
              <Text
                style={[
                  styles.themeButtonText,
                  { color: colors.secondary.darkest },
                  mode === 'light' && styles.themeButtonTextActive,
                ]}>
                Light
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: colors.primary.medium },
                mode === 'dark' && styles.themeButtonActive,
              ]}
              onPress={() => setMode('dark')}>
              <Text
                style={[
                  styles.themeButtonText,
                  { color: colors.secondary.darkest },
                  mode === 'dark' && styles.themeButtonTextActive,
                ]}>
                Dark
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeButton,
                { backgroundColor: colors.primary.medium },
                mode === 'system' && styles.themeButtonActive,
              ]}
              onPress={() => setMode('system')}>
              <Text
                style={[
                  styles.themeButtonText,
                  { color: colors.secondary.darkest },
                  mode === 'system' && styles.themeButtonTextActive,
                ]}>
                System
              </Text>
            </TouchableOpacity>
          </View>

          <Button title="Toggle Theme" onPress={toggle} />
        </View>

        <Button
          title="Reset Auth"
          onPress={() => {
            handleResetAuth();
          }}
        />

        <Button
          title="Overview"
          onPress={() => {
            navigation.navigate(SCREENS.OVERVIEW);
          }}
        />
      </View>
    </SafeAreaView>
  );
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
  authSection: {
    padding: ds.spacing.md,
    borderRadius: ds.borderRadius.md,
    gap: ds.spacing.sm,
    width: '100%',
  },
  nameEditContainer: {
    gap: ds.spacing.sm,
  },
  nameEditButtons: {
    flexDirection: 'row',
    gap: ds.spacing.sm,
  },
  nameDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeSection: {
    padding: ds.spacing.md,
    borderRadius: ds.borderRadius.md,
    gap: ds.spacing.sm,
    width: '100%',
  },
  themeButtons: {
    flexDirection: 'row',
    gap: ds.spacing.xs,
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    paddingVertical: ds.spacing.sm,
    paddingHorizontal: ds.spacing.md,
    borderRadius: ds.borderRadius.sm,
    alignItems: 'center',
  },
  themeButtonActive: {
    backgroundColor: ds.theme.light.colors.highlight.medium,
  },
  themeButtonText: {
    ...ds.font.body.md,
  },
  themeButtonTextActive: {
    color: ds.theme.light.colors.primary.lightest,
    fontWeight: '600',
  },
});
