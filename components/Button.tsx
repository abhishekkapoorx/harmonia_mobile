import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import "../global.css"
interface ButtonProps {
  label: string;
  onPressh: () => void
  classNames?: string
  textClasses?: string
  Icon?: React.ElementType
}
export const Button = ({onPressh, classNames, Icon, textClasses, label}: ButtonProps) => {
  return (
        <TouchableOpacity
        // className='border-2 p-8 flex flex-row bg-c1 justify-center items-center rounded-full'
        className={`${classNames} border-2 elevation-lg rounded-full py-4 px-8 flex-row items-center justify-center`}
        onPress={onPressh}
        activeOpacity={0.8}
      >
        <Text className={`font-anonymousPro font-semibold  ${textClasses}`}>{label}</Text>
        <Ionicons name="chevron-forward-outline" size={24} className={textClasses} />
        {/* <Text className={"text-gray-800 font-anonymousPro mx-auto" + ` ${textClass}`}>Get Started</Text>
        <Text className="text-xl text-gray-800 justify-self-end">{Icon ? <Icon /> : <Ionicons name="chevron-forward-outline" size={24} className="text-c6" />}</Text> */}
      </TouchableOpacity>
  )
}
