import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const token = localStorage.getItem("authToken");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;