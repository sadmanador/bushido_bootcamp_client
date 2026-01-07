import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";

const HeaderPoster = () => {
  return (
    <div
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('assets/image/banner/bg/banner.avif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20">
          <div className="text-white max-w-2xl">
            <Fade
              delay={200}
              triggerOnce
              direction="up"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 russo-one-regular leading-tight">
                Discover the Way of the <br /> 
                <span className="text-bushido-red">Warrior</span>
              </h1>
            </Fade>
            
            <Fade delay={400} triggerOnce direction="up">
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
                Immerse yourself in the ancient traditions of the warrior's code at 
                <span className="text-white font-semibold"> Bushido Bootcamp</span>. 
                Our camp is a haven where discipline, honor, and physical prowess merge to create 
                an unforgettable adventure of self-discovery.
              </p>
            </Fade>

            <Fade delay={600} triggerOnce direction="up">
              <div className="flex flex-wrap gap-4">
                <Link to="/classes" className="btn btn-premium px-10 py-4 h-auto text-lg rounded-full">
                  Explore Classes
                </Link>
                <Link to="/instructors" className="btn btn-outline border-white/20 text-white hover:bg-white hover:text-slate-900 px-10 py-4 h-auto text-lg rounded-full transition-all duration-300">
                  Meet Instructors
                </Link>
              </div>
            </Fade>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-bushido-red/20 blur-3xl rounded-full"></div>
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPoster;
