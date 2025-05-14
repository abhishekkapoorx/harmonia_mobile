import { DateData } from 'react-native-calendars';

// Interface for marked dates on the calendar
export interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    dotColor?: string;
    selectedColor?: string;
  };
}

// Interface for chart data
export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color: () => string;
    strokeWidth: number;
  }[];
  legend: string[];
}

// Common symptoms and mood options
export const commonSymptoms = [
  'Cramps', 'Headache', 'Bloating', 'Fatigue', 
  'Breast Tenderness', 'Acne', 'Nausea', 'Insomnia',
  'Back Pain', 'Food Cravings'
];

export const moodOptions = ['Happy', 'Calm', 'Sad', 'Irritable', 'Anxious', 'Energetic']; 