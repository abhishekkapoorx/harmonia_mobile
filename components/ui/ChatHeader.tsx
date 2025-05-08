import { View } from 'react-native';
import { Button } from './button';
import { Text } from './text';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { router } from 'expo-router';
import React from 'react'

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  chatTitle?: string;
}

export const ChatHeader = ({ onToggleSidebar, onNewChat, chatTitle = "Chat" }: ChatHeaderProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];

  return (
    <View className="w-full flex-row items-center justify-between px-4 pb-3 pt-10 bg-background border-b border-border">
      <Button variant={"link"} size="icon" onPress={onToggleSidebar} className="rounded-full">
        <Ionicons name="menu" size={24} color={palette.foreground} />
      </Button>
      <Text className="text-xl font-bold text-foreground">{chatTitle}</Text>
      <Button variant="link" size="icon" onPress={onNewChat} className="text-primary-foreground">
        <Ionicons name="add" size={24} color={palette.foreground} />
      </Button>
    </View>
  )
} 