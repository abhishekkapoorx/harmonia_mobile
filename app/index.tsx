import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 h-full items-center justify-center bg-gray-100"
    >
      
      <Text>Hello</Text>
      <Link href="auth">Auth</Link>
    </View>
  );
}
