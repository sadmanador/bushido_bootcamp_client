import { useQuery } from "@tanstack/react-query";
import { Booking } from "../types";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";


const useEnrolled = () => {
    const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { refetch, data: busket = [] as Booking[] } = useQuery({
    queryKey: ["taken-courses", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/taken-courses/enrolled?email=${user?.email}`);
      return res.data as Booking[];
    },
  });

  return {busket, refetch};
};

export default useEnrolled;