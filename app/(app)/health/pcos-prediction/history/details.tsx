import React from 'react';
import { SafeAreaView, ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BackButtonBar } from '@/components/BackButtonBar';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getPredictionById, Prediction } from '@/http/api/predictions';
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

export default function PredictionDetailsPage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id } = params;
  
  const { 
    data: prediction, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['prediction', id],
    queryFn: () => getPredictionById(id as string),
    enabled: !!id
  });

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

  // Group input data into categories for better display
  const renderInputDataSections = () => {
    if (!prediction) return null;
    
    const data = prediction.input_data;
    
    return (
      <>
        {/* Basic Information */}
        <View className="mb-4">
          <Text className="text-md font-semibold text-foreground mb-2">Basic Information</Text>
          <View className="flex-row flex-wrap">
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Age</Text>
              <Text className="text-sm text-foreground">{data.age} years</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Weight</Text>
              <Text className="text-sm text-foreground">{data.weight} kg</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">BMI</Text>
              <Text className="text-sm text-foreground">{data.bmi}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Waist-Hip Ratio</Text>
              <Text className="text-sm text-foreground">{data.waist_hip_ratio}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Blood Pressure</Text>
              <Text className="text-sm text-foreground">{data.bp_systolic}/{data.bp_diastolic} mmHg</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Cycle Length</Text>
              <Text className="text-sm text-foreground">{data.cycle_length} days</Text>
            </View>
          </View>
        </View>

        {/* Blood Tests */}
        <View className="mb-4">
          <Text className="text-md font-semibold text-foreground mb-2">Blood Tests</Text>
          <View className="flex-row flex-wrap">
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">FSH/LH Ratio</Text>
              <Text className="text-sm text-foreground">{data.fsh_lh}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">TSH</Text>
              <Text className="text-sm text-foreground">{data.tsh} µIU/mL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">AMH</Text>
              <Text className="text-sm text-foreground">{data.amh} ng/mL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">PRL</Text>
              <Text className="text-sm text-foreground">{data.prl} ng/mL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Vitamin D3</Text>
              <Text className="text-sm text-foreground">{data.vit_d3} ng/mL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">PRG</Text>
              <Text className="text-sm text-foreground">{data.prg} ng/mL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">RBS</Text>
              <Text className="text-sm text-foreground">{data.rbs} mg/dL</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Hemoglobin</Text>
              <Text className="text-sm text-foreground">{data.hgb} g/dL</Text>
            </View>
          </View>
        </View>

        {/* Ultrasound Findings */}
        <View className="mb-4">
          <Text className="text-md font-semibold text-foreground mb-2">Ultrasound Findings</Text>
          <View className="flex-row flex-wrap">
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Follicles (Left)</Text>
              <Text className="text-sm text-foreground">{data.follicle_no_l}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Follicles (Right)</Text>
              <Text className="text-sm text-foreground">{data.follicle_no_r}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Avg Size (Left)</Text>
              <Text className="text-sm text-foreground">{data.avg_f_size_l} mm</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Avg Size (Right)</Text>
              <Text className="text-sm text-foreground">{data.avg_f_size_r} mm</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Endometrium</Text>
              <Text className="text-sm text-foreground">{data.endometrium} mm</Text>
            </View>
          </View>
        </View>

        {/* Symptoms */}
        <View className="mb-4">
          <Text className="text-md font-semibold text-foreground mb-2">Symptoms & Lifestyle</Text>
          <View className="flex-row flex-wrap">
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Weight Gain</Text>
              <Text className="text-sm text-foreground">{data.weight_gain ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Hair Growth</Text>
              <Text className="text-sm text-foreground">{data.hair_growth ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Skin Darkening</Text>
              <Text className="text-sm text-foreground">{data.skin_darkening ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Hair Loss</Text>
              <Text className="text-sm text-foreground">{data.hair_loss ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Pimples</Text>
              <Text className="text-sm text-foreground">{data.pimples ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Fast Food</Text>
              <Text className="text-sm text-foreground">{data.fast_food ? 'Yes' : 'No'}</Text>
            </View>
            <View className="w-1/2 mb-2">
              <Text className="text-xs text-muted-foreground">Regular Exercise</Text>
              <Text className="text-sm text-foreground">{data.reg_exercise ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-8">
        <BackButtonBar text="Prediction Details" />
        
        <View className="flex-row justify-end mb-2">
          <TouchableOpacity 
            onPress={() => refetch()}
            className="p-2 rounded-full bg-primary/10"
          >
            <RotateCw size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <View className="py-8 items-center justify-center">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-muted-foreground">Loading prediction details...</Text>
          </View>
        ) : isError ? (
          <View className="py-8 items-center">
            <Text className="text-red-500">{(error as Error)?.message || 'Failed to load prediction details'}</Text>
          </View>
        ) : prediction ? (
          <>
            {/* Result Card */}
            <Card className="mb-6">
              <CardHeader>
                <Text className="text-lg font-semibold text-foreground">Prediction Result</Text>
              </CardHeader>
              <CardContent>
                <View className="items-center py-4">
                  <Text className={`text-2xl font-bold ${prediction.prediction === 1 ? 'text-red-500' : 'text-green-500'} mb-2`}>
                    {prediction.prediction_label}
                  </Text>
                  <Text className={`text-lg font-medium ${getRiskLevelColor(prediction.risk_level)} mb-4`}>
                    {prediction.risk_level.charAt(0).toUpperCase() + prediction.risk_level.slice(1)} Risk
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {formatDate(prediction.created_at)}
                  </Text>
                </View>
              </CardContent>
            </Card>

            {/* Input Data Card */}
            <Card className="mb-6">
              <CardHeader>
                <Text className="text-lg font-semibold text-foreground">Input Parameters</Text>
              </CardHeader>
              <CardContent>
                {renderInputDataSections()}
              </CardContent>
              <CardFooter>
                <Text className="text-xs text-muted-foreground">
                  ID: {prediction.id.slice(-10)}
                </Text>
              </CardFooter>
            </Card>
          </>
        ) : (
          <View className="py-8 items-center">
            <Text className="text-muted-foreground">No prediction details found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 