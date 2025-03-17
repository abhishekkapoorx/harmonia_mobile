import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useSession } from '@/providers/SessionCtx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProfileNavbar from '@/components/ProfileNavbar';

// Define meal type
type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

// Define meal item interface
interface MealItem {
  meal: string;
  nutritional_value: string;
}

// Define weekly meal plan interface
interface WeeklyMealPlan {
  [day: string]: {
    [mealType: string]: MealItem;
  };
}

const MealPlannerPage = () => {
  const { userData } = useSession();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [query, setQuery] = useState('');

  // Days of the week for the tab selector
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Weekly meal plan data
  const weeklyMealPlan: WeeklyMealPlan = {
    "Monday": {
      "Breakfast": {
        "meal": "Oatmeal with banana and almond milk",
        "nutritional_value": "400 calories, 70g carbs, 10g protein, 10g fat"
      },
      "Lunch": {
        "meal": "Quinoa salad with roasted vegetables and avocado",
        "nutritional_value": "550 calories, 80g carbs, 20g protein, 20g fat"
      },
      "Dinner": {
        "meal": "Lentil soup with whole wheat bread",
        "nutritional_value": "600 calories, 80g carbs, 20g protein, 15g fat"
      }
    },
    "Tuesday": {
      "Breakfast": {
        "meal": "Avocado toast with scrambled tofu",
        "nutritional_value": "350 calories, 30g carbs, 15g protein, 20g fat"
      },
      "Lunch": {
        "meal": "Grilled vegetable wrap with hummus",
        "nutritional_value": "450 calories, 60g carbs, 10g protein, 15g fat"
      },
      "Dinner": {
        "meal": "Roasted sweet potato and black bean tacos",
        "nutritional_value": "500 calories, 60g carbs, 15g protein, 15g fat"
      }
    },
    "Wednesday": {
      "Breakfast": {
        "meal": "Greek yogurt with berries and granola",
        "nutritional_value": "300 calories, 40g carbs, 15g protein, 10g fat"
      },
      "Lunch": {
        "meal": "Veggie stir-fry with brown rice",
        "nutritional_value": "500 calories, 70g carbs, 10g protein, 15g fat"
      },
      "Dinner": {
        "meal": "Baked salmon (replaced with tofu for vegetarian option)",
        "nutritional_value": "400 calories, 0g carbs, 20g protein, 20g fat"
      }
    },
    "Thursday": {
      "Breakfast": {
        "meal": "Smoothie bowl with banana, almond milk, and almond butter",
        "nutritional_value": "400 calories, 60g carbs, 10g protein, 15g fat"
      },
      "Lunch": {
        "meal": "Lentil and vegetable curry with brown rice",
        "nutritional_value": "600 calories, 80g carbs, 20g protein, 20g fat"
      },
      "Dinner": {
        "meal": "Grilled portobello mushroom burgers with sweet potato fries",
        "nutritional_value": "550 calories, 60g carbs, 15g protein, 20g fat"
      }
    },
    "Friday": {
      "Breakfast": {
        "meal": "Avocado and spinach omelette with whole wheat toast",
        "nutritional_value": "350 calories, 30g carbs, 15g protein, 20g fat"
      },
      "Lunch": {
        "meal": "Quinoa and black bean salad with grilled vegetables",
        "nutritional_value": "500 calories, 60g carbs, 15g protein, 15g fat"
      },
      "Dinner": {
        "meal": "Roasted vegetable and tofu skewers with quinoa",
        "nutritional_value": "500 calories, 60g carbs, 20g protein, 15g fat"
      }
    },
    "Saturday": {
      "Breakfast": {
        "meal": "Overnight oats with almond milk and banana",
        "nutritional_value": "400 calories, 60g carbs, 10g protein, 10g fat"
      },
      "Lunch": {
        "meal": "Veggie and hummus wrap with mixed greens",
        "nutritional_value": "450 calories, 60g carbs, 10g protein, 15g fat"
      },
      "Dinner": {
        "meal": "Baked tofu and roasted vegetable quinoa bowl",
        "nutritional_value": "550 calories, 60g carbs, 20g protein, 15g fat"
      }
    },
    "Sunday": {
      "Breakfast": {
        "meal": "Scrambled tofu with roasted vegetables and whole wheat toast",
        "nutritional_value": "350 calories, 30g carbs, 15g protein, 15g fat"
      },
      "Lunch": {
        "meal": "Lentil soup with whole wheat bread and a side salad",
        "nutritional_value": "600 calories, 80g carbs, 20g protein, 15g fat"
      },
      "Dinner": {
        "meal": "Grilled portobello mushroom burgers with roasted sweet potato and avocado",
        "nutritional_value": "550 calories, 60g carbs, 15g protein, 20g fat"
      }
    }
  };

  // Get current day's meals
  const currentDayMeals = weeklyMealPlan[selectedDay] || {
    Breakfast: { meal: "", nutritional_value: "" },
    Lunch: { meal: "", nutritional_value: "" },
    Dinner: { meal: "", nutritional_value: "" }
  };

  // Calculate total calories for the selected day
  const calculateTotalCalories = () => {
    let total = 0;
    
    Object.values(currentDayMeals).forEach(item => {
      // Extract calories from nutritional_value string
      const caloriesMatch = item.nutritional_value.match(/(\d+)\s*calories/);
      if (caloriesMatch && caloriesMatch[1]) {
        total += parseInt(caloriesMatch[1]);
      }
    });
    
    return total;
  };

  // Extract calories from nutritional value
  const extractCalories = (nutritionalValue: string) => {
    const caloriesMatch = nutritionalValue.match(/(\d+)\s*calories/);
    return caloriesMatch ? caloriesMatch[1] : "0";
  };

  // Calculate total calories once when component mounts or when selectedDay changes
  const [totalCalories, setTotalCalories] = useState(0);
  
  useEffect(() => {
    setTotalCalories(calculateTotalCalories());
  }, [selectedDay]);

  return (
    <ImageBackground 
      source={require('@/assets/images/Group 25.png')} 
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        {/* Use ProfileNavbar component */}
        <ProfileNavbar />
        
        <View className="flex px-5">
          {/* Day selector as horizontal tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-5"
          >
            <View className="flex-row py-2">
              {daysOfWeek.map((day) => (
                <TouchableOpacity
                  key={day}
                  className={`px-4 py-2 mx-1 rounded-full ${selectedDay === day ? 'bg-gray-500' : 'bg-white border border-gray-200'}`}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    className={`text-base font-medium ${selectedDay === day ? 'text-white' : 'text-gray-800'}`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* All meals in a single view */}
          <ScrollView className="flex mb-5">
            {/* Breakfast */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">Breakfast</Text>
                <Text className="text-base font-medium text-gray-600">{extractCalories(currentDayMeals.Breakfast.nutritional_value)} Kcal</Text>
              </View>
              <Text className="text-base text-gray-800 mb-2">{currentDayMeals.Breakfast.meal}</Text>
              <Text className="text-sm text-gray-500">{currentDayMeals.Breakfast.nutritional_value}</Text>
            </View>

            {/* Lunch */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">Lunch</Text>
                <Text className="text-base font-medium text-gray-600">{extractCalories(currentDayMeals.Lunch.nutritional_value)} Kcal</Text>
              </View>
              <Text className="text-base text-gray-800 mb-2">{currentDayMeals.Lunch.meal}</Text>
              <Text className="text-sm text-gray-500">{currentDayMeals.Lunch.nutritional_value}</Text>
            </View>

            {/* Dinner */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800">Dinner</Text>
                <Text className="text-base font-medium text-gray-600">{extractCalories(currentDayMeals.Dinner.nutritional_value)} Kcal</Text>
              </View>
              <Text className="text-base text-gray-800 mb-2">{currentDayMeals.Dinner.meal}</Text>
              <Text className="text-sm text-gray-500">{currentDayMeals.Dinner.nutritional_value}</Text>
            </View>
          </ScrollView>

          {/* Total calories */}
          <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">Total Calories</Text>
              <Text className="text-lg font-bold text-gray-800">{totalCalories} Kcal</Text>
            </View>
          </View>

          {/* Search bar */}
          <View className="flex-row mb-5 items-center">
            <TextInput
              className="flex-1 bg-white py-2.5 px-5 rounded-full mr-2.5 border border-gray-200"
              placeholder="Type your query here..."
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-500 justify-center items-center">
              <Ionicons name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MealPlannerPage;