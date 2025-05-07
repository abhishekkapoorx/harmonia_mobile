import { useSession } from '@/providers/SessionCtx'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native'

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const HomeLayout = () => {
    const { session, isLoading } = useSession();
    const { isDarkColorScheme } = useColorScheme();

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
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <SafeAreaView className='flex-1 bg-background'>
                <StatusBar />

                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: isDarkColorScheme ? NAV_THEME.dark.primary : NAV_THEME.light.primary,
                        tabBarInactiveTintColor: isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text,
                        tabBarStyle: {
                            paddingBottom: 10,
                            paddingTop: 10,
                            height: 70,
                            backgroundColor: isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background,
                            shadowColor: 'transparent',
                        },
                        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
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
        </ThemeProvider>
    )
}

export default HomeLayout