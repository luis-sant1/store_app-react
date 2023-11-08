/** Creamos un contexto para compartir los datos autorizados (user) */
import Cookies from 'js-cookie'
import { createContext, useState, useContext, useEffect } from "react";
import axios from "../apiConfig/axios";
export const AuthContext = createContext();                            // Creamos contexto.
const register = import.meta.env.VITE_FETCH_REGISTER;
const login = import.meta.env.VITE_FETCH_LOGIN;
const verify = import.meta.env.VITE_FETCH_VERIFY;
const logout = import.meta.env.VITE_FETCH_LOGOUT;
export const useAuth = () => {                                         // AHORA con este hook traemos todods los datos sin tener que estar importando authcontext.
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(" USE AUTH DEBE DE SER USADO CON DENTRO AUTHPROVIDER ")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [adminAuth, setAdminAuth] = useState(false)
    const [user, setUser] = useState(null)                             // User que se está compartiendo
    const [isAuthenticated, setIsAuthenticated] = useState(false)      // Variable para saber si está autenticado el usuario
    const [error, setError] = useState("");                  // Por acá el resto de componentes consumiran los cambios que ocurran en el context.

    const signup = async (user) => {
        try {
            const res = await axios.post(register, user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        }

    }

    const signin = async (user) => {
        try {
            const res = await axios.post(login, user)
            const userRole = res.data.user.user.role[0].toString()
            console.log(userRole)
            if (userRole === 'admin') {
                setUser(res.data);
                setIsAuthenticated(true);
                return setAdminAuth(true)
            };

            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        }
    }
    const LogOut = async () => {
        try {
            const res = await axios.post(logout)
            console.log(res)
            setIsAuthenticated(false)
            window.location.href = "home"
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {                                                   // TIMER PARA LIMPIAR LOS ERRORES
        if (error != "") {
            const timer = setTimeout(() => {
                setError("")
            }, 5000);
            return () => clearTimeout(timer)                           // Eliminamos después de ejecutar (evita consumo extra de recursos)
        }
    }, [error])

    useEffect(() => {
        const validate = async (user) => {
            const cookies = Cookies.get()                                   // Revisamos si tenemos cookies
            if (!cookies.token) {
                setAdminAuth(false)                                                                      // Si no hay token
                setIsAuthenticated(false)
                setUser(null)
                return;
            }
            // si existe token en las cookies
            try {
                const res = await axios.get(verify, cookies.token);             // lo verificamos
                console.log(res)
                if (!res.data) setIsAuthenticated(false)                        // De no serverificado
                if (cookies.rol == "admin") setAdminAuth(true)                        

                setIsAuthenticated(true);                                       // SI pasa el test del backend..
                setUser(res.data);

            } catch (error) {
                setIsAuthenticated(false)                                       // si ocurre un error.
                setUser(null)
            }

        }
        validate(); // EJECUTA
    }, [])

    return (                                                           // Esto se ejecuta desde AuthContext.Provider
        <AuthContext.Provider value={{
            signup,                                                    // Por acá se pasa el objeto que se quiere compartir (user) 
            signin,
            user,
            isAuthenticated,
            LogOut,                                        // Comprobamos con un true o un false
            error,
            adminAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

