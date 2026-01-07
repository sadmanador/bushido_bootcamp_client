import { useQuery } from "@tanstack/react-query";
import { Booking } from "../types";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";

const useBusket = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { refetch, data: busket = [] as Booking[] } = useQuery({
    queryKey: ["taken-courses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if(!user){
        return []
      }
      const res = await axiosSecure.get(`/taken-courses?email=${user?.email}`);
      return res.data as Booking[];
    },
  });

  return {busket, refetch};
};

export default useBusket;
