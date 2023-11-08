/** Creamos un contexto para compartir los datos autorizados (user) */

import { createContext, useState, useContext } from "react";
import axios from "axios";
export const AuthContext = createContext();                            // Creamos contexto.
const url = import.meta.env.VITE_FETCH_REGISTER;

export const useAuth = () => {                                         // AHORA con este hook traemos todods los datos sin tener que estar importando authcontext.
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(" USE AUTH DEBE DE SER USADO CON DENTRO AUTHPROVIDER ")
    }
    return context;
}

export const AuthProvider = ({ children }) => {                                  // Por acá el resto de componentes consumiran los cambios que ocurran en el context.
    const [user, setUser] = useState(null)                             // User que se está compartiendo
    const [isAuthenticated, setIsAuthenticated] = useState(false)      // Variable para saber si está autenticado el usuario
    const signup = async (user) => {
        try {
            // const res = await axios.post(url, user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response) {
                // La respuesta fue hecha y el servidor respondió con un código de estado
                // que esta fuera del rango de 2xx
                // setError(error.response.data.error.toString())
                console.log(errorState)
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // La petición fue hecha pero no se recibió respuesta
                // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
                // http.ClientRequest en node.js
                console.log(error.request);
            } else {
                // Algo paso al preparar la petición que lanzo un Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }

    }

    return (                                                           // Esto se ejecuta desde AuthContext.Provider
        <AuthContext.Provider value={{
            signup,                                                    // Por acá se pasa el objeto que se quiere compartir (user) 
            user,
            isAuthenticated                                             // Comprobamos con un true o un false
        }}>
            {children}
        </AuthContext.Provider>
    )
}

