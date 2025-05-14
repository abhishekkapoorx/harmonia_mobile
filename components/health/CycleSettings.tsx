import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import FlowButton from './FlowButton';

interface CycleSettingsProps {
  cycleLength: string;
  setCycleLength: (length: string) => void;
  periodLength: string;
  setPeriodLength: (length: string) => void;
  flow: string;
  setFlow: (flow: string) => void;
  onSave: () => void;
}

const CycleSettings = ({
  cycleLength,
  setCycleLength,
  periodLength,
  setPeriodLength,
  flow,
  setFlow,
  onSave
}: CycleSettingsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Cycle Settings</Text>
      </CardHeader>
      <CardContent className="gap-4">
        {/* Cycle Length Input */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Average Cycle Length (days)</Text>
          <TextInput
            value={cycleLength}
            onChangeText={setCycleLength}
            keyboardType="numeric"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
        
        {/* Period Length Input */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Average Period Length (days)</Text>
          <TextInput
            value={periodLength}
            onChangeText={setPeriodLength}
            keyboardType="numeric"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
        
        {/* Typical Flow Selection */}
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Typical Flow</Text>
          <View className="flex-row gap-2">
            <FlowButton level="light" label="Light" current={flow} onPress={setFlow} />
            <FlowButton level="medium" label="Medium" current={flow} onPress={setFlow} />
            <FlowButton level="heavy" label="Heavy" current={flow} onPress={setFlow} />
          </View>
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={onSave}>
          <Text className="text-primary-foreground">Save Settings</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CycleSettings; 