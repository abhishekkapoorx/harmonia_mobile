import React, { useState } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text } from '~/components/ui/text'
import { useDispatch } from 'react-redux'
import { hideModal } from '@/redux-store/slice/ModalSlice'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { useColorScheme } from '~/lib/useColorScheme'
import { NAV_THEME } from '@/lib/constants'
import axiosInstance from '@/http/axiosInstance'

interface EditChatNameModalProps {
  chatId?: string;
  currentTitle?: string;
  onSuccess?: () => void;
}

const EditChatNameModal = ({ chatId, currentTitle = '', onSuccess }: EditChatNameModalProps) => {
  const [newChatName, setNewChatName] = useState(currentTitle)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];

  const handleSubmit = async () => {
    if (!chatId) {
      setError('Chat ID is missing')
      return
    }

    if (!newChatName.trim()) {
      setError('Please enter a name')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Update chat name using API
      await axiosInstance.patch(`/chat/update-chat/${chatId}`, {
        title: newChatName.trim()
      })

      // Close modal
      dispatch(hideModal())
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error('Error updating chat name:', err)
      setError(err.response?.data?.message || 'Failed to update chat name')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="w-full">
      <Text className="text-base text-foreground mb-2">Enter new chat name:</Text>
      
      <Input
        value={newChatName}
        onChangeText={setNewChatName}
        className="mb-4"
        placeholder="Chat name"
      />
      
      {error ? (
        <Text className="text-red-500 mb-2">{error}</Text>
      ) : null}
      
      <View className="flex-row justify-end space-x-2">
        <Button
          variant="outline"
          onPress={() => dispatch(hideModal())}
          disabled={isSubmitting}
          className="mr-2"
        >
          <Text className="text-foreground">Cancel</Text>
        </Button>
        
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting || !newChatName.trim()}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color={palette['primary-foreground']} />
          ) : (
            <Text className="text-primary-foreground">Save</Text>
          )}
        </Button>
      </View>
    </View>
  )
}

export default EditChatNameModal