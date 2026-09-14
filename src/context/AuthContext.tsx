import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { AuthTokens, AuthUser } from "@/types/Auth.ts";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_EMAIL_KEY = "userEmail";

type AuthContextValue = {
    user: AuthUser | null;
    saveSession: (email: string, tokens: AuthTokens) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredUser = (): AuthUser | null => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const email = localStorage.getItem(USER_EMAIL_KEY);

    return accessToken && email ? { email } : null;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<AuthUser | null>(getStoredUser);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        saveSession: (email, tokens) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
            localStorage.setItem(USER_EMAIL_KEY, email);

            if (tokens.refreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
            } else {
                localStorage.removeItem(REFRESH_TOKEN_KEY);
            }

            setUser({ email });
        },
        logout: () => {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(USER_EMAIL_KEY);
            setUser(null);
        },
    }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
};