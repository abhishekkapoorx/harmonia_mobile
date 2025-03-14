import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { loginUser, signupUser } from "@/http/loginAndSignup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User{
    user_id:string;
    name:string|null;
    email:string;
    role:string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User;
    token: string | null;
    isLoading:boolean;
    logIn: (username: string, password: string) => any;
    register: (name: string, email: string, password: string) => any;
    logOut: () => void;
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        email: "",
        user_id: "",
        name: "",
        role: "",
    });
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("access_token");
                if (storedToken) {
                    setToken(storedToken);
                    setIsAuthenticated(true);
                    setUser(JSON.parse(await AsyncStorage.getItem("user_data") || "{}"));
                    // console.log("in checkAuthStatus", await AsyncStorage.getItem("user_data"));
                }
            } catch (error) {
                console.error("Error fetching auth data", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, [isAuthenticated]);


    const logIn = async (email: string, password: string) => {
        try {
            // console.log({ email, password })
            const data = await loginUser({ email: email, password: password });
            // console.log("this is data after login",data)


            if (data) {
                const user_data = data.data?.user;
                setUser(user_data);


                await AsyncStorage.setItem("auth_token", data.data.access_token);
                await AsyncStorage.setItem("user_data", JSON.stringify(user_data));
                // console.log("AsyncStorage set user data: ", await AsyncStorage.getItem("user_data"))
                // console.log("AsyncStorage set auth token: ", await AsyncStorage.getItem("auth_token"))

                setIsAuthenticated(true);
                
                setToken(data.data.access_token);

                return data;
            }
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            // console.log({ name, email, password })
            const data = await signupUser({ name: name, email: email, password: password });
            // console.log(data)


            if (data) {
                const user_data = data.data?.user;
                setUser(user_data);


                await AsyncStorage.setItem("auth_token", data.data.access_token);
                await AsyncStorage.setItem("user_data", JSON.stringify(user_data));


                setIsAuthenticated(true);
                
                setToken(data.data.access_token);

                return data;
            }
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logOut = async () => {
        try {

            await AsyncStorage.removeItem("user_data");
            await AsyncStorage.removeItem("auth_token");


            setIsAuthenticated(false);
            setUser({
                email: "",
                user_id: "",
                name: null,
                role: "",
            });
            setToken(null);
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,isLoading, user, token, logIn, logOut, setIsAuthenticated, register }}>
            {!isLoading && children} 
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
