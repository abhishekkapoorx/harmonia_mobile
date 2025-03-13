import { BackButtonBar } from "@/components/BackButtonBar";
import { Button } from "@/components/Button";
import { Input } from "@/components/auth/Input";
import { useSession } from "@/providers/SessionCtx";
import { validateEmail } from "@/utils/validators";
import { useRouter } from "expo-router";
import { Formik } from 'formik';
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function SignInScreen() {
    const router = useRouter();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const [SigninError, setSigninError] = useState("");

    const { session, signIn } = useSession();

    if (session) {
        router.replace({ pathname: '/home' });
    }

    const handleSubmit = async () => {
        setIsDisabled(true);
        if (!validateEmail(Email)) {
            setEmailError('Please enter a valid email.');
            setIsDisabled(false);
            return;
        }

        // Password validation
        if (Password.length < 4) {
            setPasswordError('Password must be at least 8 characters.');
            setIsDisabled(false);
            return;
        }

        try {
            const name = Name;
            const email = Email;
            const password = Password;
            console.log(email, password);
            const response = await signIn({ email, password });
            console.log(response);


            router.replace({ pathname: '/home' });
            setEmail('');
            setPassword('');
        } catch (error: any) {

            setSigninError(error?.response?.data?.message || 'Signup failed. Please try again.');
        }
        setIsDisabled(false);

    }

    return (
        <View className="flex-1 bg-gray-100 p-6">
            <BackButtonBar text="Sign In" />
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <View className="space-y-4 mt-10 gap-y-4">
                            <Input label="Email" value={Email} setVal={setEmail} className="border-b border-c6 mb-8" />
                            <Input label="Password" value={Password} setVal={setPassword} className="border-b border-c6 mb-8" />

                        </View>


                        <Button disabled={isDisabled} onPressh={handleSubmit} classNames="bg-c6 mt-20" textClasses="text-c1 text-xl" label="Sign In" />
                    </>
                )}
            </Formik>
            <Button onPressh={() => { }} classNames="bg-c3 mt-8" textClasses="text-xl font-semibold" label="Sign In with Google" />

            {/* Already have an account? */}
            <View className="text-center text-gray-600 mt-6 flex flex-row items-center justify-center font-questrial">
                <Text className="font-questrial">Already have an account?{" "}</Text>
                <Pressable onPress={() => router.push("/auth/sign-up")} className="font-semibold text-black flex justify-center items-center">
                    <Text className="flex justify-center items-center font-questrial">
                        Sign Up
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
