import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BackButtonBar } from "@/components/BackButtonBar";
import { Input } from "@/components/auth/Input";
import { useState } from "react";
import { Button } from "@/components/Button";

export default function SignUpScreen() {
    const router = useRouter();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = () => {

    }

    return (
        <View className="flex-1 bg-gray-100 p-6">
            <BackButtonBar text="Sign Up" />

            <View className="space-y-4 mt-10 gap-y-4">
                <Input label="Name" value={Name} setVal={setName} />
                <Input label="Email" value={Email} setVal={setEmail} />
                <Input label="Password" value={Password} setVal={setPassword} />

            </View>


            <Button onPressh={handleSubmit} classNames="bg-c6 mt-20" textClasses="text-c1 text-lg" label="Sign Up" />

            <Text className="text-center text-gray-500 text-2xl my-8 font-anonymousPro">Or</Text>

            <Button onPressh={handleSubmit} classNames="bg-c3" textClasses=" text-lg font-semibold" label="Sign In with Google" />

            {/* Already have an account? */}
            <View className="text-center text-gray-600 mt-6 flex flex-row items-center justify-center font-questrial">
                <Text>Already have an account?{" "}</Text>
                <Pressable onPress={() => router.push("/auth/sign-in")} className="font-semibold text-black flex justify-center items-center">
                    <Text className="flex justify-center items-center font-questrial">
                        SignIn
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
