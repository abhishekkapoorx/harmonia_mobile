import { BackButtonBar } from "@/components/BackButtonBar";
import { Button } from "@/components/Button";
import { Input } from "@/components/auth/Input";
import { useSession } from "@/providers/SessionCtx";
import { useRouter } from "expo-router";
import { Formik, FormikValues } from 'formik';
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
        .min(5, 'Email must be at least 5 characters')
        .max(50, 'Email must be less than 50 characters'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters')
        .required('Required'),
});

export default function SignUpScreen() {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);
    const { session, signUp } = useSession();

    if (session) {
        router.replace({ pathname: '/home' });
    }

    const handleSignUp = async (values: FormikValues) => {
        setIsDisabled(true);

        try {
            const { name, email, password } = values;
            const response = await signUp({ name, email, password });
            Alert.alert('Success', response?.msg || 'Sign up successful');
            router.replace({ pathname: '/home' });
        } catch (error: any) {
            Alert.alert('Error', error?.response?.msg || 'Sign up failed. Please try again.');
        }
        setIsDisabled(false);
    }

    return (
        <View className="flex-1 bg-c3 py-8 px-4">
            <BackButtonBar text="Sign Up" />
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={values => handleSignUp(values)}
                validationSchema={SignUpSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid }) => (
                    <>
                        <View className="space-y-4 mt-10 gap-y-4">
                            <Input 
                                label="Name" 
                                value={values.name} 
                                setVal={handleChange('name')} 
                                className="mb-8" 
                                error={errors.name} 
                            />
                            <Input 
                                label="Email" 
                                value={values.email} 
                                setVal={handleChange('email')} 
                                className="mb-8" 
                                error={errors.email} 
                            />
                            <Input 
                                label="Password" 
                                value={values.password} 
                                setVal={handleChange('password')} 
                                className="mb-8" 
                                error={errors.password} 
                            />
                        </View>

                        <Button 
                            disabled={!isValid} 
                            loading={isSubmitting} 
                            onPressh={handleSubmit} 
                            classNames={`bg-c6 mt-20 ${!isValid ? "opacity-70" : ""}`} 
                            textClasses={`text-c1 text-xl ${!isValid ? "opacity-70" : ""}`} 
                            label="Sign Up" 
                        />
                    </>
                )}
            </Formik>
            <Button onPressh={() => { }} classNames="bg-c3 mt-8" textClasses="text-xl font-semibold" label="Sign Up with Google" />

            {/* Already have an account? */}
            <View className="text-center text-gray-600 mt-6 flex flex-row items-center justify-center font-questrial">
                <Text className="font-questrial">Already have an account?{" "}</Text>
                <Pressable onPress={() => router.push("/auth/sign-in")} className="font-semibold text-black flex justify-center items-center">
                    <Text className="flex justify-center items-center font-questrial">
                        Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
