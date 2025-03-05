import React from 'react'
import { Image, Text, View } from 'react-native'

const ProfileNavbar = () => {
  return (
    <View className='w-full flex-row items-center px-6 mt-10 gap-5' style={{justifyContent: "flex-end"}}>
        <Text>Hi Leena</Text>
        <View className='border-c1 rounded-full bg-center w-auto flex flex-row justify-center items-center' >
            <Image source={require('../assets/images/profile.jpg')} className='w-auto rounded-full' height={48} width={48} style={{height: 40, width: 40, marginLeft: "auto"}} />
        </View>

    </View>
  )
}

export default ProfileNavbar