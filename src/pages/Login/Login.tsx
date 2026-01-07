import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/layout/social-login/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handlePasswordEnable = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
        passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const password = passwordRef.current?.value || "";
    signIn(data.email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          icon: 'success',
          title: 'Logged in!',
          text: `Welcome back ${user?.displayName}!`,
          background: '#1e293b',
          color: '#fff',
          confirmButtonColor: '#c33827'
        });
        navigate(from, { replace: true });
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen py-32 bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bushido-red/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bushido-red/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden bg-slate-800/40 backdrop-blur-xl">
            {/* Login Header */}
            <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-bushido-red rounded-2xl flex items-center justify-center shadow-lg shadow-bushido-red/20 mx-auto">
                  <span className="text-white font-black text-3xl russo-one-regular">B</span>
                </div>
              </Link>
              <h1 className="text-3xl font-black text-white russo-one-regular leading-tight mb-2">
                Welcome <span className="text-bushido-red">Back</span>
              </h1>
              <p className="text-slate-400 text-sm italic">
                The path to mastery continues here.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Address</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="warrior@bushido.com"
                  className="glass-input w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                />
                {errors.email && (
                  <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">This field is required</span>
                )}
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Secret Password</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      minLength: 6,
                      maxLength: 30,
                    })}
                    ref={(e) => {
                      register("password").ref(e);
                      (passwordRef as any).current = e;
                    }}
                    type="password"
                    required
                    placeholder="••••••••"
                    className="glass-input w-full pr-12 bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                  />
                  <button 
                    type="button"
                    onClick={handlePasswordEnable} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-bushido-red transition-colors"
                  >
                    <BsFillEyeFill className="text-xl" />
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">
                    {errors.password.type === "minLength" ? "At least 6 characters required" : "Password is required"}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full btn-premium py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm shadow-xl shadow-bushido-red/10">
                  Enter the Dojo
                </button>
              </div>

              <div className="text-center">
                <p className="text-slate-400 text-xs">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-bushido-red hover:text-white transition-colors font-bold uppercase tracking-wider">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-slate-900 px-4 text-slate-500">Ancient Way</span>
              </div>
            </div>

            <SocialLogin />

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <span className="text-red-500 text-xs font-medium italic">{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
