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

export const AuthProvider = ({ children }) => {         
    const [e, setE] = useState ("")                  // Por acá el resto de componentes consumiran los cambios que ocurran en el context.
    const [user, setUser] = useState(null)                             // User que se está compartiendo
    const [isAuthenticated, setIsAuthenticated] = useState(false)      // Variable para saber si está autenticado el usuario
    const signup = async (user) => {
        try {
            const res = await axios.post(url, user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
          console.log(error)
          setE(error.response.data.error)
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

