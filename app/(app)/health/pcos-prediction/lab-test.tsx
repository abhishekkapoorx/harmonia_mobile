import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import LabTestPredictionForm from '@/components/health/LabTestPredictionForm';
import { BackButtonBar } from '@/components/BackButtonBar';

const LabTestPredictionPage = () => {
  // State for lab test form
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [insulinLevel, setInsulinLevel] = useState('');
  const [testosteroneLevel, setTestosteroneLevel] = useState('');
  
  // Function to predict PCOS from lab data
  const predictFromLabData = () => {
    console.log('Predicting from lab data:', {
      age, weight, height, bmi, bloodGlucose, insulinLevel, testosteroneLevel
    });
    // Here you would make an API call to your prediction service
    alert('Lab test prediction submitted!');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <BackButtonBar text="Lab Test Prediction" />
        
        <LabTestPredictionForm
          age={age}
          setAge={setAge}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          bmi={bmi}
          setBmi={setBmi}
          bloodGlucose={bloodGlucose}
          setBloodGlucose={setBloodGlucose}
          insulinLevel={insulinLevel}
          setInsulinLevel={setInsulinLevel}
          testosteroneLevel={testosteroneLevel}
          setTestosteroneLevel={setTestosteroneLevel}
          onPredict={predictFromLabData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LabTestPredictionPage; 