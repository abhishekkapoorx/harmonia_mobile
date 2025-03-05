import { Button } from "@/components/Button"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, SafeAreaView, Text, View } from "react-native"

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    // Navigate to the next screen
    router.push("/home")
  }

  return (
    <SafeAreaView className="flex-1 bg-c3 items-center justify-center px-10 gap-5 w-full">
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

      {/* <Button onPress={handleGetStarted} className="bg-c1 w-full" textClass="text-2xl" /> */}

      {/* <TouchableOpacity
        // className='border-2 p-8 flex flex-row bg-c1 justify-center items-center rounded-full'
        className={`bg-c1 w-full border-2 elevation-lg rounded-full py-4 px-8 flex-row items-center justify-center`}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text className={"text-gray-800 font-anonymousPro text-2xl" }>Get Started</Text>
        <Ionicons name="chevron-forward-outline" size={24} className="text-c6" />
      </TouchableOpacity> */}
      <Button onPressh={handleGetStarted} classNames="bg-c1 w-full" textClasses="text-2xl" label="Get Started" />
    </SafeAreaView>
  )
}

