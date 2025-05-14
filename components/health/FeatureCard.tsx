import React, { ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent } from '~/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  illustration: ReactNode;
  onPress: () => void;
}

const FeatureCard = ({ title, description, illustration, onPress }: FeatureCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="mb-4"
    >
      <Card>
        <CardContent className="py-6">
          <View className="flex-row items-center">
            <View className="mr-4 w-16 h-16 justify-center items-center">
              {illustration}
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground mb-1">{title}</Text>
              <Text className="text-sm text-muted-foreground">{description}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

export default FeatureCard; 