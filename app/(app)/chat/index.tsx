import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color';
import axiosInstance from '@/http/axiosInstance';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar'
import React, { useState, useCallback } from 'react'
import { FlatList, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import uuid from 'react-native-uuid';
import Markdown from 'react-native-markdown-display';

// Utility function to safely handle markdown content
const sanitizeMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Replace any problematic characters or patterns that might cause rendering issues
  return content
    .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
    .replace(/\\"/g, '"')  // Replace escaped quotes with actual quotes
    .replace(/\\t/g, '\t') // Replace escaped tabs with actual tabs
    .trim();
};

interface ChatDataInterface {
  id: string;
  user: string;
  message: string;
  isLoading?: boolean;
}

const HomePage = () => {

  const [chatInput, setChatInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const flatListRef = React.useRef<FlatList>(null);

  const [chatData, setChatData] = useState<ChatDataInterface[]>([
    {
      user: "AI",
      message: "Hello, how can I help you today?",
      id: uuid.v4()
    },

  ])

  // Scroll to the bottom of the chat when messages change
  React.useEffect(() => {
    if (flatListRef.current && chatData.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatData]);

  const handleChatSubmit = async () => {
    if (chatInput === "" || isSubmitting) return
    try {
      setIsSubmitting(true)
      
      // Add the user message to the chat
      const updatedChatData = [...chatData, {
        user: "user",
        message: chatInput,
        id: uuid.v4() as string
      }];
      
      // Add a loading message from AI
      const loadingMessageId = uuid.v4() as string;
      const withLoadingMessage = [...updatedChatData, {
        user: "AI",
        message: "Thinking...",
        id: loadingMessageId,
        isLoading: true
      }];
      
      setChatData(withLoadingMessage);
      console.log('Sending request to API...');
      
      try {
        // Use axiosInstance with proper error handling
        const response = await axiosInstance.post("/chat", {
          input: chatInput,
          format: "markdown" // Request markdown-formatted responses
        });
        
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        
        // With axios, we don't need to parse the JSON response
        // as axios does it automatically
        const responseData = response.data;
        
        if (!responseData || !responseData.response) {
          throw new Error('API response missing expected "response" field');
        }

        // Replace the loading message with the actual response
        setChatData(prevChat => 
          prevChat.map(msg => 
            msg.id === loadingMessageId 
              ? { ...msg, message: responseData.response, isLoading: false } 
              : msg
          )
        );
      } catch (apiError: any) {
        console.error('API Error:', apiError);
        
        // Get a more detailed error message
        const errorMessage = apiError.response 
          ? `Status: ${apiError.response.status}, Message: ${JSON.stringify(apiError.response.data || {})}`
          : apiError.message || 'Network error';
        
        console.error('Detailed API error:', errorMessage);
        
        // Replace loading message with error
        setChatData(prevChat => 
          prevChat.map(msg => 
            msg.id === loadingMessageId 
              ? { ...msg, message: `Sorry, there was an error: ${errorMessage}. The server might be down or starting up.`, isLoading: false } 
              : msg
          )
        );
      }
      
      setChatInput("");
    } catch (error: any) {
      console.error('Error in chat submission:', error);
      
      // Add the error message to the chat if not already handled
      setChatData(prevChat => {
        const loadingMessage = prevChat.find(msg => msg.isLoading);
        if (!loadingMessage) {
          return [...prevChat, {
            user: "AI",
            message: `Sorry, there was an unexpected error: ${error.message || 'Unknown error'}.`,
            id: uuid.v4() as string
          }];
        }
        return prevChat;
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-c3 items-center gap-5">
      <ImageBackground source={require("@/assets/images/Group 25.png")} style={{ width: '100%', height: '100%' }} >
        <StatusBar style="dark" />
        <ProfileNavbar />


        <FlatList
          ref={flatListRef}
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          initialNumToRender={chatData.length}
          maxToRenderPerBatch={10}
          windowSize={10}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View className={`w-full flex ${item.user === "AI" ? "items-start" : "items-end"} justify-end`}>
              <View className={`flex justify-start items-start w-2/3 rounded-xl ${item.user === "AI" ? "bg-c6 border-grayD" : "bg-c2 border-grayD"} m-2 border-2 py-4 px-6`}>
                {item.user === "AI" && item.isLoading ? (
                  <View className="flex-row items-center">
                    <Text className="text-c1 text-lg font-anonymousPro mr-2">Thinking</Text>
                    <ActivityIndicator size="small" color={color.c1} />
                  </View>
                ) : item.user === "AI" ? (
                  <ScrollView>
                    <Markdown
                      // style={{
                      //   body: { color: color.c1, fontFamily: 'AnonymousPro', fontSize: 18 },
                      //   heading1: { color: color.c1, fontFamily: 'AnonymousPro', fontSize: 24, fontWeight: 'bold' },
                      //   heading2: { color: color.c1, fontFamily: 'AnonymousPro', fontSize: 22, fontWeight: 'bold' },
                      //   heading3: { color: color.c1, fontFamily: 'AnonymousPro', fontSize: 20, fontWeight: 'bold' },
                      //   link: { color: '#0000EE', textDecorationLine: 'underline' },
                      //   list_item: { color: color.c1, fontFamily: 'AnonymousPro', fontSize: 18 },
                      //   code_block: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, fontFamily: 'monospace' },
                      //   code_inline: { backgroundColor: '#f0f0f0', padding: 2, borderRadius: 3, fontFamily: 'monospace' },
                      //   paragraph: { marginBottom: 10, marginTop: 0 }
                      // }}
                    >
                      {sanitizeMarkdown(item.message || '')}
                    </Markdown>
                  </ScrollView>
                ) : (
                  <Text className={`${item.user === "AI" ? "text-c1" : "text-c6"} text-lg font-anonymousPro`}>
                    {item.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
        <View className='w-full flex flex-row justify-between items-center p-4'>
          <View className='w-80 flex justify-center items-start rounded-full bg-c3 border-2 border-c6 h-16 max-h-32'>
            <TextInput placeholder="Type a message" className='p-2 text-grayD text-lg font-anonymousPro ms-2 w-full max-h-32' value={chatInput} onChangeText={text => setChatInput(text)} />
          </View>
          <TouchableOpacity 
            onPress={handleChatSubmit} 
            activeOpacity={0.8} 
            disabled={isSubmitting || chatInput === ""}
            className={`w-16 h-16 rounded-full ${isSubmitting ? 'bg-gray-400' : 'bg-c6'} border-c1 flex justify-center items-center`}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={color.c1} />
            ) : (
              <Ionicons name="arrow-up-outline" size={24} color={color.c1} />
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default HomePage