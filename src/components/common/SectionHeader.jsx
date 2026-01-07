import { Fade } from "react-awesome-reveal";

const SectionHeader = ({ heading, subHeading }) => {
  return (
    <div className="relative py-20 px-6 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bushido-red/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Fade triggerOnce direction="down">
        <h2 className="text-3xl md:text-5xl font-black text-white russo-one-regular mb-4 relative z-10">
          {heading}
          <span className="block h-1.5 w-24 bg-bushido-red mx-auto mt-4 rounded-full"></span>
        </h2>
      </Fade>
      
      <Fade triggerOnce direction="up" delay={200}>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium relative z-10 italic">
          {subHeading}
        </p>
      </Fade>
    </div>
  );
};

export default SectionHeader;
