import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';

interface FlowButtonProps {
  level: string;
  label: string;
  current: string;
  onPress: (level: string) => void;
}

const FlowButton = ({ level, label, current, onPress }: FlowButtonProps) => (
  <TouchableOpacity
    onPress={() => onPress(level)}
    className={`px-4 py-2 rounded-full ${current === level ? 'bg-primary' : 'bg-background border border-input'}`}
  >
    <Text 
      className={`text-sm ${current === level ? 'text-primary-foreground' : 'text-foreground'}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default FlowButton; 