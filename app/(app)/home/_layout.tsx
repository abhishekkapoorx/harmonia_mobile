import ProfileNavbar from '@/components/ProfileNavbar'
import { Stack } from 'expo-router'
import React from 'react'
import { ImageBackground, SafeAreaView } from 'react-native'

const HomeLayout = () => {
  return (

    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="questioneer" />
    </Stack>


  )
}

export default HomeLayout