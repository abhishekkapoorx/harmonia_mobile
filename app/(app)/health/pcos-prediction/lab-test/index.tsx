import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import LabTestPredictionForm from '@/components/health/LabTestPredictionForm';
import { BackButtonBar } from '@/components/BackButtonBar';
import axiosInstance from '@/http/axiosInstance';
import { useRouter } from 'expo-router';
import { PredictionInputData } from '@/http/api/predictions';

// Define the response interface
interface PredictionResponse {
  prediction: number;
  prediction_id: string;
  prediction_label: string;
  probability: string;
  recommendation: string;
  risk_level: string;
  success: boolean;
}

export default function LabTestPredictionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    bmi: '',
    blood_group: '',
    hgb: '',
    cycler: '1', // Default to regular
    cycle_length: '',
    marriage_status: '', // Years of marriage
    pregnant: '0', // Default to not pregnant
    abortions: '',
    i_hcg: '',
    ii_hcg: '',
    fsh_lh: '',
    waist_hip_ratio: '',
    tsh: '',
    amh: '',
    prl: '',
    vit_d3: '',
    prg: '',
    rbs: '',
    weight_gain: false,
    hair_growth: false,
    skin_darkening: false,
    hair_loss: false,
    pimples: false,
    fast_food: false,
    reg_exercise: false,
    bp_systolic: '',
    bp_diastolic: '',
    follicle_no_l: '',
    follicle_no_r: '',
    avg_f_size_l: '',
    avg_f_size_r: '',
    endometrium: '',
  });
  
  // Handle form field changes
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Submit form data to API
  const handleSubmit = async (values: Partial<PredictionInputData>) => {
    try {
      setIsLoading(true);
      
      // Call the API endpoint
      const response = await axiosInstance.post<PredictionResponse>(
        '/predict/predict-pcos',
        values
      );
      
      // Handle successful response
      if (response.data.success) {
        // Navigate to details page with the prediction ID
        router.push({
          pathname: "/(app)/health/pcos-prediction/history/details",
          params: { id: response.data.prediction_id }
        } as any);
      } else {
        Alert.alert('Prediction Failed', 'Unable to generate prediction. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
      Alert.alert(
        'Error',
        'Failed to submit prediction data. Please check your inputs and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-8">
        <BackButtonBar text="Lab Test Prediction" />
        
        <LabTestPredictionForm
          initialValues={formData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
} 