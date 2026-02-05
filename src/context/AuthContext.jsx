import { createContext, useContext, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        let mockUser = null;

        if (username.toLowerCase().includes('admin')) {
            mockUser = { username, role: 'ADMIN', token: 'mock-jwt-token' };
        } else if (username.toLowerCase().includes('client')) {
            mockUser = { username, role: 'CLIENT', token: 'mock-jwt-token' };
        }
        if (mockUser) {
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            setLoading(false);
            return { success: true };
        } else {
            setLoading(false);
            return { success: false, message: 'Invalid username (Use "admin" or "client")' };
        }
    };


    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);