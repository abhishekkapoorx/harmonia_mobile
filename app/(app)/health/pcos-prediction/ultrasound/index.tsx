import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import UltrasoundImageUpload from '@/components/health/UltrasoundImageUpload';
import { BackButtonBar } from '@/components/BackButtonBar';
import { PredictionResult } from '@/components/health/PredictionResultCard';
import axios from 'axios';
import axiosInstance from '@/http/axiosInstance';

export default function UltrasoundPredictionPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to predict PCOS from ultrasound image
  const predictFromImage = async (imageUri: string): Promise<PredictionResult> => {
    try {
      setIsLoading(true);
      console.log('Uploading image:', imageUri);
      
      // Create form data
      const formData = new FormData();
      
      // Get the filename from the URI
      const uriParts = imageUri.split('/');
      const fileName = uriParts[uriParts.length - 1];
      
      // Append the image file
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg', // Adjust based on the image type if needed
      } as any);
      
      // Make the API call
      const response = await axiosInstance.post('/predict/predict-pcos-ultrasound', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('Prediction response:', response.data);
      
      if (response.data.success) {
        return response.data as PredictionResult;
      } else {
        throw new Error('Prediction failed');
      }
    } catch (error) {
      console.error('Error predicting from image:', error);
      Alert.alert(
        'Prediction Error',
        'Failed to analyze the ultrasound image. Please try again or contact support.',
      );
      // Return a default error result
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <BackButtonBar text="Ultrasound Prediction" />
        
        <UltrasoundImageUpload onPredict={predictFromImage} />
      </ScrollView>
    </SafeAreaView>
  );
} 