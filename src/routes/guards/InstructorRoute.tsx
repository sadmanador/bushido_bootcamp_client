import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useInstructor from '../../hooks/useInstructor';

interface InstructorRouteProps {
  children: React.ReactNode;
}

const InstructorRoute: React.FC<InstructorRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isInstructor, isInstructorLoading] = useInstructor();

  if (loading || isInstructorLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bushido-red"></div>
      </div>
    );
  }

  if (user && isInstructor) {
    return <>{children}</>;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default InstructorRoute;