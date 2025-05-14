import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import ProfileNavbar from '@/components/ProfileNavbar';
import { DateData } from 'react-native-calendars';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

// Import modular components
import MenstrualCalendar from '@/components/health/MenstrualCalendar';
import DailyTrackingForm from '@/components/health/DailyTrackingForm';
import CycleStatistics from '@/components/health/CycleStatistics';
import CycleSettings from '@/components/health/CycleSettings';
import { MarkedDates, ChartData } from '@/components/health/types';

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
  const [flow, setFlow] = useState('medium');
  
  // Mock data for the line graph
  const chartData: ChartData = {
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
  
  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    if (dailySymptoms.includes(symptom)) {
      setDailySymptoms(dailySymptoms.filter(s => s !== symptom));
    } else {
      setDailySymptoms([...dailySymptoms, symptom]);
    }
  };
  
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

  // Save cycle settings
  const saveCycleSettings = () => {
    console.log('Saved cycle settings', {
      cycleLength,
      periodLength,
      flow
    });
    // Here you would send this data to your backend API
  };
  
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ProfileNavbar />
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">Cycle Tracking</Text>
        
        {/* Calendar Card */}
        <MenstrualCalendar 
          markedDates={markedDates}
          selectedDate={selectedDate}
          onDayPress={handleDayPress}
        />
        
        {/* Daily Tracking Form */}
        <DailyTrackingForm
          selectedDate={selectedDate}
          dailyFlow={dailyFlow}
          setDailyFlow={setDailyFlow}
          dailySymptoms={dailySymptoms}
          toggleSymptom={toggleSymptom}
          dailyMood={dailyMood}
          setDailyMood={setDailyMood}
          dailyNotes={dailyNotes}
          setDailyNotes={setDailyNotes}
          dailyTemperature={dailyTemperature}
          setDailyTemperature={setDailyTemperature}
          onSave={saveDailyTracking}
        />
        
        {/* Statistics Card */}
        <CycleStatistics data={chartData} />
        
        {/* Cycle Settings Card */}
        <CycleSettings
          cycleLength={cycleLength}
          setCycleLength={setCycleLength}
          periodLength={periodLength}
          setPeriodLength={setPeriodLength}
          flow={flow}
          setFlow={setFlow}
          onSave={saveCycleSettings}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthPage;