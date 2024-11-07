import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Inicio
      </Link>
      <div className="navbar-links">
        {isAuthenticated && user?.rol === "profesional" && (
          <Link to="/create-post">Crear Publicación</Link>
        )}
        {isAuthenticated ? (
          <button className="nav-link logout-link" onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/auth">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
