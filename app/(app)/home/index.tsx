import HomeUpper from '@/components/HomeUpper'
import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color'
import axiosInstance from '@/http/axiosInstance'
import { Ionicons } from '@expo/vector-icons'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, View, ActivityIndicator, RefreshControl } from 'react-native'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { useQuery } from '@tanstack/react-query'

// Define types for user data
interface UserHealthDetails {
  acneSkinIssues: string;
  age: string;
  createdAt: string;
  dietType: string;
  exerciseFrequency: string;
  fatigue: string;
  fertilityTreatments: string;
  hairLoss: string;
  heavyBleeding: string;
  height: string;
  hirsutism: string;
  medicalHistory: string;
  medications: string;
  mentalHealthIssues: string;
  pcosDiagnosis: string;
  periodDuration: string;
  periodRegularity: string;
  processedFoodConsumption: string;
  severeCramps: string;
  sleepDisturbances: string;
  sleepHours: string;
  stressLevels: string;
  sugarCravings: string;
  waterIntake: string;
  weight: string;
  weightGain: string;
}

interface UserHealthDetailsResponse {
  data: UserHealthDetails;
  msg: string;
}

interface UserProfileInfo {
  created_at: string;
  email: string;
  name: string;
  role: string;
  user_id: string;
}

interface UserProfileResponse {
  msg: string;
  user: UserProfileInfo;
}

const HomePage = () => {
    const router = useRouter();
    const { isDarkColorScheme } = useColorScheme();
    const [refreshing, setRefreshing] = useState(false);

    // Fetch user health details
    const { data: healthResponse, isLoading: isHealthLoading, error: healthError, refetch: refetchHealth } = useQuery({
        queryKey: ['userHealthDetails'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<UserHealthDetailsResponse>('/user/user-details');
                return response.data;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    router.push('/home/questioneer');
                }
                throw error;
            }
        },
        retry: 1
    });

    // Fetch user profile information
    const { data: profileResponse, isLoading: isProfileLoading, refetch: refetchProfile } = useQuery({
        queryKey: ['userProfileInfo'],
        queryFn: async () => {
            const response = await axiosInstance.get<UserProfileResponse>('/auth/protected');
            return response.data;
        },
        retry: 1
    });

    const isLoading = isHealthLoading || isProfileLoading;
    const healthData = healthResponse?.data;
    const profileData = profileResponse?.user;

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await Promise.all([refetchHealth(), refetchProfile()]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const flatListData = [
        {
            title: "Chat",
            description: "No More Guesswork—Ask Away!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={NAV_THEME.light.primary} />,
            bg: "bg-c6",
            color: "text-c1",
            link: "/chat"
        },
        {
            title: "Meal Planner",
            description: "Plan meal like a nutritionist!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={NAV_THEME.light.primary} />,
            bg: "bg-c2",
            color: "text-c6",
            link: "/meal"

        },
        {
            title: "Track Health",
            description: "Your Body. Your Control.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={NAV_THEME.light.primary} />,
            bg: "bg-c6",
            color: "text-c1",
            link: "/health"
        },
        {
            title: "Recommended Products",
            description: "Products tailored for just for your health.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={NAV_THEME.light.primary} />,
            bg: "bg-c2",
            color: "text-c6"
        },
    ]

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar style="auto" />
            <ProfileNavbar />
            <ScrollView 
                className="flex-1"
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                        colors={[NAV_THEME.light.primary]}
                        tintColor={NAV_THEME[isDarkColorScheme ? 'dark' : 'light'].primary}
                    />
                }
            >
                <View className="flex-1 w-full px-4 py-6 gap-6 items-center">
                    {/* Personal Medical History Card */}
                    <Card className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-lg p-0 mb-4">
                        {isLoading ? (
                            <View className="p-8 items-center justify-center">
                                <ActivityIndicator size="large" color={NAV_THEME.light.primary} />
                                <Text className="mt-2 text-sm text-muted-foreground">Loading user data...</Text>
                            </View>
                        ) : (
                            <CardHeader className="flex-row items-center gap-4 p-6 pb-2">
                                <Avatar alt={profileData?.name || "User"} className="h-20 w-20 border-4 border-accent">
                                    <AvatarImage source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} />
                                    <AvatarFallback>
                                        <Text>{profileData?.name?.charAt(0) || "U"}</Text>
                                    </AvatarFallback>
                                </Avatar>
                                <View className="flex-1 ml-2">
                                    <CardTitle className="text-2xl font-bold text-card-foreground">
                                        {profileData?.name || "Loading..."}
                                    </CardTitle>
                                    <Text className="text-xs text-muted-foreground mt-1">
                                        {profileData?.email || ""}
                                    </Text>
                                    <View className="flex-row gap-4 mt-2">
                                        <View>
                                            <Text className="text-xs text-muted-foreground">Gender</Text>
                                            <Text className="text-base font-semibold text-card-foreground">Female</Text>
                                        </View>
                                        <View>
                                            <Text className="text-xs text-muted-foreground">Age</Text>
                                            <Text className="text-base font-semibold text-card-foreground">
                                                {healthData?.age || "--"} yrs
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="text-xs text-muted-foreground">Weight</Text>
                                            <Text className="text-base font-semibold text-card-foreground">
                                                {healthData?.weight || "--"} kg
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Button 
                                    variant="secondary" 
                                    size="icon" 
                                    className="ml-2 bg-primary"
                                    onPress={() => router.push('/auth/profile')}
                                >
                                    <Ionicons name="chevron-forward" size={16} color={NAV_THEME[isDarkColorScheme ? 'dark' : 'light']['primary-foreground']} />
                                </Button>
                            </CardHeader>
                        )}
                    </Card>

                    {/* Health Summary Card */}
                    {healthData && (
                        <Card className="w-full max-w-xl rounded-2xl bg-card border border-border shadow p-0 mb-4">
                            <CardHeader className="p-6 pb-2">
                                <CardTitle className="text-lg font-semibold text-card-foreground">Health Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-2">
                                <View className="flex-row flex-wrap gap-2">
                                    <View className="flex-row items-center bg-muted rounded-full px-3 py-1">
                                        <Text className="text-xs font-medium text-foreground">
                                            Height: {healthData.height} cm
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-muted rounded-full px-3 py-1">
                                        <Text className="text-xs font-medium text-foreground">
                                            BMI: {(Number(healthData.weight) / ((Number(healthData.height)/100) ** 2)).toFixed(1)}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-muted rounded-full px-3 py-1">
                                        <Text className="text-xs font-medium text-foreground">
                                            Diet: {healthData.dietType}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-muted rounded-full px-3 py-1">
                                        <Text className="text-xs font-medium text-foreground">
                                            Sleep: {healthData.sleepHours} hrs
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center bg-muted rounded-full px-3 py-1">
                                        <Text className="text-xs font-medium text-foreground">
                                            Exercise: {healthData.exerciseFrequency}/week
                                        </Text>
                                    </View>
                                    {healthData.pcosDiagnosis === "yes" && (
                                        <View className="flex-row items-center bg-red-100 rounded-full px-3 py-1">
                                            <Text className="text-xs font-medium text-red-700">
                                                PCOS Diagnosed
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                
                                {/* Risk factors section */}
                                {(healthData.hairLoss === "yes" || 
                                  healthData.periodRegularity === "irregular" || 
                                  healthData.acneSkinIssues === "yes" || 
                                  healthData.weightGain === "yes") && (
                                    <View className="mt-4">
                                        <Text className="text-sm font-medium text-foreground mb-2">Risk Factors:</Text>
                                        <View className="flex-row flex-wrap gap-2">
                                            {healthData.hairLoss === "yes" && (
                                                <View className="flex-row items-center bg-orange-100 rounded-full px-3 py-1">
                                                    <Text className="text-xs font-medium text-orange-700">Hair Loss</Text>
                                                </View>
                                            )}
                                            {healthData.periodRegularity === "irregular" && (
                                                <View className="flex-row items-center bg-orange-100 rounded-full px-3 py-1">
                                                    <Text className="text-xs font-medium text-orange-700">Irregular Periods</Text>
                                                </View>
                                            )}
                                            {healthData.acneSkinIssues === "yes" && (
                                                <View className="flex-row items-center bg-orange-100 rounded-full px-3 py-1">
                                                    <Text className="text-xs font-medium text-orange-700">Acne</Text>
                                                </View>
                                            )}
                                            {healthData.weightGain === "yes" && (
                                                <View className="flex-row items-center bg-orange-100 rounded-full px-3 py-1">
                                                    <Text className="text-xs font-medium text-orange-700">Weight Gain</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Recent Visits Card */}
                    <Card className="w-full max-w-xl rounded-2xl bg-card border border-border shadow p-0 mb-4">
                        <CardHeader className="flex-row items-center justify-between p-6 pb-2">
                            <CardTitle className="text-lg font-semibold text-card-foreground">Recent visits</CardTitle>
                            <Button variant="ghost" size="sm">
                                <Text className="text-xs text-card-foreground">See all</Text>
                            </Button>
                        </CardHeader>
                        <CardContent className="flex-row items-center gap-4 p-6 pt-2">
                            <View className="flex-1">
                                <Text className="text-base font-semibold text-card-foreground">Botulinum treatments</Text>
                                <Text className="text-md text-muted-foreground mt-1">Date: <Text className="text-card-foreground">29 Sep 2023</Text></Text>
                                <Text className="text-md text-muted-foreground">Medication: <Text className="text-card-foreground">Miotox</Text></Text>
                                <Text className="text-md text-muted-foreground">Injecting units: <Text className="text-card-foreground">25</Text></Text>
                            </View>
                            <View className="items-center">
                                <Avatar alt="Amanda Zendinsky" className="h-12 w-12 border-2 border-accent">
                                    <AvatarImage source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }} />
                                    <AvatarFallback>
                                        <Text>AZ</Text>
                                    </AvatarFallback>
                                </Avatar>
                                <Text className="text-xs font-semibold text-card-foreground mt-1">Amanda Zendinsky</Text>
                                <Text className="text-[10px] text-muted-foreground">Dermatologist</Text>
                                <View className="flex-row items-center gap-1 mt-1">
                                    <Text className="text-[10px] text-yellow-400">★</Text>
                                    <Text className="text-[10px] text-card-foreground">5.0</Text>
                                    <Text className="text-[10px] text-muted-foreground">(126)</Text>
                                </View>
                            </View>
                        </CardContent>
                    </Card>
                    {/* Feature Cards Grid (2 columns, flexbox) */}
                    <View className="w-full max-w-xl flex-row flex-wrap justify-between mt-2">
                        {flatListData.map((item, idx) => (
                            <Card
                                key={item.title}
                                className={`basis-[48%] m-1 flex-row items-center p-4 gap-4 rounded-2xl shadow-sm bg-card border border-border`}
                            >
                                <View className="mr-2">{item.icon}</View>
                                <View className="flex-1">
                                    <CardTitle className={`text-base font-semibold text-card-foreground`}>{item.title}</CardTitle>
                                    <CardDescription className={`text-xs text-muted-foreground`}>{item.description}</CardDescription>
                                    {item.link && (
                                        <Button className="mt-2 h-8 px-3 py-1" size="sm" onPress={() => router.push(item.link as any)}>
                                            <Text className="text-xs text-primary-foreground">Open</Text>
                                        </Button>
                                    )}
                                </View>
                            </Card>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage