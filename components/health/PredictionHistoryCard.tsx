import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface PredictionItem {
  id: number;
  date: string;
  method: string;
  result: string;
  probability: string;
}

interface PredictionHistoryCardProps {
  predictions: PredictionItem[];
}

const PredictionHistoryCard = ({ predictions }: PredictionHistoryCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Prediction History</Text>
      </CardHeader>
      <CardContent>
        {predictions.length > 0 ? (
          predictions.map(prediction => (
            <View key={prediction.id} className="mb-4 p-3 border-b border-border">
              <View className="flex-row justify-between mb-1">
                <Text className="text-sm font-medium text-foreground">{prediction.date}</Text>
                <Text className={`text-sm font-medium ${prediction.result === 'Positive' ? 'text-red-500' : 'text-green-500'}`}>
                  {prediction.result}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-muted-foreground">Method: {prediction.method}</Text>
                <Text className="text-xs text-muted-foreground">Probability: {prediction.probability}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text className="text-sm text-muted-foreground py-2">No prediction history available</Text>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionHistoryCard;
export type { PredictionItem }; 