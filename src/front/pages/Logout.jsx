import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light px-4">
            <a className="navbar-brand" href="/">Mi App</a>
            <button onClick={handleLogout} className="btn btn-outline-danger">
                Cerrar sesión
            </button>
        </nav>
    );
};