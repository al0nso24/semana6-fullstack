import useFetch from "./useFetch";

export default function PerfilUsuario(){
    const {datos:usuario, cargando, error} = useFetch(`https://jsonplaceholder.typicode.com/users/${2}`);

    if(cargando){
        return <p>Cargando usuario...</p>
    }else if(error){
        return <p>Error: {error}</p>
    }

    return(
        <div>
            <h3>{usuario.name}</h3>
            <h3>{usuario.email}</h3>
        </div>
    )
}