import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "../types";
import useAuth from "./useAuth";
import useAxiosSecureToken from "./useAxiosSecureToken";


const usePaymentHistory = () => {
    const [axiosSecure] = useAxiosSecureToken();
    const { user, loading: authLoading } = useAuth();

    const {
        data: histories = [] as PaymentHistory[],
        isLoading: loading,
        refetch,
      } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data as PaymentHistory[];
        },
      });
    
      return { histories, loading, refetch };
};

export default usePaymentHistory;