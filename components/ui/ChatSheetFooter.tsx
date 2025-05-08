import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './button';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { Text } from './text';

interface ChatSheetFooterProps {
  onNewChat: () => void;
}

export const ChatSheetFooter: React.FC<ChatSheetFooterProps> = ({ onNewChat }) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <View style={styles.container}>
      <Button
        variant="default"
        className="w-full flex-row items-center justify-center"
        onPress={onNewChat}
      >
        <Ionicons name="add-circle-outline" size={18} color={palette['primary-foreground']} />
        <Text className="ml-2 text-primary-foreground">New Chat</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

export default ChatSheetFooter; 