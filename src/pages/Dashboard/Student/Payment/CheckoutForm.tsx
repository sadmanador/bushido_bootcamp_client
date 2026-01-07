import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import { Booking } from "../../../../types";

interface CheckoutFormProps {
  busket?: Booking;
  price: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ busket, price }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const [axiosSecure] = useAxiosSecureToken();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post(`/payment-intent?email=${user?.email}`, { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosSecure, user?.email]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setProcessing(true);

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message || "An unknown error occurred");
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card as StripeCardElement,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confirmError) {
      setCardError(confirmError.message || "Confirmation failed");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const paymentData = {
        takenCourse: busket?._id,
        user: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
        price: busket?.price,
        date: new Date(),
        courseId: busket?.courseId,
        image: busket?.image,
        name: busket?.name,
        notification: "Will soon tell you about timings",
      };

      axiosSecure.post("/payments", paymentData).then((res) => {
        if (res.data.insertResult?.acknowledged) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Payment successfully done! Mr. ${user?.displayName}`,
            showConfirmButton: false,
            timer: 1500,
            background: '#1e293b',
            color: '#fff'
          });
          navigate("/dashboard/myEnrolledClasses");
        }
      });
    }
    setProcessing(false);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handlePayment}>
        <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl mb-6 shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  fontFamily: '"Outfit", sans-serif',
                  "::placeholder": {
                    color: "#64748b",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
        
        <button
          className="w-full btn-premium py-4 rounded-xl font-bold uppercase tracking-widest text-sm disabled:opacity-50 transition-all"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
             <span className="loading loading-spinner loading-sm"></span>
          ) : (
            `Pay $${price}`
          )}
        </button>
      </form>
      
      {cardError && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          {cardError}
        </div>
      )}
      
      {transactionId && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-medium">
          Payment Successful! Transaction ID: <span className="font-mono text-xs">{transactionId}</span>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
