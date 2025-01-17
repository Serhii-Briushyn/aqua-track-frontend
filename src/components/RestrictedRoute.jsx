import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Navigate to={redirectTo} /> : Component;
};
