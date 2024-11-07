import React, { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("visitante");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await api.post("/api/auth/register", {
        username,
        correo: email,
        contraseña: password,
        rol: role,
      });

      const { user, token } = response.data;

      if (user && token) {
        dispatch(login({ user, token }));
        setSuccessMessage("Registro exitoso. Redirigiendo...");
        setTimeout(() => {
          setError("");
          navigate("/");
        }, 1500);
      } else {
        setError("Registro exitoso");
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("visitante");

      setTimeout(() => {
        setError("");
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Error en el registro");
      console.error("Detalles del error:", error.response?.data);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        {successMessage && (
          <p className="text-success mt-3">{successMessage}</p>
        )}
        {error && <p className="text-danger mt-3">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Rol:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="visitante">Visitante</option>
              <option value="profesional">Profesional</option>
            </select>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
