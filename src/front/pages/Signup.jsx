import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await fetch("https://shadowy-phantasm-jxx6xxp69j3qq4x-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || "Error al registrar el usuario.")
            };

            const data = await res.json();
            setMessage("Usuario creado correctamente, redirigiendo al login...")

        } catch (error) {
            setError(error.message);
        };

        setTimeout(() => { navigate('/login') }, 2000);

    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h4 className="py-4">Bienvenido a 4Geeks</h4>
            <form onSubmit={handleSubmit} className="p-4 card w-50">
                <h2>Crear cuenta</h2>

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

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-primary">Signup</button>
            </form>

            <div>
                ¿Ya tenés cuenta?{" "}
                <Link to="/login" className="text-decoration-none fw-semibold text-primary">
                    Iniciar sesión
                </Link>
            </div>
        </div>
    )
}