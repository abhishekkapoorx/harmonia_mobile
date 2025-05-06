import { BackButtonBar } from "@/components/BackButtonBar";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSession } from "@/providers/SessionCtx";
import { useRouter } from "expo-router";
import { Formik, FormikValues } from 'formik';
import React, { useState } from "react";
import { Alert, View } from "react-native";
import * as Yup from 'yup';

// Define sign-up form values type
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

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

    const handleSignUp = async (values: SignUpFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setIsDisabled(true);

        try {
            const { name, email, password } = values;
            const response = await signUp({ name, email, password });
            Alert.alert('Success', response?.msg || 'Sign up successful');
            router.replace({ pathname: '/home' });
        } catch (error: any) {
            Alert.alert('Error', error?.response?.msg || 'Sign up failed. Please try again.');
        } finally {
            setIsDisabled(false);
            setSubmitting(false);
        }
    }

    return (
        <View className="flex-1 bg-c3 px-4 py-4">
            <BackButtonBar text="Sign Up" />
            <Formik<SignUpFormValues>
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={handleSignUp}
                validationSchema={SignUpSchema}
            >
                {(formikProps) => (
                    <LoginForm<SignUpFormValues>
                        formik={formikProps}
                        formType="signUp"
                    />
                )}
            </Formik>
        </View>
    );
}
