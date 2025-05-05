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

interface LoginFormProps {
  className?: string;
  formik?: FormikProps<{
    email: string;
    password: string;
  }>;
}

export function LoginForm({
  className,
  formik,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<typeof View>) {
  const router = useRouter();
  
  // Extract Formik props if provided
  const {
    values = { email: '', password: '' },
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View>
            <View className="flex flex-col gap-6">
              <View className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  value={values.email}
                  onChangeText={handleChange ? handleChange('email') : undefined}
                  onBlur={handleBlur ? handleBlur('email') : undefined}
                />
                {errors.email && <Text className="text-red-500">{errors.email}</Text>}
              </View>
              <View className="grid gap-2">
                <View className="flex flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    className="ml-auto text-sm underline-offset-4 hover:underline flex"
                    variant={"link"}
                  >
                    <Text>Forgot your password?</Text>
                  </Button>
                </View>
                <Input 
                  id="password" 
                  secureTextEntry={true} 
                  value={values.password}
                  onChangeText={handleChange ? handleChange('password') : undefined}
                  onBlur={handleBlur ? handleBlur('password') : undefined}
                />
                {errors.password && <Text className="text-red-500">{errors.password}</Text>}
              </View>
              <Button 
                className="w-full"
                onPress={handleSubmit ? () => handleSubmit() : undefined}
                disabled={isSubmitting || !isValid}
              >
                <Text>{isSubmitting ? "Signing in..." : "Login"}</Text>
              </Button>
              <Button variant="ghost" className="w-full flex flex-row gap-2">
                <Ionicons name="logo-google" size={20} color="black" />
                <Text>Login with Google</Text>
              </Button>
            </View>
            <View className="mt-4 text-center text-sm flex-row items-center justify-center">
              <Text>Don&apos;t have an account?{" "}</Text>
              <Button 
                className="underline underline-offset-4"
                variant={"link"}
                onPress={() => router.push("/auth/sign-up")}
              >
                <Text>Sign up</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
