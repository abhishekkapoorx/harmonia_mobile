import { BackButtonBar } from "@/components/BackButtonBar";
import { Button } from "@/components/Button";
import { Input } from "@/components/auth/Input";
import { useSession } from "@/providers/SessionCtx";
import { validateEmail } from "@/utils/validators";
import { useRouter } from "expo-router";
import { Formik, FormikValues } from 'formik';
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').min(5, 'Email must be at least 5 characters').max(50, 'Email must be less than 50 characters'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be less than 20 characters').required('Required'),
});

export default function SignInScreen() {
    const router = useRouter();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const { session, signIn } = useSession();

    if (session) {
        router.replace({ pathname: '/home' });
    }

    const handleSignIn = async (values: FormikValues) => {
        setIsDisabled(true);

        try {
            const email = values.email;
            const password = values.password;
            const response = await signIn({ email, password });
            Alert.alert('Success', response?.msg || 'Signin successful');
            console.log("message:::::: -> ",response?.msg);


            router.replace({ pathname: '/home' });
            setEmail('');
            setPassword('');
        } catch (error: any) {
            Alert.alert('Error', error?.response?.msg || 'Signup failed. Please try again.');
        }
        setIsDisabled(false);

    }

    return (
        <View className="flex-1 bg-c3 py-8 px-4">
            <BackButtonBar text="Sign In" />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handleSignIn(values)}
                validationSchema={SignInSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid }) => (
                    <>
                        <View className="space-y-4 mt-10 gap-y-4">
                            <Input label="Email" value={values.email} setVal={handleChange('email')} className="mb-8" error={errors.email} />
                            <Input label="Password" value={values.password} setVal={handleChange('password')} className="mb-8" error={errors.password} />
                        </View>

                        <Button disabled={!isValid} loading={isSubmitting} onPressh={handleSubmit} classNames={`bg-c6 mt-20 ${!isValid ? "opacity-70" : ""}`} textClasses={`text-c1 text-xl ${!isValid ? "opacity-70" : ""}`} label="Sign In" />
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
