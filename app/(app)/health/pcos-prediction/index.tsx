import React from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { BackButtonBar } from '@/components/BackButtonBar';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { HistoryIcon, LabTestIcon, UltrasoundIcon } from '@/components/health/PredictionIcons';
import { useQueryClient } from '@tanstack/react-query';
import { getPredictions, Prediction } from '@/http/api/predictions';
import { RotateCw } from 'lucide-react-native';

// Format date to a user-friendly string
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function PCOSPredictionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // Get the existing predictions data from the query cache
  const predictions = queryClient.getQueryData<Prediction[]>(['predictions']) || [];
  const queryState = queryClient.getQueryState(['predictions']);
  const isLoading = queryState?.fetchStatus === 'fetching';
  const isError = queryState?.status === 'error';
  const error = queryState?.error as Error | null;
  
  // Manually trigger refetch of the predictions query
  const refetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['predictions'],
      queryFn: getPredictions,
    });
  };

  // Prefetch predictions if not already in cache
  React.useEffect(() => {
    if (!predictions.length && queryState?.fetchStatus !== 'fetching') {
      refetch();
    }
  }, []);

  // Navigation handlers with proper typing
  const navigateToHistory = () => {
    router.push({
      pathname: "/(app)/health/pcos-prediction/history/",
    } as any);
  };

  const navigateToLabTest = () => {
    router.push({
      pathname: "/(app)/health/pcos-prediction/lab-test/",
    } as any);
  };

  const navigateToUltrasound = () => {
    router.push({
      pathname: "/(app)/health/pcos-prediction/ultrasound/",
    } as any);
  };
  
  // Handler for viewing prediction details directly
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
        <BackButtonBar text="PCOS Prediction" />
        
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-foreground">
            PCOS Prediction Tools
          </Text>
          <TouchableOpacity 
            onPress={refetch}
            className="p-2 rounded-full bg-primary/10"
          >
            <RotateCw size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>


        {/* Recent Predictions */}
        {predictions.length > 0 && (
          <Card className="mb-4">
            <CardHeader>
              <Text className="text-lg font-semibold text-foreground">Recent Predictions</Text>
            </CardHeader>
            <CardContent>
              {predictions.slice(0, 3).map(prediction => (
                <TouchableOpacity
                  key={prediction.id}
                  onPress={() => viewPredictionDetails(prediction.id)}
                  className="mb-2 p-3 border-b border-border"
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
              ))}
            </CardContent>
          </Card>
        )}
        
        
        {/* History Card */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={navigateToHistory}
          className="mb-4"
        >
          <Card>
            <CardContent className="py-6">
              <View className="flex-row items-center">
                <View className="mr-4 w-16 h-16 justify-center items-center">
                  <HistoryIcon />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground mb-1">Prediction History</Text>
                  <Text className="text-sm text-muted-foreground">
                    View your previous PCOS prediction records and results
                  </Text>
                  {isLoading ? (
                    <ActivityIndicator size="small" className="mt-2" />
                  ) : isError ? (
                    <Text className="text-xs text-red-500 mt-1">
                      {error?.message || 'Failed to load predictions'}
                    </Text>
                  ) : (
                    <Text className="text-xs text-muted-foreground mt-1">
                      {predictions.length} predictions available
                    </Text>
                  )}
                </View>
              </View>
            </CardContent>
          </Card>
        </TouchableOpacity>
        
        
        {/* Lab Test Card */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={navigateToLabTest}
          className="mb-4"
        >
          <Card>
            <CardContent className="py-6">
              <View className="flex-row items-center">
                <View className="mr-4 w-16 h-16 justify-center items-center">
                  <LabTestIcon />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground mb-1">Predict with Lab Test</Text>
                  <Text className="text-sm text-muted-foreground">
                    Use your lab test data to predict PCOS risk
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </TouchableOpacity>
        
        {/* Ultrasound Card */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={navigateToUltrasound}
          className="mb-4"
        >
          <Card>
            <CardContent className="py-6">
              <View className="flex-row items-center">
                <View className="mr-4 w-16 h-16 justify-center items-center">
                  <UltrasoundIcon />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground mb-1">Predict with Ultrasound</Text>
                  <Text className="text-sm text-muted-foreground">
                    Upload ultrasound images for PCOS prediction
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 