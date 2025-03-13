import { useSession } from '@/providers/SessionCtx'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'


const HomeLayout = () => {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/auth" />;
    }

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