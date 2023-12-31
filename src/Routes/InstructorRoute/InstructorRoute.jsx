import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useInstructor from '../../hooks/useInstructor';

const InstructorRoute = ({children}) => {
    const { user, loading } = useAuth();
  const location = useLocation();
  const [isInstructor, isInstructorLoading] = useInstructor();

  if (loading || isInstructorLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;