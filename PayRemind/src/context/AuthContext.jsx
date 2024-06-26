import { createContext, useState, useEffect, useContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookie = Cookies.get();

            if (!cookie.token) {
                setIsAuthenticated(false);
                setloading(false);
                return setUser(null);

            }
            try {
                const res = await verifyTokenRequest(cookie.token)

                if (!res.data) {
                    setIsAuthenticated(false);
                    setloading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setloading(false);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setloading(false);
            }
        }
        checkLogin();

    }, []);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data); // Descomentar esta línea
            setIsAuthenticated(true);
        } catch (error) {
            // Manejar errores de forma consistente
            setErrors([error.response.data.message]);
        }
    };


    return (
        <AuthContext.Provider
            value={{ 
                signup, 
                signin,
                loading,
                user, 
                isAuthenticated, 
                errors 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};