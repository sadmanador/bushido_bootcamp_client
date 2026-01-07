import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPublic from "../../api/axiosPublic";
import SocialLogin from "../../components/layout/social-login/SocialLogin";
import { imgHostingKey } from "../../constants";
import useAuth from "../../hooks/useAuth";

const Register: React.FC = () => {
  const { signUp, updateUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
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
      .then((imgData) => {
        if (!imgData.success) {
            throw new Error("Image upload failed");
        }
        const photoURL = imgData.data.url;
        const studentInfo = {
          email,
          displayName,
          photoURL,
        };

        signUp(email, password)
          .then((result) => {
            const currentUser = result.user;

            axiosPublic
              .post("/students", studentInfo)
              .then((res) => {
                console.log(res.data);
              });

            updateUser({ displayName, photoURL })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Registered!',
                  text: `${currentUser?.email} successfully registered!`,
                  background: '#1e293b',
                  color: '#fff',
                  confirmButtonColor: '#c33827'
                });
                reset();
                navigate("/");
              })
              .catch((error: Error) => setError(error.message));
          })
          .catch((error: Error) => {
            setError(error.message);
          });
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
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden bg-slate-800/40 backdrop-blur-xl">
            {/* Header */}
            <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-bushido-red rounded-2xl flex items-center justify-center shadow-lg shadow-bushido-red/20 mx-auto">
                  <span className="text-white font-black text-3xl russo-one-regular">B</span>
                </div>
              </Link>
              <h1 className="text-3xl font-black text-white russo-one-regular leading-tight mb-2">
                Join the <span className="text-bushido-red">Legion</span>
              </h1>
              <p className="text-slate-400 text-sm italic">
                Your journey to greatness begins today.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Your Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Musashi Miyamoto"
                    className="glass-input w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">This field is required</span>
                  )}
                </div>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="glass-input w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">
                      {errors.password.type === "minLength" ? "At least 6 characters required" : "Password is required"}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirm", { required: true })}
                    type="password"
                    placeholder="••••••••"
                    className="glass-input w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                  />
                  {errors.confirm && (
                    <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">This field is required</span>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Profile Image</span>
                </label>
                <div className="group relative">
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input w-full bg-white/5 border border-white/10 rounded-xl text-slate-400 text-sm file:bg-bushido-red file:text-white file:border-none file:mr-4 file:px-6 file:py-3 file:font-bold hover:file:bg-red-700 transition-all cursor-pointer"
                  />
                </div>
                {errors.image && (
                  <span className="text-red-500 text-[10px] mt-1 italic uppercase tracking-wider font-bold">This field is required</span>
                )}
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-premium py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm shadow-xl shadow-bushido-red/10">
                  Begin Journey
                </button>
              </div>

              <div className="text-center">
                <p className="text-slate-400 text-xs">
                  Already a member of the legion?{" "}
                  <Link to="/login" className="text-bushido-red hover:text-white transition-colors font-bold uppercase tracking-wider">
                    Login Now
                  </Link>
                </p>
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-slate-900 px-4 text-slate-500">Fast Enrollment</span>
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

export default Register;
// (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]|;:'",.<>/?]).{6,}
