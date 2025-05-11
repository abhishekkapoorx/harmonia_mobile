import ProfileNavbar from '@/components/ProfileNavbar'
import { color } from '@/constants/color';
import axiosInstance from '@/http/axiosInstance';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar'
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { FlatList, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, Modal, Pressable } from 'react-native'
import uuid from 'react-native-uuid';
import Markdown from 'react-native-markdown-display';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '@/lib/utils';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Text } from '~/components/ui/text';
import { Header } from '@/components/ui/Header';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetHandleComponent from '@/components/ui/BottomSheetHandleComponent';
import ChatSheetFooter from '@/components/ui/ChatSheetFooter';
import { useQuery } from '@tanstack/react-query';
import { showModal } from '@/redux-store/slice/ModalSlice';
import { EDIT_CHAT_MODAL } from '@/lib/constants';
import { useDispatch } from 'react-redux';
import { ChatDataInterface, ChatInterface, ChatResponseInterface, ChatMessage, ChatMessagesResponse } from '@/lib/types';

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

// Function to fetch all chats
const fetchUserChats = async (): Promise<ChatInterface[]> => {
    try {
        const response = await axiosInstance.get<ChatResponseInterface>('/chat/get-chats');
        return response.data.chats;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};

// Function to create a new chat
const createNewChat = async (): Promise<ChatInterface> => {
    try {
        const response = await axiosInstance.post<{ chat: ChatInterface }>('/chat/create-chat');
        return response.data.chat;
    } catch (error) {
        console.error('Error creating new chat:', error);
        throw error;
    }
};

// Function to fetch messages for a specific chat
const fetchChatMessages = async (chatId: string): Promise<ChatMessage[]> => {
    try {
        const response = await axiosInstance.get<ChatMessagesResponse>(`/chat/${chatId}/get-messages`);
        return response.data.messages;
    } catch (error) {
        console.error(`Error fetching messages for chat ${chatId}:`, error);
        throw error;
    }
};

// Function to send a message to a specific chat
const sendChatMessage = async (chatId: string, message: string): Promise<ChatMessage> => {
    try {
        const response = await axiosInstance.post<{ message: ChatMessage }>(`/chat/send-message/${chatId}`, {
            message: message
        });
        return response.data.message;
    } catch (error) {
        console.error(`Error sending message to chat ${chatId}:`, error);
        throw error;
    }
};

// Chat List component for BottomSheet
const ChatSheetContent = ({ 
  chats, 
  onSelectChat,
  onAdd, 
  onClose,
  isLoading,
  refetchChats
}: { 
  chats: ChatInterface[];
  onSelectChat: (id: string) => void;
  onAdd: () => void;
  onClose: () => void;
  isLoading: boolean;
  refetchChats: () => Promise<any>;
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  const dispatch = useDispatch();

  const handleEditChatName = (chatId: string, currentTitle: string) => {
    console.log('[DEBUG] Opening edit modal for chat:', chatId, currentTitle);
    dispatch(showModal({
      modalType: EDIT_CHAT_MODAL,
      modalProps: { 
        chatId,
        currentTitle,
        onSuccess: () => {
          // Refresh the chat list after update
          console.log('[DEBUG] Edit successful, refreshing chats');
          refetchChats();
        }
      },
      modalTitle: "Edit Chat Name",
      showCloseBtn: true,
    }));
  };
  
  return (
    <View style={{ flex: 1 }}>

      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-foreground">All Chats</Text>

          <Button 
            variant="ghost" 
            size="icon" 
            onPress={onClose}
            className="h-8 w-8 rounded-full"
          >
            <Ionicons name="close" size={20} color={palette.foreground} />
          </Button>
        </View>
        
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-8">
            <ActivityIndicator size="small" color={palette.foreground} />
            <Text className="text-muted-foreground text-base mt-2">Loading chats...</Text>
          </View>
        ) : chats.length === 0 ? (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-muted-foreground text-base">No chats yet</Text>
          </View>
        ) : (
          chats.map(chat => (
            <View 
              key={chat.id} 
              className="py-3 rounded-lg px-2 flex-row justify-between items-center"
            >
              <Pressable 
                className="flex-1 web:hover:bg-muted/60 active:bg-muted/80" 
                onPress={() => { 
                  onSelectChat(chat.id); 
                  onClose();
                }}
              >
                <Text className="text-base text-foreground">{chat.title}</Text>
              </Pressable>
              
              <Button 
                variant="link" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onPress={() => handleEditChatName(chat.id, chat.title)}
              >
                <Ionicons name="pencil" size={16} color={palette.foreground} />
              </Button>
            </View>
          ))
        )}
      </BottomSheetView>
      <ChatSheetFooter onAdd={onAdd} />
    </View>
  );
};

const HomePage = () => {
    const { isDarkColorScheme } = useColorScheme();
    const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
    const [chatInput, setChatInput] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const flatListRef = React.useRef<FlatList>(null);
    const [inputHeight, setInputHeight] = useState(48);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    
    // Use React Query to fetch chats
    const { 
        data: chats, 
        isLoading: isChatsLoading, 
        isError: isChatsError, 
        error: chatsError,
        refetch: refetchChats
    } = useQuery({
        queryKey: ['userChats'],
        queryFn: fetchUserChats,
    });

    // Query to fetch messages for the selected chat
    const {
        data: chatMessages,
        isLoading: isChatMessagesLoading,
        refetch: refetchChatMessages
    } = useQuery({
        queryKey: ['chatMessages', selectedChatId],
        queryFn: () => selectedChatId ? fetchChatMessages(selectedChatId) : Promise.resolve([]),
        enabled: !!selectedChatId, // Only run the query if a chat is selected
    });

    const [chatData, setChatData] = useState<ChatDataInterface[]>([
        {
            user: "AI",
            message: "Hello, how can I help you today?",
            id: uuid.v4()
        },
    ]);

    // Convert API chat messages to the format used by the component
    React.useEffect(() => {
        if (chatMessages && chatMessages.length > 0) {
            const formattedMessages = chatMessages.map(msg => ({
                id: msg.id,
                user: msg.sent_by === 'ai' ? 'AI' : 'user',
                message: msg.content
            }));
            setChatData(formattedMessages);
        }
    }, [chatMessages]);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '80%'], []);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    // Scroll to the bottom of the chat when messages change
    React.useEffect(() => {
        if (flatListRef.current && chatData.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [chatData]);

    const handleChatSubmit = async () => {
        if (chatInput === "" || isSubmitting || !selectedChatId) return
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

            try {
                // Send the message to the selected chat
                await sendChatMessage(selectedChatId, chatInput);
                
                // Fetch updated messages to get the AI response
                await refetchChatMessages();
                
                // Remove loading message after fetching updated messages
                setChatData(prevChat =>
                    prevChat.filter(msg => msg.id !== loadingMessageId)
                );
                
                // Refresh the chat list after a successful message
                await refetchChats();
                
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

    const handleNewChat = async () => {
        try {
            // Create a new chat
            const newChat = await createNewChat();
            
            // Close the bottom sheet
            bottomSheetRef.current?.close();
            setIsBottomSheetOpen(false);
            
            // Select the new chat
            handleSelectChat(newChat.id);
            
            // Refresh the chat list
            await refetchChats();
        } catch (error) {
            console.error('Error creating new chat:', error);
        }
    };

    const handleSelectChat = async (id: string) => {
        console.log(`Selected chat: ${id}`);
        
        // Set the selected chat ID
        setSelectedChatId(id);
        
        // Show a loading message
        setChatData([{
            user: "AI",
            message: "Loading chat history...",
            id: uuid.v4(),
            isLoading: true
        }]);
        
        try {
            // This will trigger the useQuery to fetch chat messages
            await refetchChatMessages();
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            setChatData([{
                user: "AI",
                message: "Failed to load chat history. Please try again.",
                id: uuid.v4()
            }]);
        }

        // Close the bottom sheet
        bottomSheetRef.current?.close();
        setIsBottomSheetOpen(false);
    };

    // Add a function to handle toggling the bottom sheet
    const handleBottomSheetToggle = useCallback(() => {
        if (bottomSheetRef.current) {
            if (isBottomSheetOpen) {
                bottomSheetRef.current.close();
                setIsBottomSheetOpen(false);
            } else {
                bottomSheetRef.current.snapToIndex(0);
                setIsBottomSheetOpen(true);
            }
        }
    }, [isBottomSheetOpen]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            
            <SafeAreaView className="flex flex-1 bg-card w-full items-center gap-5">
                <StatusBar style="auto" />
                {/* <ProfileNavbar /> */}
                <Header 
                    onToggleSidebar={handleBottomSheetToggle} 
                    onAdd={handleNewChat} 
                    chatTitle={selectedChatId && chats ? chats.find(chat => chat.id === selectedChatId)?.title || "Chat" : "Chat"}
                />
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
                                                    <Text className="text-lg mr-2 text-foreground">
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
                        // className="w-16 h-16 rounded-full flex justify-center items-center"
                        style={{ backgroundColor: palette.primary }}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator size="small" color={palette['primary-foreground']} />
                        ) : (
                            <Ionicons name="arrow-up-outline" size={24} color={palette['primary-foreground']} />
                        )}
                    </Button>
                </View>
            </SafeAreaView>

            {/* Bottom Sheet for Chats - move to top for overlay priority */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: palette['background'] }}
                handleComponent={BottomSheetHandleComponent}
                onChange={(index) => {
                    setIsBottomSheetOpen(index !== -1);
                }}
            >
                <ChatSheetContent 
                  chats={chats || []} 
                  onSelectChat={handleSelectChat}
                  onAdd={handleNewChat}
                  onClose={() => {
                    bottomSheetRef.current?.close();
                    setIsBottomSheetOpen(false);
                  }}
                  isLoading={isChatsLoading}
                  refetchChats={refetchChats}
                />
            </BottomSheet>
            {/* End Bottom Sheet */}
        </GestureHandlerRootView>
    )
}

export default HomePage