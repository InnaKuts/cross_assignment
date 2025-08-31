import React from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ds } from '~/constants';

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
  color = ds.colors.error.dark,
  style,
}: DeleteButtonProps) {
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
    <Ionicons name="trash-outline" size={size} color={color} style={style} onPress={handlePress} />
  );
}
