import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/layout/social-login/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState(null);
  const passwordRef = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handlePasswordEnable = () => {
    const passwordField = passwordRef.current;
    if (!showPassword) {
      setShowPassword(true);
      passwordField.setAttribute("type", "text");
    } else {
      setShowPassword(false);
      passwordField.setAttribute("type", "password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const password = passwordRef.current.value;
    signIn(data.email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire("Logged in!", `Welcome back ${user?.displayName}!`, "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="py-28 bg-base-300">
      <div className=" mx-auto flex-shrink-0 w-full max-w-md shadow-2xl glass">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-center font-semibold text-2xl">
            Welcome to Bushido Bootcamp <br />
            Please login
          </h1>
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
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                minLength: 6,
                maxLength: 30,
              })}
              ref={passwordRef}
              type="password"
              required
              placeholder="password"
              className="input input-bordered rounded-none"
            />
            <button onClick={handlePasswordEnable} className="btn btn-ghost w-10 btn-xs absolute bottom-8 right-2">
              <BsFillEyeFill className="text-2xl text-slate-600" />
            </button>
            <label className="label">
              {errors.password?.type === "required" && (
                <span className="text-red-600">This filed is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  Password must be less than 30 characters
                </span>
              )}
            </label>
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <p className="label-text-alt">
                Not have an account?{" "}
                <Link to="/register" className="link link-hover text-cyan-700">
                  Register
                </Link>
              </p>
            </label>
            <input type="submit" className="btn-custom" value="Login" />
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

export default Login;
