import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/Customer_Login"} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;

  if (!username) {
    return <Navigate to={"/Customer_Login"} replace={true}></Navigate>;
  }

  return children;
};
