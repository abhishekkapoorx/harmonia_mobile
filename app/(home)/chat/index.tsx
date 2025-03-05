import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { FlatList, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid';


interface ChatDataInterface {
  id: string;
  user: string;
  message: string;
}

const HomePage = () => {

  const [chatInput, setChatInput] = useState("")

  const [chatData, setChatData] = useState<ChatDataInterface[]>([
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "USER",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "USER",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "USER",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "USER",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
    {
      user: "USER",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },
  ])

  return (
    <SafeAreaView className="flex-1 bg-c3 items-center gap-5">
      <ImageBackground source={require("@/assets/images/Group 25.png")} style={{ width: '100%', height: '100%' }} >
        <StatusBar style="dark" />
        <ProfileNavbar />


        <FlatList
          data={chatData}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          // className='flex justify-end'
          renderItem={({ item }) => (
            <View className={`w-full flex ${item.user === "AI" ? "items-start" : "items-end"} justify-end`}>
              <View className={`flex justify-start items-start w-2/3 rounded-xl ${item.user === "AI" ? "bg-c6 border-grayD" : "bg-c2 border-grayD"} m-2 border-2 py-4 px-6`}>
                <Text className={`${item.user === "AI" ? "text-c1" : "text-c6"} text-lg font-anonymousPro`}>
                  {item.message}
                </Text>
              </View>
            </View>
          )}

          
        />
        <View className='w-full flex flex-row justify-between items-center p-4'>
          <View className='w-80 flex justify-center items-start rounded-full bg-c3 border-2 border-c6 h-16 max-h-32'>
            <TextInput placeholder="Type a message" className='p-2 text-grayD text-lg font-anonymousPro ms-2 w-full max-h-32' value={chatInput} onChangeText={text => setChatInput(text)} />
          </View>
          <TouchableOpacity activeOpacity={0.8} className='w-16 h-16 rounded-full bg-c6 border-c1 flex justify-center items-center'>
            <Ionicons name="arrow-up-outline" size={24} color={color.c1} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default HomePage