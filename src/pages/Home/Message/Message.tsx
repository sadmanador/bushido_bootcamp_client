import React from "react";
import { Fade } from "react-awesome-reveal";
import SectionHeader from "../../../components/common/SectionHeader";

const Message: React.FC = () => {
  return (
    <div className="bg-slate-900 py-24 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bushido-red/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 lg:px-24">
        <SectionHeader 
          heading="Get In Touch" 
          subHeading="Our masters are always ready to guide you on your journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12 bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="space-y-8">
            <Fade triggerOnce direction="left">
              <h1 className="text-4xl md:text-5xl font-black text-white russo-one-regular leading-tight">
                Unleash Your <span className="text-bushido-red">Inner Warrior</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Ready to embark on an extraordinary journey of self-discovery, discipline, and honor? 
                Whether you&apos;re a beginner or an experienced practitioner, Bushido Camp offers a 
                transformative experience like no other.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-bushido-red/10 flex items-center justify-center text-bushido-red">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-bushido-red/10 flex items-center justify-center text-bushido-red">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">123 Warrior Lane, Dojo City</span>
                </div>
              </div>
            </Fade>
          </div>

          <Fade triggerOnce direction="right">
            <div className="bg-slate-900/60 p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-inner">
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="warrior@bushido.com"
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-slate-400 font-bold uppercase tracking-wider text-[10px]">Your Message</span>
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-bushido-red/50 transition-all shadow-inner"
                    placeholder="I want to learn the way of the warrior..."
                  ></textarea>
                </div>
                <button className="w-full btn-premium py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm">
                  Send Message
                </button>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Message;
