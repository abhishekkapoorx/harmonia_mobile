import { Stack } from "expo-router"

const AuthProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
    </Stack>
  )
}

export default AuthProfileLayout