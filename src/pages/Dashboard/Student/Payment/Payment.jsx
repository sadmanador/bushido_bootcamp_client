import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionHeader from "../../../../components/common/SectionHeader";
import { paymentGatewayPK } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(paymentGatewayPK);

const Payment = () => {
  const classId = useParams();
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { data: busket } = useQuery({
    queryKey: ["taken-courses/single", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/taken-courses/single/${classId.id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const price = busket?.price;
  console.log(busket);

  return (
    <div>
      <SectionHeader heading={"Payment"} subHeading={"Process the Payment"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm busket={busket} price={price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
