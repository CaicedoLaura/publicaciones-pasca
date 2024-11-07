import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;
