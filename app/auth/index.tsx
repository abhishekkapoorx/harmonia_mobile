import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, SafeAreaView, View } from "react-native"

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navigate to the next screen
    router.push("/auth/sign-in")
  }

  return (
    <SafeAreaView className="flex-1 bg-c3 items-center justify-center px-10 gap-5 w-full">
      <StatusBar style="dark" />

      <View className="w-full aspect-[3/4] rounded-lg mb-8">
        <Image
          source={require("@/assets/images/Intro Image.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>


      <View className="items-center space-y-1 mb-8">
        <Text className="text-6xl font-light dark:text-gray-200">HARMONIA</Text>
        <Text className="text-base dark:text-gray-300">Wellness in Harmony with You</Text>
      </View>

      <Button className="flex flex-row w-full" onPress={handleGetStarted} variant={"default"} size={"lg"}>
        <>
          <Text>Get Started</Text>
          <Ionicons name="chevron-forward-outline" size={24} />
        </>
      </Button>
    </SafeAreaView>
  )
}

