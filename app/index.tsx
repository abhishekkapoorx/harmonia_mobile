import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { router } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons'
import { Button } from "@/components/Button"

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navigate to the next screen
    router.push("/auth/sign-in")
  }

  return (
    <SafeAreaView className="flex-1 bg-c3 items-center justify-center px-10 gap-5">
      <StatusBar style="dark" />

      <View className="w-full aspect-[3/4] rounded-lg mb-8">
        <Image
          source={require("../assets/images/Intro Image.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>


      <View className="items-center space-y-1 mb-8">
        <Text className="text-4xl font-medium text-gray-600 font-questrial">HARMONIA</Text>
        <Text className="text-base text-gray-500 font-questrial">Wellness in Harmony with You</Text>
      </View>

      <Button onPress={handleGetStarted} className="bg-c1 w-full" textClass="text-2xl" />
    </SafeAreaView>
  )
}

