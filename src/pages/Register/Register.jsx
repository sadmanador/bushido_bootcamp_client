import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { imgHostingKey } from "../../constants";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../shared/SocialLogin/SocialLogin";

const Register = () => {
  const { signUp, updateUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirm) {
      return setError("Error: password and confirm password must match!!!");
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    const email = data.email;
    const password = data.password;
    const displayName = data.name;

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostingKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const photoURL = data.data.url;
        const studentInfo = {
          email,
          displayName,
          photoURL,
        };

        signUp(email, password)
          .then((result) => {
            const currentUser = result.user;

            axios
              .post(
                "https://server-five-lemon.vercel.app/students",
                studentInfo
              )
              .then((res) => {
                console.log(res.data);
              });

            updateUser({ displayName, photoURL })
              .then()
              .catch((error) => setError(error.message));
            Swal.fire(
              "Registered!",
              `${currentUser?.email} successfully registered!`,
              "success"
            );
            reset();
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
          });
      });
  };

  return (
    <div className="py-28 bg-base-300">
      <div className=" mx-auto flex-shrink-0 w-full max-w-md shadow-2xl glass p-6">
        <h2 className="text-center text-2xl font-bold">
          Welcome to Bushido Bootcamp Register now
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          <div className="flex gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
                className="input input-bordered rounded-none"
              />
              <label className="label">
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered rounded-none"
              />
              <label className="label">
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                placeholder="password"
                className="input input-bordered rounded-none"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="text-red-600">This filed is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be 6 characters
                  </span>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                {...register("confirm", { required: true })}
                type="password"
                placeholder="confirm password"
                className="input input-bordered rounded-none"
              />
              <label className="label">
                {errors.confirm && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
          </div>
          <div className="form-control">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Profile picture</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs rounded-none"
              />
              <label className="label">
                {errors.image && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>
            </div>
            <label className="label">
              <p className="label-text-alt">
                Already have an account?{" "}
                <Link to="/login" className="link link-hover text-cyan-700">
                  Login
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control mt-6">
            <input type="submit" className="btn-custom" value="Sign Up" />
          </div>
        </form>
        <div className="divider">or</div>
        <SocialLogin></SocialLogin>
        <div className="text-center">
          {error && <span className="text-red-600 pb-4">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
// (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]|;:'",.<>/?]).{6,}
