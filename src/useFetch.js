import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCargando(true);
        axios
            .get(url)
            .then((res) => setDatos(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, [url]); // repite la petición si la URL cambia
    
    return { datos, cargando, error };
}
