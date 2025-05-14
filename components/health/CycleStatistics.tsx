import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { LineChart } from 'react-native-chart-kit';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

// Get screen width for the chart
const screenWidth = Dimensions.get('window').width - 32; // 16px padding on each side

interface CycleStatisticsProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      color: () => string;
      strokeWidth: number;
    }[];
    legend: string[];
  };
}

const CycleStatistics = ({ data }: CycleStatisticsProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: palette.card,
    backgroundGradientTo: palette.card,
    decimalPlaces: 0,
    color: () => palette.foreground,
    labelColor: () => palette.foreground,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: palette.primary
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <Text className="text-lg font-semibold text-foreground">Cycle Length History</Text>
      </CardHeader>
      <CardContent>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      </CardContent>
      <CardFooter>
        <Text className="text-xs text-muted-foreground">
          Your average cycle length is 28 days
        </Text>
      </CardFooter>
    </Card>
  );
};

export default CycleStatistics; 