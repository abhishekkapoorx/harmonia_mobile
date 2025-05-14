import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import UltrasoundImageUpload from '@/components/health/UltrasoundImageUpload';
import { BackButtonBar } from '@/components/BackButtonBar';

export default function UltrasoundPredictionPage() {
  // Function to predict PCOS from ultrasound image
  const predictFromImage = async (imageUri: string) => {
    try {
      // Here you would upload the image to your prediction API
      console.log('Uploading image:', imageUri);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would process the prediction result
      alert('Image prediction complete!');
    } catch (error) {
      console.error('Error predicting from image:', error);
      throw error; // Re-throw to let the component handle it
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