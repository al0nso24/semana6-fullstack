import { useState } from "react";

export default function FormularioUsuario(){
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [resultado, setResultado] = useState(null);

    function validar() {
        if (!nombre.trim()) return false;
        return /^\S+@\S+\.\S+$/.test(correo);
    }

    async function manejarEnvio(e) {
        e.preventDefault();
        if (!validar()) return setResultado("Datos inválidos");
        setEnviando(true);
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/users",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: nombre, email: correo })
                }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const creado = await res.json();
            setResultado(`Usuario #${creado.id} creado`);
        } catch (err) {
            setResultado("Error: " + err.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={manejarEnvio}>
            <input
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <button type="submit" disabled={enviando}>
                {enviando ? "Enviando..." : "Registrar"}
            </button>
            {resultado && <p>{resultado}</p>}
        </form>
    )
}