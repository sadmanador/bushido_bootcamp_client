import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/user-context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex justify-center">
        <div>
          <p>loading</p>
        </div>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
