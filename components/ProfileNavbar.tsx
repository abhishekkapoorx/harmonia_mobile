import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useSession } from '@/providers/SessionCtx';
import { router } from 'expo-router';

const ProfileNavbar = () => {
  const { userData } = useSession();
  return (
    <View className='w-full flex-row items-center px-6 mt-10 gap-5' style={{ justifyContent: "flex-end" }}>
      <Text>Hi {userData?.name.toUpperCase()}</Text>

      <Pressable className='border-c1 rounded-full bg-center w-auto flex flex-row justify-center items-center' onPress={() => router.push('/auth/profile')}>
        <Image source={require('../assets/images/profile.jpg')} className='w-auto rounded-full' height={48} width={48} style={{ height: 40, width: 40, marginLeft: "auto" }} />
      </Pressable>

    </View>
  )
}

export default ProfileNavbar