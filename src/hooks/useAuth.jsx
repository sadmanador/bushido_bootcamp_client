import { useContext } from "react";
import { AuthContext } from "../context/user-context/UserContext";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
