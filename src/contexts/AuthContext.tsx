import React, { createContext, useContext, useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import type { RecordModel } from 'pocketbase';

interface AuthContextType {
    user: RecordModel | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, passwordConfirm: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<RecordModel | null>(pb.authStore.model);
    const [loading, setLoading] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        // Listen to auth state changes
        const unsubscribe = pb.authStore.onChange((_token, model) => {
            setUser(model as RecordModel);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await pb.collection('users').authWithPassword(email, password);
            closeAuthModal();
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email: string, password: string, passwordConfirm: string, name: string) => {
        setLoading(true);
        try {
            // 1. Create User
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm,
                name,
            });

            // 2. Auto Login after creation
            await login(email, password);
            closeAuthModal();
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        pb.authStore.clear();
    };

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
