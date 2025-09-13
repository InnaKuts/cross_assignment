import React from 'react';
import { Alert } from 'react-native';
import { Icon, Icons } from './Icon';
import { useThemeColors } from '~/contexts/ThemeContext';

interface DeleteButtonProps {
  onDelete: () => void;
  title?: string;
  message?: string;
  size?: number;
  color?: string;
  style?: any;
}

export function DeleteButton({
  onDelete,
  title = 'Delete',
  message = 'Are you sure you want to delete this item?',
  size = 24,
  color,
  style,
}: DeleteButtonProps) {
  const colors = useThemeColors();
  const iconColor = color || colors.error.dark;

  const handlePress = () => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  return (
    <Icon
      name={Icons.trashOutline}
      size={size}
      color={iconColor}
      style={style}
      onPress={handlePress}
    />
  );
}
