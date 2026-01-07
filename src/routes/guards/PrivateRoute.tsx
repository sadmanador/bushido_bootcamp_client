import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bushido-red"></div>
      </div>
    );
  }

  if (user && user?.email) {
    return <>{children}</>;
  }
  
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
