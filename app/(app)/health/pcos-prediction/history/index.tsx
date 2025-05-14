import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BackButtonBar } from '@/components/BackButtonBar';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPredictions, Prediction } from '@/http/api/predictions';
import { RotateCw } from 'lucide-react-native';

// Format date to a user-friendly string
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function PredictionHistoryPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const queryClient = useQueryClient();
  
  
  const { 
    data: predictions = [], 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['predictions'],
    queryFn: getPredictions,
    initialData: () => {
      // Try to get predictions from params first if available
      if (params.predictions) {
        try {
          const parsedPredictions = JSON.parse(params.predictions as string);
          if (Array.isArray(parsedPredictions) && parsedPredictions.length > 0) {
            return parsedPredictions;
          }
        } catch (parseError) {
          console.error('Error parsing predictions from params:', parseError);
        }
      }
      return undefined;
    }
  });

  const viewPredictionDetails = (id: string) => {
    router.push({
      pathname: "/(app)/health/pcos-prediction/history/details",
      params: { id }
    } as any);
  };

  // Get risk level color
  const getRiskLevelColor = (risk: string): string => {
    switch (risk) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-8">
        <BackButtonBar text="Prediction History" />
        
        <View className="flex-row justify-end mb-2">
          <TouchableOpacity 
            onPress={() => refetch()}
            className="p-2 rounded-full bg-primary/10"
          >
            <RotateCw size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>
        
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-foreground">Predictions</Text>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <View className="py-8 items-center">
                <ActivityIndicator size="large" />
                <Text className="mt-4 text-muted-foreground">Loading predictions...</Text>
              </View>
            ) : isError ? (
              <View className="py-8 items-center">
                <Text className="text-red-500">{(error as Error).message || 'Failed to load predictions'}</Text>
              </View>
            ) : predictions.length === 0 ? (
              <View className="py-8 items-center">
                <Text className="text-muted-foreground">No predictions found.</Text>
              </View>
            ) : (
              predictions.map(prediction => (
                <TouchableOpacity
                  key={prediction.id}
                  onPress={() => viewPredictionDetails(prediction.id)}
                  className="mb-4 p-3 border-b border-border"
                >
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm font-medium text-foreground">
                      {formatDate(prediction.created_at)}
                    </Text>
                    <Text className={`text-sm font-medium ${prediction.prediction === 1 ? 'text-red-500' : 'text-green-500'}`}>
                      {prediction.prediction_label}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-muted-foreground">Age: {prediction.input_data.age}</Text>
                    <Text className={`text-xs ${getRiskLevelColor(prediction.risk_level)}`}>
                      Risk: {prediction.risk_level.charAt(0).toUpperCase() + prediction.risk_level.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
} 