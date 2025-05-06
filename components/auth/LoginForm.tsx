import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { FormikProps } from "formik";

// Define form values types
interface SignInFormValues {
  email: string;
  password: string;
}

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

interface LoginFormProps<T extends SignInFormValues | SignUpFormValues> {
  className?: string;
  formType: 'signIn' | 'signUp';
  formik?: FormikProps<T>;
}

export function LoginForm<T extends SignInFormValues | SignUpFormValues>({
  className,
  formType = 'signIn',
  formik,
  ...props
}: LoginFormProps<T> & React.ComponentPropsWithoutRef<typeof View>) {
  const router = useRouter();
  const isSignUp = formType === 'signUp';
  
  // Extract Formik props if provided
  const {
    values = {} as T,
    handleChange,
    handleBlur,
    handleSubmit,
    errors = {},
    isSubmitting = false,
    isValid = true
  } = formik || {};

  return (
    <View className={cn("flex flex-1 flex-col gap-6 justify-center", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Create an account to get started' 
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View>
            <View className="flex flex-col gap-6">
              {isSignUp && (
                <View className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={isSignUp && 'name' in values ? values.name : ''}
                    onChangeText={handleChange ? handleChange('name') : undefined}
                    onBlur={handleBlur ? handleBlur('name') : undefined}
                  />
                  {isSignUp && errors.name && <Text className="text-red-500">{String(errors.name)}</Text>}
                </View>
              )}
              
              <View className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  value={'email' in values ? values.email : ''}
                  onChangeText={handleChange ? handleChange('email') : undefined}
                  onBlur={handleBlur ? handleBlur('email') : undefined}
                />
                {errors.email && <Text className="text-red-500">{String(errors.email)}</Text>}
              </View>
              
              <View className="grid gap-2">
                <View className="flex flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Button
                      className="ml-auto text-sm underline-offset-4 hover:underline flex"
                      variant={"link"}
                    >
                      <Text>Forgot your password?</Text>
                    </Button>
                  )}
                </View>
                <Input 
                  id="password" 
                  secureTextEntry={true} 
                  value={'password' in values ? values.password : ''}
                  onChangeText={handleChange ? handleChange('password') : undefined}
                  onBlur={handleBlur ? handleBlur('password') : undefined}
                />
                {errors.password && <Text className="text-red-500">{String(errors.password)}</Text>}
              </View>
              
              <Button 
                className="w-full"
                onPress={handleSubmit ? () => handleSubmit() : undefined}
                disabled={isSubmitting || !isValid}
              >
                <Text>{isSubmitting 
                  ? (isSignUp ? "Signing up..." : "Signing in...") 
                  : (isSignUp ? "Sign Up" : "Login")}
                </Text>
              </Button>
              
              <Button variant="ghost" className="w-full flex flex-row gap-2">
                <Ionicons name="logo-google" size={20} color="black" />
                <Text>{isSignUp ? "Sign Up with Google" : "Login with Google"}</Text>
              </Button>
            </View>
            
            <View className="mt-4 text-center text-sm flex-row items-center justify-center">
              <Text>{isSignUp ? "Already have an account? " : "Don't have an account? "}</Text>
              <Button 
                className="underline underline-offset-4"
                variant={"link"}
                onPress={() => router.push(isSignUp ? "/auth/sign-in" : "/auth/sign-up")}
              >
                <Text>{isSignUp ? "Sign In" : "Sign Up"}</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
