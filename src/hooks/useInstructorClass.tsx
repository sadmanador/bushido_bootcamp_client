import { useQuery } from "@tanstack/react-query";
import { ClassItem } from "../types";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";

const useInstructorClass = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { refetch, data: classes = [] as ClassItem[] } = useQuery({
    queryKey: ["classes/myClasses", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/myClasses?email=${user?.email}`);
      return res.data as ClassItem[];
    },
  });

  return { classes, refetch };
};

export default useInstructorClass;
