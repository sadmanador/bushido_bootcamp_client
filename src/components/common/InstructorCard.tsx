import React from "react";
import { Instructor } from "../../types";

interface InstructorCardProps {
  item: Instructor;
  email?: boolean;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ item, email }) => {
  const { name, instructor, instructor_img } = item as any; // Temporary cast as Instructor type might need adjustment or item has mixed fields
  // Note: Based on the previous code, item has 'instructor' and 'instructor_img' which might be specific to how it's fetched.
  // I will use any for now to avoid breakage, but I should ideally align Instructor interface.

  return (
    <div className="group relative h-[450px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-bushido-red/20">
      {/* Background Image with Overlay */}
      <img 
        src={instructor_img} 
        alt={instructor} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-4">
        <span className="inline-block px-3 py-1 bg-bushido-red/20 backdrop-blur-md text-bushido-red text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 border border-bushido-red/30">
          Master Instructor
        </span>
        <h3 className="text-3xl font-black text-white russo-one-regular mb-1 tracking-tight">
          {instructor}
        </h3>
        <p className="text-slate-300 text-sm font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 italic">
          &quot;{name}&quot;
        </p>
        
        {email && (
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {item?.email}
          </div>
        )}

        <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300">
          <button className="btn-premium px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
