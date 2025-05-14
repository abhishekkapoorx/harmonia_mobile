import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

interface ClassProbability {
  class_id: number;
  class_name: string;
  probability: number;
}

export interface PredictionResult {
  class_probabilities: ClassProbability[];
  confidence: number;
  prediction: number;
  prediction_label: string;
  recommendation: string;
  risk_level: string;
  success: boolean;
}

interface PredictionResultCardProps {
  result: PredictionResult;
}

const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel.toLowerCase()) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-orange-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-muted-foreground';
  }
};

const formatProbability = (probability: number): string => {
  return (probability * 100).toFixed(2) + '%';
};

const PredictionResultCard = ({ result }: PredictionResultCardProps) => {
  if (!result || !result.success) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Prediction Result</Text>
      </CardHeader>
      <CardContent className="gap-3">
        <View className="flex-row justify-between items-center bg-primary/20 p-3 rounded-md">
          <Text className="text-base font-medium text-foreground">Prediction:</Text>
          <Text className={`text-base font-semibold ${result.prediction_label === 'PCOS' ? 'text-red-500' : 'text-green-500'}`}>
            {result.prediction_label}
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center p-2">
          <Text className="text-sm text-foreground">Confidence:</Text>
          <Text className="text-sm font-medium text-foreground">
            {formatProbability(result.confidence)}
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center p-2">
          <Text className="text-sm text-foreground">Risk Level:</Text>
          <Text className={`text-sm font-medium ${getRiskLevelColor(result.risk_level)}`}>
            {result.risk_level.charAt(0).toUpperCase() + result.risk_level.slice(1)}
          </Text>
        </View>
        
        <View className="mt-2 p-3 bg-muted rounded-md">
          <Text className="text-sm font-medium text-foreground mb-1">Recommendation:</Text>
          <Text className="text-sm text-foreground">{result.recommendation}</Text>
        </View>
        
        <View className="mt-2">
          <Text className="text-sm font-medium text-foreground mb-1">Detailed Analysis:</Text>
          {result.class_probabilities.map((item) => (
            <View key={item.class_id} className="flex-row justify-between items-center p-2 border-b border-border">
              <Text className="text-sm text-foreground">
                {item.class_name.charAt(0).toUpperCase() + item.class_name.slice(1)}:
              </Text>
              <Text className="text-sm text-foreground">
                {formatProbability(item.probability)}
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
};

export default PredictionResultCard; 