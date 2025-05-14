import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';

interface SymptomChipProps {
  symptom: string;
  isSelected: boolean;
  onToggle: (symptom: string) => void;
}

const SymptomChip = ({ symptom, isSelected, onToggle }: SymptomChipProps) => (
  <TouchableOpacity
    onPress={() => onToggle(symptom)}
    className={`px-4 py-2 rounded-full mr-2 mb-2 ${isSelected ? 'bg-primary' : 'bg-background border border-input'}`}
  >
    <Text 
      className={`text-sm ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}
    >
      {symptom}
    </Text>
  </TouchableOpacity>
);

export default SymptomChip; 