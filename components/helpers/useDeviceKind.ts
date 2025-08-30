import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { ds } from '~/constants';

export type DeviceKind = 'phone' | 'tablet' | 'desktop';

export const useDeviceKind = () => {
  const [deviceKind, setDeviceKind] = useState<DeviceKind>('phone');

  useEffect(() => {
    const checkDeviceKind = () => {
      const { width } = Dimensions.get('window');

      if (width >= ds.breakpoints.desktop) {
        setDeviceKind('desktop');
      } else if (width >= ds.breakpoints.tablet) {
        setDeviceKind('tablet');
      } else {
        setDeviceKind('phone');
      }
    };

    checkDeviceKind();

    const subscription = Dimensions.addEventListener('change', checkDeviceKind);

    return () => subscription?.remove();
  }, []);

  return {
    deviceKind,
    isPhone: deviceKind === 'phone',
    isTablet: deviceKind === 'tablet',
    isDesktop: deviceKind === 'desktop',
    isTabletOrLarger: deviceKind === 'tablet' || deviceKind === 'desktop',
    isDesktopOrLarger: deviceKind === 'desktop',
  };
};
