import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        try {
            const res = await fetch('https://shadowy-phantasm-jxx6xxp69j3qq4x-3001.app.github.dev/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message && "Error al iniciar sesión.")
            };

            const data = await res.json();

            sessionStorage.setItem("token", data.token);

            navigate("/private");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        };

    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="p-4 card w-50">
                <h1>Inciar sesión</h1>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
            <div>
                ¿No estas registrado?{" "}
                <Link to="/" className="text-decoration-none fw-semibold text-primary">
                    Registrate
                </Link>
            </div>
        </div >
    )
}