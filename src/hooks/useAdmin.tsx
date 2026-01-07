import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";

const useAdmin = (): [boolean | undefined, boolean] => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if(!user){
        return false
      }
      const res = await axiosSecure.get(`/students/admin/${user?.email}`);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
