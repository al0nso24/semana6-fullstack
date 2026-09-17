import { useState, useEffect } from "react";

export default function ListaPosts() {
    const [posts, setPosts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => setPosts(data))
            .catch((err) => setError(err.message))
            .finally(() => setCargando(false));
    }, []);

    if(cargando){
        return <p>Cargando posts...</p>;
    }else if(error){
        return <p>Error: {error}</p>;
    }else{
        return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
    }
}