import { forwardRef, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Icon, IconName, Icons } from './Icon';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ds } from '~/constants';
import { useThemeColors } from '~/contexts/ThemeContext';

type FabProps = {
  icon?: IconName;
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export const Fab = forwardRef<View, FabProps>(
  ({ icon = Icons.addOutline, variant = 'primary', onPress, ...touchableProps }, ref) => {
    const colors = useThemeColors();

    // Animation values
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const pressScale = useSharedValue(1);

    // Function to trigger entrance animation
    const triggerEntranceAnimation = useCallback(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, { duration: 300 });
    }, [scale, opacity]);

    // Entrance animation on mount
    useEffect(() => {
      triggerEntranceAnimation();
    }, [triggerEntranceAnimation]);

    // Trigger animation when screen becomes focused (tab switch)
    useFocusEffect(() => {
      // Reset animation values
      scale.value = 0;
      opacity.value = 0;
      // Trigger entrance animation
      triggerEntranceAnimation();
    });

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value * pressScale.value }],
        opacity: opacity.value,
      };
    });

    // Press handlers
    const handlePressIn = () => {
      pressScale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 300,
      });
    };

    const handlePressOut = () => {
      pressScale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    };

    const handlePress = (event: any) => {
      if (onPress) {
        onPress(event);
      }
    };

    const buttonStyle = [
      styles.button,
      styles[`${variant}Button`],
      variant === 'primary' && { backgroundColor: colors.highlight.darkest },
      variant === 'secondary' && { backgroundColor: colors.highlight.lightest },
      variant === 'primary' && { shadowColor: colors.secondary.darkest },
      touchableProps.style,
    ];
    const iconStyle = [
      variant === 'primary' && { color: colors.primary.lightest },
      variant === 'secondary' && { color: colors.highlight.darkest },
    ];

    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          ref={ref}
          {...touchableProps}
          style={buttonStyle}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}>
          <Icon name={icon} size={ds.size[8]} style={iconStyle} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

Fab.displayName = 'Fab';

const styles = StyleSheet.create({
  button: {
    borderRadius: ds.borderRadius.full,
    padding: ds.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  secondaryButton: {
    // backgroundColor will be set dynamically
  },
});
