import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

interface LabTestPredictionFormProps {
  age: string;
  setAge: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  bmi: string;
  setBmi: (value: string) => void;
  bloodGlucose: string;
  setBloodGlucose: (value: string) => void;
  insulinLevel: string;
  setInsulinLevel: (value: string) => void;
  testosteroneLevel: string;
  setTestosteroneLevel: (value: string) => void;
  onPredict: () => void;
}

const LabTestPredictionForm = ({
  age,
  setAge,
  weight,
  setWeight,
  height,
  setHeight,
  bmi,
  setBmi,
  bloodGlucose,
  setBloodGlucose,
  insulinLevel,
  setInsulinLevel,
  testosteroneLevel,
  setTestosteroneLevel,
  onPredict
}: LabTestPredictionFormProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Predict PCOS using Lab Test Data</Text>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground mb-1.5">Age</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Years"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground mb-1.5">Weight</Text>
            <TextInput
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="kg"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </View>
        </View>
        
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground mb-1.5">Height</Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholder="cm"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-foreground mb-1.5">BMI</Text>
            <TextInput
              value={bmi}
              onChangeText={setBmi}
              keyboardType="numeric"
              placeholder="kg/m²"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </View>
        </View>
        
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Blood Glucose Level (mg/dL)</Text>
          <TextInput
            value={bloodGlucose}
            onChangeText={setBloodGlucose}
            keyboardType="numeric"
            placeholder="Fasting blood glucose"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Insulin Level (μIU/mL)</Text>
          <TextInput
            value={insulinLevel}
            onChangeText={setInsulinLevel}
            keyboardType="numeric"
            placeholder="Fasting insulin"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
        
        <View>
          <Text className="text-sm font-medium text-foreground mb-1.5">Testosterone Level (ng/dL)</Text>
          <TextInput
            value={testosteroneLevel}
            onChangeText={setTestosteroneLevel}
            keyboardType="numeric"
            placeholder="Total testosterone"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={onPredict}>
          <Text className="text-primary-foreground">Predict from Lab Data</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LabTestPredictionForm; 