import HomeUpper from '@/components/HomeUpper'
import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color'
import axiosInstance from '@/http/axiosInstance'
import { Ionicons } from '@expo/vector-icons'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Alert, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, View } from 'react-native'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'

const HomePage = () => {
    const router = useRouter();
    const { isDarkColorScheme } = useColorScheme();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetails = await axiosInstance.get('/user/user-details')

            } catch (error: any) {
                if (error.response.status === 401) {
                    Alert.alert('Unauthorized', error.response.data.msg)
                    router.push('/auth/sign-in')
                }
                else if (error.response.status === 404) {
                    Alert.alert('User Details Not Found', error.response.data.msg)
                    router.push('/home/questioneer')
                }
                Alert.alert('Error', error.data.msg)

            }
        };
        getUserDetails();
    }, []);

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
        <SafeAreaView className="flex-1 bg-background items-center">
            {/* <ImageBackground source={require("@/assets/images/Group 25.png")} style={{ width: '100%', height: '100%' }}> */}
                <StatusBar style="auto" />
                <ProfileNavbar />
                <View className="flex-1 w-full px-4 py-6 gap-6 items-center">
                    {/* Personal Medical History Card */}
                    <Card className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-lg p-0 mb-4">
                        <CardHeader className="flex-row items-center gap-4 p-6 pb-2">
                            <Avatar alt="Helen Murfie" className="h-20 w-20 border-4 border-accent">
                                <AvatarImage source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} />
                                <AvatarFallback>
                                    <Text>HM</Text>
                                </AvatarFallback>
                            </Avatar>
                            <View className="flex-1 ml-2">
                                <CardTitle className="text-2xl font-bold text-card-foreground">Helen Murfie</CardTitle>
                                <View className="flex-row gap-4 mt-2">
                                    <View>
                                        <Text className="text-xs text-muted-foreground">Gender</Text>
                                        <Text className="text-base font-semibold text-card-foreground">Female</Text>
                                    </View>
                                    <View>
                                        <Text className="text-xs text-muted-foreground">Age</Text>
                                        <Text className="text-base font-semibold text-card-foreground">29 yrs</Text>
                                    </View>
                                    <View>
                                        <Text className="text-xs text-muted-foreground">Weight</Text>
                                        <Text className="text-base font-semibold text-card-foreground">50 kg</Text>
                                    </View>
                                </View>
                            </View>
                            <Button variant="secondary" size="icon" className="ml-2 bg-primary">
                                
                                <Ionicons name="chevron-forward" size={16} color={NAV_THEME[isDarkColorScheme ? 'dark' : 'light']['primary-foreground']} />
                            </Button>
                        </CardHeader>
                    </Card>
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
            {/* </ImageBackground> */}
        </SafeAreaView>
    )
}

export default HomePage