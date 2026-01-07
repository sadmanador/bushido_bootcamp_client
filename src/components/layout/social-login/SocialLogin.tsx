import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPublic from "../../../api/axiosPublic";
import useAuth from "../../../hooks/useAuth";

const SocialLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleRegister = () => {
    setError(null);
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        };

        axiosPublic
          .post("/students", userInfo)
          .then((res) => {
            if (res.data.insertedId || res.data.message) {
              Swal.fire({
                icon: 'success',
                title: 'Logged in!',
                text: `${user?.email} successfully Logged in!`,
                background: '#1e293b',
                color: '#fff',
                confirmButtonColor: '#c33827'
              });
              navigate("/");
            }
          });
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleGoogleRegister} 
        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-all group overflow-hidden relative shadow-lg active:scale-95"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        <FaGoogle className="text-xl group-hover:text-bushido-red transition-colors" />
        <span className="uppercase tracking-widest text-sm">Continue with Google</span>
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <span className="text-red-500 text-xs font-medium italic">{error}</span>
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
