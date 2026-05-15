import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("axora_user"));
        if (savedUser && savedUser.token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(savedUser);
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedUser.token}`;
        }
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('auth/login', { email, password });
        const userWithAvatar = { ...data, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.email}` };
        setUser(userWithAvatar);
        localStorage.setItem("axora_user", JSON.stringify(userWithAvatar));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('auth/register', { name, email, password });
        const userWithAvatar = { ...data, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.email}` };
        setUser(userWithAvatar);
        localStorage.setItem("axora_user", JSON.stringify(userWithAvatar));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("axora_user");
        delete axios.defaults.headers.common["Authorization"];
        toast.success("Successfully logged out");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
