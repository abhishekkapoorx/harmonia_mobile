import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';

interface BottomSheetHandleProps {
  width?: number;
  height?: number;
}

export const BottomSheetHandle: React.FC<BottomSheetHandleProps> = ({ 
  width = 40, 
  height = 4 
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.handle, 
          { 
            width, 
            height,
            backgroundColor: palette.primary,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  handle: {
    borderRadius: 4,
  },
});

export default BottomSheetHandle; 