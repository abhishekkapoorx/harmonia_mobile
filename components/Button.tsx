import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
  onPress: () => void
  className?: string
  textClass?: string
  Icon?: React.ElementType
}
export const Button = ({onPress, className, Icon, textClass}: ButtonProps) => {
  return (
    <View>
        <TouchableOpacity
        className={`${className} border-2 elevation-lg rounded-full py-3 px-8 flex-row items-center justify-center`}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text className={"text-gray-800 font-anonymousPro mx-auto" + ` ${textClass}`}>Get Started</Text>
        <Text className="text-xl text-gray-800 justify-self-end">{Icon ? <Icon /> : <Ionicons name="chevron-forward-outline" size={24} className="text-c6" />}</Text>
      </TouchableOpacity>
    </View>
  )
}
