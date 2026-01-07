import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../../../components/common/SectionHeader";
import { paymentGatewayPK } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import { Booking } from "../../../../types";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(paymentGatewayPK);

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { data: busket } = useQuery({
    queryKey: ["taken-courses/single", user?.email, id],
    enabled: !loading && !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/taken-courses/single/${id}?email=${user?.email}`
      );
      return res.data as Booking;
    },
  });

  const price = busket?.price || 0;

  return (
    <div>
      <SectionHeader heading={"Payment"} subHeading={"Process the Payment"} />
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mt-8">
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-2">Order Summary</h3>
          <div className="flex justify-between items-center py-4 border-b border-white/5">
            <span className="text-slate-400">Class Name</span>
            <span className="text-white font-medium">{busket?.name}</span>
          </div>
          <div className="flex justify-between items-center py-4">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
            <span className="text-bushido-red text-2xl font-black">${price}</span>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm busket={busket} price={price}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
