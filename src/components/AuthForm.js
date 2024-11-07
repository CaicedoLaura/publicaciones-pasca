import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(endpoint, { email, password });

      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate.push("/");
    } catch (error) {
      setError(error.response?.data?.message || "Error en la autenticación");
    }
  };

  return (
    <div className="auth-form container mt-5">
      <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="btn btn-link mt-3"
      >
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
};

export default AuthForm;
