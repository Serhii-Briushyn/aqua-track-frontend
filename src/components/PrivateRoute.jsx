import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? Component : <Navigate to={redirectTo} />;
};
