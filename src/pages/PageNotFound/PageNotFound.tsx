import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] text-center bg-slate-900 px-6">
      <div className="max-w-2xl w-full">
        <div className="relative group">
          <div className="absolute -inset-4 bg-bushido-red/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img 
            src="assets/image/404/404.jpg" 
            alt="404 - Ronin Lost" 
            className="rounded-[3rem] shadow-2xl relative z-10 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
        
        <div className="mt-12 space-y-6">
          <h2 className="text-4xl font-black text-white russo-one-regular">Path <span className="text-bushido-red">Not Found</span></h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto italic font-light">
            Even the greatest warriors sometimes lose their way. Return to the starting point to continue your training.
          </p>
          <div className="pt-4">
            <Link className="btn-premium px-12 py-4 rounded-full inline-block font-bold uppercase tracking-widest text-sm shadow-xl shadow-bushido-red/10" to="/">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
