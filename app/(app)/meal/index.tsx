import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, ImageBackground, ActivityIndicator, RefreshControl, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useSession } from '@/providers/SessionCtx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '@/components/ui/Header';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '~/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/http/axiosInstance';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetHandleComponent from '@/components/ui/BottomSheetHandleComponent';

// Define meal plan interface
interface MealPlan {
  created_at: string;
  id: string;
  is_active: boolean;
  plan_data: {
    [day: string]: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
    };
  };
  updated_at: string;
  user_id: string;
}

interface MealPlanResponse {
  meal_plan: MealPlan;
  msg: string;
}

// Function to fetch the active meal plan
const fetchActiveMealPlan = async (): Promise<MealPlan> => {
  const response = await axiosInstance.get<MealPlanResponse>('/meal-plan/meal-plans/active');
  return response.data.meal_plan;
};

// Function to create a new meal plan
const createMealPlan = async (prompt: string): Promise<void> => {
  await axiosInstance.post('/meal-plan/meal-plans/create', {
    preferences: prompt
  });
};

// Function to fetch all meal plans
export interface AllMealPlansResponse {
  meal_plans: MealPlan[];
}

export const fetchAllMealPlans = async (): Promise<AllMealPlansResponse> => {
  const response = await axiosInstance.get<AllMealPlansResponse>('/meal-plan/meal-plans');
  return response.data;
};

// Meal Sheet Content component for Bottom Sheet
const MealSheetContent = ({ 
  mealPlans, 
  onSelectMealPlan,
  onClose,
  isLoading,
  onRefresh
}: { 
  mealPlans: MealPlan[];
  onSelectMealPlan: (id: string) => void;
  onClose: () => void;
  isLoading: boolean;
  onRefresh: () => void;
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  return (
    <View style={{ flex: 1 }}>
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-foreground">Meal Plans</Text>
          <View className="flex-row">
            <Button 
              variant="ghost" 
              size="icon" 
              onPress={onRefresh}
              className="h-8 w-8 rounded-full mr-2"
            >
              <Ionicons name="refresh" size={20} color={palette.foreground} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onPress={onClose}
              className="h-8 w-8 rounded-full"
            >
              <Ionicons name="close" size={20} color={palette.foreground} />
            </Button>
          </View>
        </View>
        
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-8">
            <ActivityIndicator size="small" color={palette.foreground} />
            <Text className="text-muted-foreground text-base mt-2">Loading meal plans...</Text>
          </View>
        ) : mealPlans.length === 0 ? (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-muted-foreground text-base">No meal plans yet</Text>
          </View>
        ) : (
          <ScrollView className="flex-1">
            {mealPlans.map(plan => (
              <Pressable 
                key={plan.id} 
                className={`py-3 rounded-lg px-4 mb-2 ${plan.is_active ? 'bg-primary/20' : 'bg-card'} border border-border`}
                onPress={() => { 
                  onSelectMealPlan(plan.id); 
                  onClose();
                }}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-base text-foreground font-semibold">
                    {new Date(plan.created_at).toLocaleDateString()}
                  </Text>
                  {plan.is_active && (
                    <View className="bg-primary px-2 py-1 rounded-full">
                      <Text className="text-xs text-primary-foreground">Active</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </BottomSheetView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)' }}>
        <Button
          variant="default"
          className="w-full flex-row items-center justify-center"
          onPress={() => {
            onClose();
            // Scroll to the textarea for creating a new meal plan
            // This is a placeholder - you might want to implement additional logic
          }}
        >
          <Ionicons name="add-circle-outline" size={18} color={palette['primary-foreground']} />
          <Text className="ml-2 text-primary-foreground">Create New Meal Plan</Text>
        </Button>
      </View>
    </View>
  );
};

const MealPlannerPage = () => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  const { userData } = useSession();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [mealPrompt, setMealPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bottom sheet ref and state for bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Handle toggling the bottom sheet
  const handleToggleBottomSheet = useCallback(() => {
    console.log("clicked");
    if (bottomSheetRef.current) {
      if (isBottomSheetOpen) {
        bottomSheetRef.current.close();
        setIsBottomSheetOpen(false);
      } else {
        bottomSheetRef.current.snapToIndex(0);
        setIsBottomSheetOpen(true);
      }
    }
  }, [isBottomSheetOpen]);

  // Use React Query to fetch the active meal plan
  const {
    data: mealPlan,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['activeMealPlan'],
    queryFn: fetchActiveMealPlan,
  });

  // Use React Query to fetch all meal plans
  const {
    data: allMealPlans,
    isLoading: isAllMealPlansLoading,
    refetch: refetchAllMealPlans
  } = useQuery({
    queryKey: ['allMealPlans'],
    queryFn: fetchAllMealPlans,
  });

  // Function to set a meal plan as active
  const setMealPlanActive = async (id: string) => {
    try {
      await axiosInstance.put(`/meal-plan/meal-plans/${id}/activate`);
      await refetch(); // Refetch the active meal plan
      await refetchAllMealPlans(); // Refetch all meal plans to update statuses
    } catch (error) {
      console.error('Error activating meal plan:', error);
    }
  };
  
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

  // Get current day's meals
  const getCurrentDayMeals = () => {
    if (!mealPlan || !mealPlan.plan_data || !mealPlan.plan_data[selectedDay]) {
      return {
        Breakfast: "No meal plan available",
        Lunch: "No meal plan available",
        Dinner: "No meal plan available"
      };
    }
    return mealPlan.plan_data[selectedDay];
  };

  const currentDayMeals = getCurrentDayMeals();

  // Extract a preview of the text (first 150 characters)
  const getPreview = (text: string): string => {
    if (!text) return "No meal plan available";
    return text;
    if (text.length <= 150) return text;
    return `${text.substring(0, 150)}...`;
  };

  // Handle creating a new meal plan
  const handleCreateMealPlan = async () => {
    if (mealPrompt.trim() === '' || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Show feedback that we're creating the meal plan
      console.log('Creating new meal plan...');
      
      // Create the new meal plan
      await createMealPlan(mealPrompt);
      
      // Clear the input
      setMealPrompt('');
      
      // Refresh the active meal plan
      await refetch();
      
      console.log('Meal plan created successfully!');
    } catch (error) {
      console.error('Error creating meal plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-background">
        <Header 
          chatTitle="Meal Planner"
          onToggleSidebar={handleToggleBottomSheet}
        />
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={palette.primary} />
            <Text className="mt-4 text-foreground">Loading meal plan...</Text>
          </View>
        ) : isError ? (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-red-500 text-center mb-4">
              Error loading meal plan: {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
            <TouchableOpacity
              className="bg-primary px-4 py-2 rounded-md"
              onPress={() => refetch()}
            >
              <Text className="text-primary-foreground">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            className="flex px-5"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={isRefetching} 
                onRefresh={refetch}
                colors={[palette.primary]} 
                tintColor={palette.primary}
              />
            }
          >
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
                    className={`px-4 py-2 mx-1 rounded-full ${selectedDay === day ? 'bg-primary' : 'bg-card border border-border'}`}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      className={`text-base font-semibold ${selectedDay === day ? 'text-primary-foreground' : 'text-card-foreground'}`}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            {/* Input for creating a new meal plan */}
            <Card className="bg-card rounded-lg mb-4 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-card-foreground">Create New Meal Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your dietary preferences or restrictions (e.g., 'Create a vegetarian meal plan with 2000 calories per day')"
                  className="bg-background text-foreground mb-2"
                  placeholderClassName="text-muted-foreground"
                  value={mealPrompt}
                  onChangeText={setMealPrompt}
                  numberOfLines={3}
                  multiline
                />
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onPress={handleCreateMealPlan}
                  disabled={isSubmitting || mealPrompt.trim() === ''}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color={palette['primary-foreground']} />
                  ) : (
                    <View className="flex-row items-center">
                      <Text className="text-primary-foreground mr-2">Generate Meal Plan</Text>
                      <Ionicons name="arrow-forward" size={16} color={palette['primary-foreground']} />
                    </View>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* All meals in a single scrollable view */}
            {/* Breakfast */}
            <Card className="bg-card rounded-lg mb-4 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-card-foreground">Breakfast</CardTitle>
              </CardHeader>
              <CardContent>
                <TouchableOpacity 
                  className="mb-2"
                  onPress={() => {
                    // Add modal or navigation to full meal details if needed
                  }}
                >
                  <Text className="text-base text-card-foreground">
                    {getPreview(currentDayMeals.Breakfast)}
                  </Text>
                </TouchableOpacity>
              </CardContent>
            </Card>
            
            {/* Lunch */}
            <Card className="bg-card rounded-lg mb-4 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-card-foreground">Lunch</CardTitle>
              </CardHeader>
              <CardContent>
                <TouchableOpacity 
                  className="mb-2"
                  onPress={() => {
                    // Add modal or navigation to full meal details if needed
                  }}
                >
                  <Text className="text-base text-card-foreground">
                    {getPreview(currentDayMeals.Lunch)}
                  </Text>
                </TouchableOpacity>
              </CardContent>
            </Card>
            
            {/* Dinner */}
            <Card className="bg-card rounded-lg mb-4 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-card-foreground">Dinner</CardTitle>
              </CardHeader>
              <CardContent>
                <TouchableOpacity 
                  className="mb-2"
                  onPress={() => {
                    // Add modal or navigation to full meal details if needed
                  }}
                >
                  <Text className="text-base text-card-foreground">
                    {getPreview(currentDayMeals.Dinner)}
                  </Text>
                </TouchableOpacity>
              </CardContent>
            </Card>
            
            {/* Last Updated */}
            <Card className="bg-card rounded-lg mb-4 shadow-sm">
              <CardContent className="py-3">
                <Text className="text-sm text-muted-foreground text-center">
                  Last updated: {new Date(mealPlan?.updated_at || Date.now()).toLocaleDateString()}
                </Text>
              </CardContent>
            </Card>
          </ScrollView>
        )}
      </SafeAreaView>
      
      {/* Bottom Sheet for Meal Plans */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: palette['background'] }}
        handleComponent={BottomSheetHandleComponent}
        onChange={(index) => {
          setIsBottomSheetOpen(index !== -1);
        }}
      >
        <MealSheetContent 
          mealPlans={allMealPlans?.meal_plans || []} 
          onSelectMealPlan={setMealPlanActive}
          onClose={() => {
            bottomSheetRef.current?.close();
            setIsBottomSheetOpen(false);
          }}
          isLoading={isAllMealPlansLoading}
          onRefresh={refetchAllMealPlans}
        />
      </BottomSheet>
      {/* End Bottom Sheet */}
    </GestureHandlerRootView>
  );
};

export default MealPlannerPage;