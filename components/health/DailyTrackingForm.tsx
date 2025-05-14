import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import FlowButton from './FlowButton';
import SymptomChip from './SymptomChip';

// Common symptoms and mood options
const commonSymptoms = [
  'Cramps', 'Headache', 'Bloating', 'Fatigue', 
  'Breast Tenderness', 'Acne', 'Nausea', 'Insomnia',
  'Back Pain', 'Food Cravings'
];

const moodOptions = ['Happy', 'Calm', 'Sad', 'Irritable', 'Anxious', 'Energetic'];

interface DailyTrackingFormProps {
  selectedDate: string;
  dailyFlow: string;
  setDailyFlow: (flow: string) => void;
  dailySymptoms: string[];
  toggleSymptom: (symptom: string) => void;
  dailyMood: string;
  setDailyMood: (mood: string) => void;
  dailyNotes: string;
  setDailyNotes: (notes: string) => void;
  dailyTemperature: string;
  setDailyTemperature: (temp: string) => void;
  onSave: () => void;
}

const DailyTrackingForm = ({
  selectedDate,
  dailyFlow,
  setDailyFlow,
  dailySymptoms,
  toggleSymptom,
  dailyMood,
  setDailyMood,
  dailyNotes,
  setDailyNotes,
  dailyTemperature,
  setDailyTemperature,
  onSave
}: DailyTrackingFormProps) => {
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">
          Log for {selectedDate}
        </Text>
      </CardHeader>
      <CardContent className="gap-4">
        {/* Flow Selection */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Flow</Text>
          <View className="flex-row flex-wrap gap-2">
            <FlowButton level="none" label="None" current={dailyFlow} onPress={setDailyFlow} />
            <FlowButton level="spotting" label="Spotting" current={dailyFlow} onPress={setDailyFlow} />
            <FlowButton level="light" label="Light" current={dailyFlow} onPress={setDailyFlow} />
            <FlowButton level="medium" label="Medium" current={dailyFlow} onPress={setDailyFlow} />
            <FlowButton level="heavy" label="Heavy" current={dailyFlow} onPress={setDailyFlow} />
          </View>
        </View>
        
        {/* Temperature Tracking */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Basal Body Temperature (°F)</Text>
          <TextInput
            value={dailyTemperature}
            onChangeText={setDailyTemperature}
            keyboardType="numeric"
            placeholder="98.6"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
        
        {/* Symptoms Selection */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Symptoms</Text>
          <View className="flex-row flex-wrap">
            {commonSymptoms.map(symptom => (
              <SymptomChip 
                key={symptom}
                symptom={symptom}
                isSelected={dailySymptoms.includes(symptom)}
                onToggle={toggleSymptom}
              />
            ))}
          </View>
        </View>
        
        {/* Mood Selection */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Mood</Text>
          <View className="flex-row flex-wrap gap-2">
            {moodOptions.map(option => (
              <FlowButton 
                key={option}
                level={option}
                label={option}
                current={dailyMood}
                onPress={setDailyMood}
              />
            ))}
          </View>
        </View>
        
        {/* Notes */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Notes</Text>
          <Textarea
            value={dailyNotes}
            onChangeText={setDailyNotes}
            placeholder="Add any additional notes for today..."
            className="border border-input bg-background text-foreground"
            placeholderClassName="text-muted-foreground"
          />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={onSave}>
          <Text className="text-primary-foreground">Save Daily Log</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyTrackingForm; 