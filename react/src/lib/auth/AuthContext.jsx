import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { getPermissions } from './permissions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const clearTokens = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            if (token) {
                try {
                    const data = await api.get('/auth/me/');
                    setUser(data);
                } catch (err) {
                    console.error("Session expired or invalid token");
                    clearTokens();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    // Idle timeout for Admin/SuperAdmin
    useEffect(() => {
        if (!user || (user.role !== 1 && user.role !== 2)) return;

        let timeoutId;
        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                clearTokens();
                setUser(null);
                window.location.href = '/login';
            }, 15 * 60 * 1000); // 15 minutes timeout
        };

        const events = ['click', 'keypress'];
        resetTimeout();
        
        events.forEach(event => window.addEventListener(event, resetTimeout));
        return () => {
            clearTimeout(timeoutId);
            events.forEach(event => window.removeEventListener(event, resetTimeout));
        };
    }, [user]);

    const login = async (username, password) => {
        const data = await api.post('/auth/login/', { username, password });
        
        const token = data.token;
        const userData = data.user;
        
        // Handle storage based on role
        if (userData.role === 1 || userData.role === 2) {
            // Admin or Super Admin -> Use sessionStorage
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
        } else {
            // Regular User -> Use localStorage
            localStorage.setItem('token', token);
            sessionStorage.removeItem('token');
        }

        setUser(userData);
        return userData;
    };

    const register = async (userData) => {
        return await api.post('/auth/register/', userData);
    };

    const logout = () => {
        clearTokens();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const usePermissions = () => {
    const { user } = useAuth();
    return getPermissions(user);
};
