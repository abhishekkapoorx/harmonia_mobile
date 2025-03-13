import { BackButtonBar } from "@/components/BackButtonBar";
import { Button } from "@/components/Button";
import { Input } from "@/components/auth/Input";
import { useSession } from "@/providers/SessionCtx";
import { validateEmail } from "@/utils/validators";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function SignUpScreen() {
    const router = useRouter();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const [SignupError, setSignupError] = useState("");

    const { session, signUp } = useSession();

    if (session) {
        router.replace({ pathname: '/home' });
    }


    const handleSubmit = async () => {
        // Email validation
        if (!validateEmail(Email)) {
            setEmailError('Please enter a valid email.');
            return;
        }

        // Password validation
        if (Password.length < 4) {
            setPasswordError('Password must be at least 8 characters.');
            return;
        }

        try {
            const name = Name;
            const email = Email;
            const password = Password;
            console.log(email, password);
            const response = await signUp({name, email, password});
            console.log(response);

            router.replace({ pathname: '/home' });
            setIsDisabled(false);
            setEmail('');
            setPassword('');
        } catch (error: any) {

            setSignupError(error?.response?.data?.message || 'Signup failed. Please try again.');
        }

    };


    return (
        <View className="flex-1 bg-gray-100 p-6">
            <BackButtonBar text="Sign Up" />

            <View className="space-y-4 mt-10 gap-y-4">
                <Input label="Name" value={Name} setVal={setName} className="border-b border-c6 mb-8" />
                <Input label="Email" value={Email} setVal={setEmail} className="border-b border-c6 mb-8" />
                <Input label="Password" value={Password} setVal={setPassword} className="border-b border-c6 mb-8" />

            </View>


            {PasswordError ? (
                <Text className="text-red-500 text-sm mt-1">{PasswordError}</Text>
            ) : null}

            {SignupError ? (
                <Text className="text-red-500 text-sm mt-1">{SignupError}</Text>
            ) : null}

            <Button disabled={isDisabled} onPressh={() => handleSubmit()} classNames="bg-c6 mt-20" textClasses="text-c1 text-lg" label="Sign Up" />
            {/* <Text className="text-center text-gray-500 text-2xl my-8 font-anonymousPro">Or</Text>

            <Button onPressh={handleSubmit} classNames="bg-c3" textClasses=" text-lg font-semibold" label="Sign In with Google" /> */}

            {/* Already have an account? */}
            <View className="text-center text-gray-600 mt-6 flex flex-row items-center justify-center font-questrial">
                <Text>Already have an account?{" "}</Text>
                <Pressable onPress={() => router.push("/auth/sign-in")} className="font-semibold text-black flex justify-center items-center">
                    <Text className="flex justify-center items-center font-questrial">
                        Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
