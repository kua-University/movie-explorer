import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("axora_user"));
        if (savedUser && savedUser.token) {
            setUser(savedUser);
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedUser.token}`;
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            const userWithAvatar = { ...data, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.email}` };
            setUser(userWithAvatar);
            localStorage.setItem("axora_user", JSON.stringify(userWithAvatar));
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password });
            const userWithAvatar = { ...data, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.email}` };
            setUser(userWithAvatar);
            localStorage.setItem("axora_user", JSON.stringify(userWithAvatar));
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("axora_user");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
