import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

export const HistoryIcon = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={palette.primary} strokeWidth="1.5" />
      <Path d="M12 6V12L16 14" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M8 2L12 6L16 2" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export const LabTestIcon = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Path d="M10 2V6M14 2V6" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M7 10H17" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M3 6H21" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4Z" stroke={palette.primary} strokeWidth="1.5" />
      <Path d="M7 14H10" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M14 14H17" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M7 17H10" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M14 17H17" stroke={palette.primary} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
};

export const UltrasoundIcon = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="4" width="20" height="16" rx="2" stroke={palette.primary} strokeWidth="1.5" />
      <Path d="M2 7H22" stroke={palette.primary} strokeWidth="1.5" />
      <Path d="M8 12C8 10.3431 9.34315 9 11 9H12C13.6569 9 15 10.3431 15 12V16C15 16.5523 14.5523 17 14 17H9C8.44772 17 8 16.5523 8 16V12Z" stroke={palette.primary} strokeWidth="1.5" />
      <Circle cx="7" cy="5.5" r="0.5" fill={palette.primary} />
      <Circle cx="5" cy="5.5" r="0.5" fill={palette.primary} />
    </Svg>
  );
}; 