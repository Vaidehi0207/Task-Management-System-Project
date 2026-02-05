"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
    userId: number;
    email?: string;
    username?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            try {
                const decoded = jwtDecode<User>(accessToken);
                setUser(decoded);
                setToken(accessToken);
            } catch (err) {
                console.error("Invalid token", err);
            }
        }
        setLoading(false);
    }, []);

    const login = (accessToken: string, refreshToken: string) => {
        Cookies.set("accessToken", accessToken, { expires: 1 / 96 }); // 15 mins
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
        const decoded = jwtDecode<User>(accessToken);
        setUser(decoded);
        setToken(accessToken);
        router.push("/dashboard");
    };

    const logout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser(null);
        setToken(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
