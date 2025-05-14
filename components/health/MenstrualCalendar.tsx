import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Calendar, DateData } from 'react-native-calendars';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    dotColor?: string;
    selectedColor?: string;
  };
}

interface MenstrualCalendarProps {
  markedDates: MarkedDates;
  selectedDate: string;
  onDayPress: (day: DateData) => void;
}

const MenstrualCalendar = ({
  markedDates,
  selectedDate,
  onDayPress
}: MenstrualCalendarProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];

  return (
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
          onDayPress={onDayPress}
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
  );
};

export default MenstrualCalendar;
export type { MarkedDates }; 