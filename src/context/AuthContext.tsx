import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('shotr-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const signIn = (response: any) => {
        const userData: User = {
            email: response.email,
            name: response.name,
            picture: response.picture,
            id: response.sub
        };
        setUser(userData);
        localStorage.setItem('shotr-user', JSON.stringify(userData));
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('shotr-user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};