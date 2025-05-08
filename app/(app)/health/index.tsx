import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { Calendar, DateData } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Textarea } from '~/components/ui/textarea';
import ProfileNavbar from '@/components/ProfileNavbar';

// Get screen width for the chart
const screenWidth = Dimensions.get('window').width - 32; // 16px padding on each side

// Update the markedDates type to allow any string key
interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    dotColor?: string;
    selectedColor?: string;
  };
}

const HealthPage = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  // Calendar marked dates state
  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    '2023-05-01': { selected: true, marked: true, dotColor: palette.primary, selectedColor: palette.primary + '40' },
    '2023-05-02': { selected: true, marked: true, dotColor: palette.primary, selectedColor: palette.primary + '40' },
    '2023-05-03': { selected: true, marked: true, dotColor: palette.primary, selectedColor: palette.primary + '40' },
    '2023-05-04': { selected: true, marked: true, dotColor: palette.primary, selectedColor: palette.primary + '40' },
    '2023-05-05': { selected: true, marked: true, dotColor: palette.primary, selectedColor: palette.primary + '40' },
    '2023-05-28': { selected: true, marked: true, dotColor: '#F08080', selectedColor: '#F0808040' },
    '2023-05-29': { selected: true, marked: true, dotColor: '#F08080', selectedColor: '#F0808040' },
    '2023-05-30': { selected: true, marked: true, dotColor: '#F08080', selectedColor: '#F0808040' },
    '2023-05-31': { selected: true, marked: true, dotColor: '#F08080', selectedColor: '#F0808040' },
  });
  
  // Daily tracking state
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dailyFlow, setDailyFlow] = useState<string>('none');
  const [dailySymptoms, setDailySymptoms] = useState<string[]>([]);
  const [dailyMood, setDailyMood] = useState<string>('');
  const [dailyNotes, setDailyNotes] = useState<string>('');
  const [dailyTemperature, setDailyTemperature] = useState<string>('');
  
  // Form state
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [symptoms, setSymptoms] = useState('');
  const [mood, setMood] = useState('');
  const [flow, setFlow] = useState('medium');
  
  // Mock data for the line graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [28, 26, 28, 29, 27, 28],
        color: () => palette.primary,
        strokeWidth: 2
      }
    ],
    legend: ['Cycle Length (days)']
  };
  
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
  
  // Flow button component
  interface FlowButtonProps {
    level: string;
    label: string;
    current: string;
    onPress: (level: string) => void;
  }
  
  const FlowButton = ({ level, label, current, onPress }: FlowButtonProps) => (
    <TouchableOpacity
      onPress={() => onPress(level)}
      className={`px-4 py-2 rounded-full ${current === level ? 'bg-primary' : 'bg-background border border-input'}`}
    >
      <Text 
        className={`text-sm ${current === level ? 'text-primary-foreground' : 'text-foreground'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  // Symptom chip component
  interface SymptomChipProps {
    symptom: string;
    isSelected: boolean;
    onToggle: (symptom: string) => void;
  }
  
  const SymptomChip = ({ symptom, isSelected, onToggle }: SymptomChipProps) => (
    <TouchableOpacity
      onPress={() => onToggle(symptom)}
      className={`px-4 py-2 rounded-full mr-2 mb-2 ${isSelected ? 'bg-primary' : 'bg-background border border-input'}`}
    >
      <Text 
        className={`text-sm ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}
      >
        {symptom}
      </Text>
    </TouchableOpacity>
  );
  
  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    if (dailySymptoms.includes(symptom)) {
      setDailySymptoms(dailySymptoms.filter(s => s !== symptom));
    } else {
      setDailySymptoms([...dailySymptoms, symptom]);
    }
  };
  
  // Common symptoms list
  const commonSymptoms = [
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 
    'Breast Tenderness', 'Acne', 'Nausea', 'Insomnia',
    'Back Pain', 'Food Cravings'
  ];
  
  // Mood options
  const moodOptions = ['Happy', 'Calm', 'Sad', 'Irritable', 'Anxious', 'Energetic'];
  
  // Handle day selection in calendar
  const handleDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    
    // Here you would normally fetch the data for this day from your backend
    // For now, we'll just reset the form
    setDailyFlow('none');
    setDailySymptoms([]);
    setDailyMood('');
    setDailyNotes('');
    setDailyTemperature('');
    
    console.log('Selected day', dateString);
  };
  
  // Save daily tracking
  const saveDailyTracking = () => {
    // Format data for API
    const dailyData = {
      date: selectedDate,
      flow: dailyFlow,
      symptoms: dailySymptoms,
      mood: dailyMood,
      notes: dailyNotes,
      temperature: dailyTemperature ? parseFloat(dailyTemperature) : null
    };
    
    console.log('Saving daily data:', dailyData);
    // Here you would send this data to your backend API
    
    // Update marked dates to show this day has been logged
    setMarkedDates({
      ...markedDates,
      [selectedDate]: { 
        ...markedDates[selectedDate],
        marked: true, 
        dotColor: dailyFlow !== 'none' ? palette.primary : '#F08080'
      }
    });
  };
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ProfileNavbar />
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">Cycle Tracking</Text>
        
        {/* Calendar Card */}
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-foreground">Menstrual Calendar</Text>
          </CardHeader>
          <CardContent>
            <Calendar
              theme={{
                calendarBackground: palette.card,
                textSectionTitleColor: palette.foreground,
                textSectionTitleDisabledColor: palette.muted,
                dayTextColor: palette.foreground,
                todayTextColor: palette.primary,
                selectedDayTextColor: palette.foreground,
                monthTextColor: palette.foreground,
                indicatorColor: palette.primary,
                textDisabledColor: palette['muted-foreground'],
                arrowColor: palette.foreground,
              }}
              markedDates={{
                ...markedDates,
                [selectedDate]: {
                  ...markedDates[selectedDate],
                  selected: true,
                  selectedColor: palette.primary + '20'
                }
              }}
              markingType={'period'}
              onDayPress={handleDayPress}
              current={selectedDate}
            />
          </CardContent>
          <CardFooter className="flex-row">
            <View className="flex-row items-center mr-4">
              <View className="w-3 h-3 rounded-full bg-primary mr-2" />
              <Text className="text-xs text-foreground">Period</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-[#F08080] mr-2" />
              <Text className="text-xs text-foreground">Fertile Window</Text>
            </View>
          </CardFooter>
        </Card>
        
        {/* Daily Tracking Form */}
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-foreground">
              Log for {selectedDate}
            </Text>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Flow Selection */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Flow</Text>
              <View className="flex-row flex-wrap gap-2">
                <FlowButton level="none" label="None" current={dailyFlow} onPress={setDailyFlow} />
                <FlowButton level="spotting" label="Spotting" current={dailyFlow} onPress={setDailyFlow} />
                <FlowButton level="light" label="Light" current={dailyFlow} onPress={setDailyFlow} />
                <FlowButton level="medium" label="Medium" current={dailyFlow} onPress={setDailyFlow} />
                <FlowButton level="heavy" label="Heavy" current={dailyFlow} onPress={setDailyFlow} />
              </View>
            </View>
            
            {/* Temperature Tracking */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Basal Body Temperature (°F)</Text>
              <TextInput
                value={dailyTemperature}
                onChangeText={setDailyTemperature}
                keyboardType="numeric"
                placeholder="98.6"
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              />
            </View>
            
            {/* Symptoms Selection */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Symptoms</Text>
              <View className="flex-row flex-wrap">
                {commonSymptoms.map(symptom => (
                  <SymptomChip 
                    key={symptom}
                    symptom={symptom}
                    isSelected={dailySymptoms.includes(symptom)}
                    onToggle={toggleSymptom}
                  />
                ))}
              </View>
            </View>
            
            {/* Mood Selection */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Mood</Text>
              <View className="flex-row flex-wrap gap-2">
                {moodOptions.map(option => (
                  <FlowButton 
                    key={option}
                    level={option}
                    label={option}
                    current={dailyMood}
                    onPress={setDailyMood}
                  />
                ))}
              </View>
            </View>
            
            {/* Notes */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Notes</Text>
              <Textarea
                value={dailyNotes}
                onChangeText={setDailyNotes}
                placeholder="Add any additional notes for today..."
                className="border border-input bg-background text-foreground"
                placeholderClassName="text-muted-foreground"
              />
            </View>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onPress={saveDailyTracking}>
              Save Daily Log
            </Button>
          </CardFooter>
        </Card>
        
        {/* Statistics Card */}
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
        
        {/* Cycle Settings Card */}
        <Card className="mb-6">
          <CardHeader>
            <Text className="text-lg font-semibold text-foreground">Cycle Settings</Text>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Cycle Length Input */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Average Cycle Length (days)</Text>
              <TextInput
                value={cycleLength}
                onChangeText={setCycleLength}
                keyboardType="numeric"
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              />
            </View>
            
            {/* Period Length Input */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Average Period Length (days)</Text>
              <TextInput
                value={periodLength}
                onChangeText={setPeriodLength}
                keyboardType="numeric"
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              />
            </View>
            
            {/* Typical Flow Selection */}
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">Typical Flow</Text>
              <View className="flex-row gap-2">
                <FlowButton level="light" label="Light" current={flow} onPress={setFlow} />
                <FlowButton level="medium" label="Medium" current={flow} onPress={setFlow} />
                <FlowButton level="heavy" label="Heavy" current={flow} onPress={setFlow} />
              </View>
            </View>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onPress={() => console.log('Saved cycle settings')}>
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthPage;