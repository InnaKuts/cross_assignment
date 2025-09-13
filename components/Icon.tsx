import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

// Define only the icons we actually use in the app
export type IconName =
  | 'image'
  | 'alert-circle'
  | 'trash-outline'
  | 'camera'
  | 'add-outline'
  | 'shirt-outline'
  | 'people-outline'
  | 'settings-outline';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
  onPress?: () => void;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, style, onPress }) => {
  return <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />;
};

// Export the specific icons we use for type safety
export const Icons = {
  image: 'image' as const,
  alertCircle: 'alert-circle' as const,
  trashOutline: 'trash-outline' as const,
  camera: 'camera' as const,
  addOutline: 'add-outline' as const,
  shirtOutline: 'shirt-outline' as const,
  peopleOutline: 'people-outline' as const,
  settingsOutline: 'settings-outline' as const,
} as const;
