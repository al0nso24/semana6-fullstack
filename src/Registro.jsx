import { useState } from "react";
import axios from "axios";

export default function Registro() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [estado, setEstado] = useState("inicial");
    const [mensaje, setMensaje] = useState("");

    function validar() {
        if (!/^\S+@\S+\.\S+$/.test(correo)) {
            setEstado("error"); setMensaje("Correo inválido"); return false;
        }
        if (password.length < 6) {
            setEstado("error"); setMensaje("Mínimo 6 caracteres"); return false;
        }
        return true;
    }

    async function manejarEnvio(e) {
        e.preventDefault();
        if (!validar()) return;
        setEstado("cargando");
        try {
            const res = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                { email: correo, password }
            );
            const token = btoa(`${res.data.id}-${Date.now()}`);
            setEstado("exito");
            setMensaje(`Registro exitoso. Token: ${token}`);
        } catch (err) {
            setEstado("error");
            const detalle = err.response?.data?.error;
            setMensaje(detalle ? `Error: ${detalle}` : `Fallo: ${err.message}`);
        }
    }

    return (
        <form onSubmit={manejarEnvio}>
            <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={estado === "cargando"}>
                {estado === "cargando" ? "Registrando..." : "Registrarse"}
            </button>
            {(estado === "error" || estado === "exito") && (
                <p>{mensaje}</p>
            )}
        </form>
    );
}
