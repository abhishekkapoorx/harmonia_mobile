import { BackButtonBar } from "@/components/BackButtonBar";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSession } from "@/providers/SessionCtx";
import { useRouter } from "expo-router";
import { Formik, FormikValues } from 'formik';
import React, { useState } from "react";
import { Alert, View } from "react-native";
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').min(5, 'Email must be at least 5 characters').max(50, 'Email must be less than 50 characters'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').max(20, 'Password must be less than 20 characters').required('Required'),
});

export default function SignInScreen() {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);

    const { session, signIn } = useSession();

    if (session) {
        router.replace({ pathname: '/home' });
    }

    const handleSignIn = async (values: FormikValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setIsDisabled(true);

        try {
            const email = values.email;
            const password = values.password;
            const response = await signIn({ email, password });
            Alert.alert('Success', response?.msg || 'Signin successful');

            router.replace({ pathname: '/home' });
        } catch (error: any) {
            Alert.alert('Error', error?.response?.msg || 'Signin failed. Please try again.');
        } finally {
            setIsDisabled(false);
            setSubmitting(false);
        }
    }

    return (
        <View className="flex-1 px-4">
            <BackButtonBar text="Sign In" />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSignIn}
                validationSchema={SignInSchema}
            >
                {(formikProps) => (
                    <LoginForm formik={formikProps} />
                )}
            </Formik>
        </View>
    );
}
