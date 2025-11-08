import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    const fetch_user = async () => {
        setError("");
        setLoading(true)

        try {
            const token = sessionStorage.getItem("token")
            const res = await fetch(`${API_URL}/api/private`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (!res.ok) {
                throw new Error("Token inválido.");
            };

            const data = await res.json();

            setUser(data)

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (!token) {
            navigate("/login");
            return;
        }

        fetch_user();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!user) return null;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-4">

            <div className="d-flex py-2 justify-content-between">
                <h1>Zona privada</h1>
                <button onClick={handleLogout} className="btn btn-outline-danger">
                    Cerrar sesión
                </button>
            </div>

            <p>Bienvenido, <strong>{user.email}.</strong> Que tenga una excelente jornada.</p>

            <div className="card m-1 py-3 text-center">
                <p>
                    Agradezco a 4Geeks por este maravilloso curso. Fue un antes y un despues en mi vida. Agradecido con ustedes profesores, Bryan y Jose, por sus grandes explicaciones, sus consejos y su paciencia para que nosotros podamos sacarle el mejor provecho a este curso. Estoy completamente maravillado por su manera tan clara de explicar una carrera como esta en tan poco tiempo. Sin dudas son una inspiración para mi y para muchos de los que estamos acá haciendo este curso.
                </p>
                <p>
                    Aunque se que falta el proyecto final, no queria dejar pasar la oportunidad de agradecerles por toda su entrega en estos meses.
                </p>
                <p>
                    ¡Muchisimas gracias profes, <strong>Bryan y Jose.</strong>!
                </p>
            </div>
        </div>
    );
}