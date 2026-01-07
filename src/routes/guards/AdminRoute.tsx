import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bushido-red"></div>
      </div>
    );
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
