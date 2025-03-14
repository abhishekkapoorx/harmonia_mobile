import HomeUpper from '@/components/HomeUpper'
import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color'
import axiosInstance from '@/http/axiosInstance'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Alert, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const getUserDetails = async () => {
            const userDetails = await axiosInstance.get('/user/user-details')
            console.log("User Data:", userDetails);
            if (userDetails.status === 401) {
                Alert.alert('Unauthorized', userDetails.data.msg)
                router.push('/auth/sign-in')
            }
            else if (userDetails.status === 404) {
                Alert.alert('User Details Not Found', userDetails.data.msg)
                router.push('/home/questioneer')
            }
        };
        getUserDetails();
    }, []);

    const flatListData = [
        {
            title: "Chat",
            description: "No More Guesswork—Ask Away!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c1} />,
            bg: "bg-c6",
            color: "text-c1",
            link: "/chat"
        },
        {
            title: "Meal Planner",
            description: "Plan meal like a nutritionist!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c6} />,
            bg: "bg-c2",
            color: "text-c6",
            link: "/meal"

        },
        {
            title: "Track Health",
            description: "Your Body. Your Control.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c1} />,
            bg: "bg-c6",
            color: "text-c1",
            link: "/track"
        },
        {
            title: "Recommended Products",
            description: "Products tailored for just for your health.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c6} />,
            bg: "bg-c2",
            color: "text-c6"
        },
        {
            title: "Questioner",
            description: "Get your personalized health plan.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c6} />,
            bg: "bg-c2",
            color: "text-c6",
            link: "/home/questioneer"
        },
    ]


    return (
        <SafeAreaView className="flex-1 bg-c3 items-center gap-5 bg">
            <ImageBackground source={require("@/assets/images/Group 25.png")} style={{ width: '100%', height: '100%' }} >
                <StatusBar style="dark" />
                <ProfileNavbar />
                {/* <ScrollView className='p-4' contentContainerStyle={{ flexGrow: 1 }}>

                    <HomeUpper /> */}


                <View className='my-5 flex-1'>
                    <FlatList
                        data={flatListData}
                        keyExtractor={(item, index) => item.title}
                        nestedScrollEnabled={true}
                        ListHeaderComponent={
                            <View className='flex w-full mb-10'>
                                <View className='w-full flex justify-start items-start'>
                                    <Text className='text-2xl font-questrial'>Welcome</Text>
                                </View>

                                <View className="flex-1 justify-center items-center mt-10">
                                    <View className="w-full max-w-md gap-2">
                                        {/* Row 1 */}
                                        <View className="flex-row justify-between items-center gap-2">
                                            <View className="flex-1 bg-c5 border-c6 border-2 rounded-tr-full p-3 rounded-tl-2xl  rounded-bl-none rounded-br-none m-1 h-24 justify-center items-start">
                                                <Text className="text-black text-md font-questrial">
                                                    AI that cares your wellness.
                                                </Text>
                                            </View>
                                            <View className="w-24 h-24 rounded-tr-full overflow-visible border-2 bg-c4  border-c6 justify-end items-center bg-contain">
                                                <Image
                                                    source={require("@/assets/images/homeImg.png")}
                                                    className="w-full h-full"
                                                    style={{ width: '100%', height: '100%' }}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        </View>

                                        {/* Row 2 */}
                                        <View className="flex-row justify-between items-center">
                                            <View className="w-24 h-24 bg-c2 border-2 border-c6 rounded-br-full flex items-start justify-center m-1 p-4">
                                                <Ionicons name="compass-outline" size={24} color="black" />
                                            </View>
                                            <View className="flex-1 bg-c1 border-c6 border-2 p-4 rounded-tl-full m-1 justify-center items-end h-24">
                                                <Text className="text-black text-right font-questrial text-md">
                                                    Get the answers of your each question.
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                        className='w-full flex-1 px-4'
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => router.push(item.link? item.link as any : "/home")} activeOpacity={0.8} key={item.title} className={`flex-1 flex-row justify-start items-center elevation ${item.bg} w-full p-4 rounded-2xl m-2 border-c6 border-2 gap-2 h-32`}>
                                <View className='mr-5'>
                                    {item.icon}
                                </View>
                                <View>
                                    <Text className={`text-lg font-anonymousPro ${item.color}`}>{item.title}</Text>
                                    <Text className={`text-md font-anonymousPro ${item.color}`}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* </ScrollView> */}

            </ImageBackground>
        </SafeAreaView>
    )
}

export default HomePage