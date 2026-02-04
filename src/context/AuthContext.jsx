import {createContext, useContext, useState} from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    const login = async(username, password) => {
        setLoading(true);

        try {
            const  response = await api.post("/auth/login", { username, password});
            const userData = response.data;

            setUser(userData);
            localStorage.setITem('user', JSON.stringify(userData));
            return { success : true };
        } catch (error) {
            console.error('Login Failed : ', error);
            return {
                success: false,
                message : error.response?.data?.message || 'Invalid Credentials'
            };
        } finally {
            setLoading(false);
        }
    }

    const logout = async() => {
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
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);