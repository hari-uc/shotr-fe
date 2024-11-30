export interface User {
    email: string;
    name: string;
    picture?: string;
    id: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (response: any) => void;
    signOut: () => void;
}
