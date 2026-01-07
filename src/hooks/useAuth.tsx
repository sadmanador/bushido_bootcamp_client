import { useContext } from "react";
import { AuthContext, AuthInfo } from "../context/user-context/AuthContext";

const useAuth = (): AuthInfo => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

export default useAuth;
