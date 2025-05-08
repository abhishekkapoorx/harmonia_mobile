import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';

// This component will serve as the custom handle for the bottom sheet
export const BottomSheetHandleComponent = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.handle, 
          { backgroundColor: palette.muted }
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
    width: 40,
    height: 4,
    borderRadius: 4,
  },
});

export default BottomSheetHandleComponent; 