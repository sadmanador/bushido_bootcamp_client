import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";

const useInstructor = (): [boolean | undefined, boolean] => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecureToken();
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if(!user){
                return false
              }
            const res = await axiosSecure.get(`/students/instructor/${user?.email}`);
            return res.data.admin;
        }
    })
    return [isInstructor, isInstructorLoading]
};

export default useInstructor;