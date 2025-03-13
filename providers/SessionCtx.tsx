import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { loginUser, signupUser } from '@/http/loginAndSignup';

interface User {
    user_id: string;
    name: string;
    email: string;
    role: string;
}

type LoginResponse = {
    msg: string, data: { user: User, access_token: string, refresh_token: string }
} | null;

interface SessionContextType {
    signIn: (credentials: { email: string, password: string }) => Promise<LoginResponse>;
    signUp: (data: { name: string, email: string, password: string }) => Promise<LoginResponse>;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    userData?: User | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<SessionContextType | undefined>(undefined);


// This hook can be used to access the user info.
export function useSession(): SessionContextType {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingUserData, userData], setUserData] = useStorageState('user_data');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const signIn = async ({ email, password }: { email: string, password: string }) => {
        try {
            const data = await loginUser({ email: email, password: password });

            if (data) {
                const user = data.data?.user;
                setUserData(JSON.stringify(user));
                setIsAuthenticated(true);

                const access_token = data.data.access_token;
                setSession(access_token);

                return data;
            }
        } catch (error) {
            console.error('Error signing in:', error);
            return {
                data: {
                    msg: 'Error signing in',
                    data: null
                }
            }
        }
    }

    const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        try {
            const data = await signupUser({ name: name, email: email, password: password });
            if (data) {
                const user = data.data?.user;
                setUserData(JSON.stringify(user));
                setIsAuthenticated(true);

                const access_token = data.data.access_token;
                setSession(access_token);

                return data;
            }

        } catch (error) {
            console.error('Error signing up:', error);
            return {
                data: {
                    msg: 'Error signing up',
                    data: null
                }
            }
        }
    }

    const signOut = () => {
        setSession(null);
        setUserData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                session,
                isLoading,
                userData: userData ? JSON.parse(userData) : null,
                isAuthenticated
            }}>
            {children}
        </AuthContext.Provider>
    );
}
