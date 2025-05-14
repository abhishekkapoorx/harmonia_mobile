import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import * as DocumentPicker from 'expo-document-picker';
import PredictionResultCard, { PredictionResult } from './PredictionResultCard';

interface UltrasoundImageUploadProps {
  onPredict: (uri: string) => Promise<PredictionResult>;
}

const UltrasoundImageUpload = ({ onPredict }: UltrasoundImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  
  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
        // Reset prediction when a new image is selected
        setPredictionResult(null);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const handlePredict = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    
    setUploading(true);
    
    try {
      const result = await onPredict(selectedImage.uri);
      setPredictionResult(result);
    } catch (error) {
      console.error('Error predicting from image:', error);
      alert('Error during prediction. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <Text className="text-lg font-semibold text-foreground">Predict PCOS using Ultrasound Image</Text>
        </CardHeader>
        <CardContent className="gap-4">
          <Text className="text-sm text-foreground mb-4">
            Upload your ultrasound image for PCOS prediction.
          </Text>
          
          <TouchableOpacity 
            onPress={pickImage}
            className="border-2 border-dashed border-input rounded-md p-4 items-center justify-center h-40 mb-4"
          >
            {selectedImage ? (
              <Image 
                source={{ uri: selectedImage.uri }} 
                className="w-full h-full rounded-md" 
                resizeMode="contain"
              />
            ) : (
              <View className="items-center">
                <Text className="text-sm text-muted-foreground mb-2">
                  Tap to select an ultrasound image
                </Text>
                <Text className="text-xs text-muted-foreground">
                  Supported formats: JPEG, PNG
                </Text>
              </View>
            )}
          </TouchableOpacity>
          
          {selectedImage && (
            <Text className="text-xs text-muted-foreground mb-2">
              Selected: {selectedImage.name}
            </Text>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onPress={handlePredict}
            disabled={!selectedImage || uploading}
          >
            <Text className="text-primary-foreground">
              {uploading ? 'Processing...' : 'Predict from Image'}
            </Text>
          </Button>
        </CardFooter>
      </Card>
      
      {predictionResult && (
        <PredictionResultCard result={predictionResult} />
      )}
    </>
  );
};

export default UltrasoundImageUpload; 