/** Creamos un contexto para compartir los datos autorizados (user) */
import Cookies from 'js-cookie'
import { createContext, useState, useContext, useEffect } from "react";
import axios from "../apiConfig/axios";
export const AuthContext = createContext();                            // Creamos contexto.
const register = import.meta.env.VITE_FETCH_REGISTER;
const login = import.meta.env.VITE_FETCH_LOGIN;
const verify = import.meta.env.VITE_FETCH_VERIFY;
export const useAuth = () => {                                         // AHORA con este hook traemos todods los datos sin tener que estar importando authcontext.
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(" USE AUTH DEBE DE SER USADO CON DENTRO AUTHPROVIDER ")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
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
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
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
        const validate = async () => {
            const cookies = Cookies.get()                                   // Revisamos si tenemos cookies
            if (!cookies.token) {                                           // Si no hay token
                setIsAuthenticated(false)
                setUser(null)
                return;
            }
            // si existe token en las cookies
            try {
                const res = await axios.get(verify, cookies.token);             // lo verificamos
                console.log(res)
                if (!res.data) setIsAuthenticated(false)                        // De no serverificado

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
            isAuthenticated,                                             // Comprobamos con un true o un false
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

