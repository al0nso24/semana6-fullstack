import { useEffect, useState } from "react";
import api from "./api";

export default function Buscador(){
    const [termino, setTermino] = useState("");
    const [res, setRes] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{
        if(!termino){
            setRes([]);
            return;
        }
        const controlador = new AbortController();
        setCargando(true);
        api
            .get(`/posts?q=${termino}`, {signal: controlador.signal})
            .then((res) => setRes(res.data))
            .catch((err) => {
                if(err.code !== "ERR_CANCELED"){
                    console.error(err)
                }
            })
            .finally(() => setCargando(false));
        return () => controlador.abort(); //limpieza
    }, [termino]);

    return(
        <div>
            <input value={termino} onChange={(e) => setTermino(e.target.value)}
            placeholder="Buscar..."></input>
            {cargando && <p>Buscando...</p>}
            <ul>
                {res.map((p) => (
                    <li key={p.id}>{p.title}</li>
                ))}
            </ul>
        </div>
    )
}