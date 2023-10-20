import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState([]); // estados ...
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
  

    useEffect( () => {
        setLoading(true)
         fetch(url ) // url
            .then((response) => response.json()) // parseamos la respuesta
            .then((data) => setData(data)) // mandamos la data
            .catch((error) => setError(error)) // catch to error
            .finally(() => setLoading(false)) // finally es un método que se ejecuta al terminar la promesa.
    }, [])
    const total = data.length
    return { data, loading,   error , total}; // exportar
}