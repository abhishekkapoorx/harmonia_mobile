import HomeUpper from '@/components/HomeUpper'
import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const HomePage = () => {
    const flatListData = [
        {
            title: "Chat",
            description: "No More Guesswork—Ask Away!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c1} />,
            bg: "bg-c6",
            color: "text-c1"
        },
        {
            title: "Meal Planner",
            description: "Plan meal like a nutritionist!",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c6} />,
            bg: "bg-c1",
            color: "text-c6"
        },
        {
            title: "Trach Health",
            description: "Your Body. Your Control.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c1} />,
            bg: "bg-c6",
            color: "text-c1"
        },
        {
            title: "Recommended Products",
            description: "Products tailored for just for your health.",
            icon: <Ionicons name="chatbox-ellipses-outline" size={24} color={color.c6} />,
            bg: "bg-c1",
            color: "text-c6"
        },
    ]


    return (
        <SafeAreaView className="flex-1 bg-c3 items-center gap-5 bg">
            <ImageBackground source={require("@/assets/images/Group 25.png")} style={{ width: '100%', height: '100%' }} >
                <StatusBar style="dark" />
                <ProfileNavbar />
                <ScrollView className='p-4'>

                    <HomeUpper />


                    <View className='my-20'>
                        <FlatList
                            data={flatListData}
                            keyExtractor={(item, index) => item.title}
                            nestedScrollEnabled={true}
                            className='w-full flex-1 px-4'
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0.8} key={item.title} className={`flex-1 flex-row justify-start items-center ${item.bg} w-full p-4 rounded-2xl m-2 border-c6 border-2 gap-2 h-32`}>
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

                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default HomePage