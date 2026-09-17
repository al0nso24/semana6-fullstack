import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000
})

api.interceptors.response.use(
    (respuesta) => respuesta,
    (error) => {
        if(error.response){
            console.error(`Error del servidor: ${error.response.status}`);
        }else if(error.code === "ERR_CANCELED"){
            console.log("Búsqueda descartada");
        }
        return Promise.reject(error);
    }
)

export default api;