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
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '@/lib/utils copy';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
    const { isDarkColorScheme } = useColorScheme();
    const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
    const [chatInput, setChatInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const flatListRef = React.useRef<FlatList>(null);
    const [inputHeight, setInputHeight] = useState(48);

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
            // console.log('Sending request to API...');

            try {
                // Use axiosInstance with proper error handling
                const response = await axiosInstance.post("/chatbot/chat", {
                    input: chatInput,
                    format: "markdown" // Request markdown-formatted responses
                });

                // console.log('Response status:', response.status);
                // console.log('Response data:', response.data);

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
        <SafeAreaView className="flex flex-1 bg-background w-full items-center gap-5">
            <StatusBar style="auto" />
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
                contentContainerStyle={{ paddingBottom: 112, paddingTop: 16 }}
                renderItem={({ item }) => (
                    <View className={`w-full flex ${item.user === "AI" ? "items-start" : "items-end"} justify-end`}>
                        <Animated.View entering={FadeIn} exiting={FadeOut}>
                            <Card
                                className={cn(
                                    "my-2 w-11/12",
                                    item.user === "AI"
                                        ? "bg-primary/20"
                                        : "bg-primary/90"
                                )}
                            >
                                <CardHeader className="pb-2">
                                    <Text
                                        className={cn(
                                            "text-base font-semibold",
                                            item.user === "AI" ? "text-foreground" : "text-primary-foreground"
                                        )}
                                    >
                                        {item.user === "AI" ? "AI" : "You"}
                                    </Text>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    {item.user === "AI" && item.isLoading ? (
                                        <CardFooter className="pl-0 pt-2">
                                            <View className="flex-row items-center">
                                                <Text className="text-lg mr-2 text-primary-foreground">
                                                    Thinking
                                                </Text>
                                                <ActivityIndicator size="small" color={palette.text} />
                                            </View>
                                        </CardFooter>
                                    ) : item.user === "AI" ? (
                                        <ScrollView>
                                            <Markdown
                                                style={{
                                                    body: { color: palette["foreground"], fontSize: 16 },
                                                    heading1: { color: palette["foreground"], fontSize: 22, fontWeight: 'bold' },
                                                    heading2: { color: palette["foreground"], fontSize: 20, fontWeight: 'bold' },
                                                    heading3: { color: palette["foreground"], fontSize: 18, fontWeight: 'bold' },
                                                    link: { color: palette["foreground"], textDecorationLine: 'underline' },
                                                    list_item: { color: palette["foreground"], fontSize: 16 },
                                                    code_block: { backgroundColor: palette.card, padding: 10, borderRadius: 5, fontFamily: 'monospace' },
                                                    code_inline: { backgroundColor: palette.card, padding: 2, borderRadius: 3, fontFamily: 'monospace' },
                                                    paragraph: { marginBottom: 10, marginTop: 0 }
                                                }}
                                            >
                                                {sanitizeMarkdown(item.message || '')}
                                            </Markdown>
                                        </ScrollView>
                                    ) : (
                                        <Text className="text-lg text-primary-foreground">
                                            {item.message}
                                        </Text>
                                    )}
                                </CardContent>
                            </Card>
                        </Animated.View>
                    </View>
                )}
            />
            <View className='w-full flex-row justify-between items-center p-4 h-fit'>
                <Textarea
                    placeholder="Type a message"
                    className="flex-1 bg-background text-foreground mr-2"
                    placeholderClassName="text-muted-foreground"
                    value={chatInput}
                    onChangeText={(text: string) => setChatInput(text)}
                    numberOfLines={3}
                    multiline
                />
                <Button
                    onPress={handleChatSubmit}
                    disabled={isSubmitting || chatInput === ""}
                    className="w-16 h-16 rounded-full flex justify-center items-center"
                    style={{ backgroundColor: palette.primary }}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color={palette.background} />
                    ) : (
                        <Ionicons name="arrow-up-outline" size={24} color={palette.background} />
                    )}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default HomePage