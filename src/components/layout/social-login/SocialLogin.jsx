import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {
  const [error, setError] = useState(null);
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

        axios
          .post("https://server-five-lemon.vercel.app/students", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire(
                "Logged in!",
                `${user?.email} successfully Logged it!`,
                "success"
              );
              navigate("/");
            }
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="form-control mt-6">
        <button onClick={handleGoogleRegister} className="btn-custom">
          <FaGoogle />
          Google
        </button>
      </div>
      <div className="text-center">
        {error && <span className="text-red-600 pb-4">{error}</span>}
      </div>
    </>
  );
};

export default SocialLogin;
