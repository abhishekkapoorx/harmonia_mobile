import ProfileNavbar from '@/components/ProfileNavbar'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import { StyleSheet } from "react-native";
// import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
// import { CustomTabButton } from "@/components/CustomTabButton";

const HomeLayout = () => {
    return (
        <SafeAreaView className='flex-1 bg-c3'>
            <StatusBar />

            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#5D6B6B",
                    
                    tabBarStyle: { paddingBottom: 10, paddingTop: 10, height: 70, backgroundColor: "#F1F7F7", shadowColor: "transparent" },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: '500', },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chat-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="meal"
                    options={{
                        tabBarLabel: 'Meal',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="food-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="health"
                    options={{
                        tabBarLabel: 'Health',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="fitness-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>

    )
}

export default HomeLayout