import { useQuery } from '@tanstack/react-query';
import { User } from '../types';
import useAuth from './useAuth';
import useAxiosSecureToken from './useAxiosSecureToken';

const useStudents = () => {
    const [axiosSecure] = useAxiosSecureToken();
    const { user, loading: authLoading } = useAuth();

    const {
        data: students = [] as User[],
        isLoading: loading,
        refetch,
      } = useQuery({
        queryKey: ["students", user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
          const res = await axiosSecure.get(`/students?email=${user?.email}`);
          return res.data as User[];
        },
      });

      return { refetch, loading, students };
};

export default useStudents;