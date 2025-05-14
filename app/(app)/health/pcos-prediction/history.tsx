import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PredictionHistoryCard, { PredictionItem } from '@/components/health/PredictionHistoryCard';
import { BackButtonBar } from '@/components/BackButtonBar';

const PredictionHistoryPage = () => {
  // Prediction history mock data
  const predictionHistory: PredictionItem[] = [
    { 
      id: 1, 
      date: '2023-06-15', 
      method: 'Lab Test', 
      result: 'Negative',
      probability: '15%' 
    },
    { 
      id: 2, 
      date: '2023-08-22', 
      method: 'Ultrasound', 
      result: 'Positive',
      probability: '78%' 
    },
    { 
      id: 3, 
      date: '2023-09-10', 
      method: 'Lab Test', 
      result: 'Negative',
      probability: '22%' 
    },
    { 
      id: 4, 
      date: '2023-11-05', 
      method: 'Ultrasound', 
      result: 'Negative',
      probability: '35%' 
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <BackButtonBar text="Prediction History" />
        
        <PredictionHistoryCard predictions={predictionHistory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PredictionHistoryPage; 