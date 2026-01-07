import React from "react";
import { useLoaderData } from "react-router-dom";
import InstructorCard from "../../../components/common/InstructorCard";
import SectionHeader from "../../../components/common/SectionHeader";
import { Instructor } from "../../../types";

const TopInstructor: React.FC = () => {
  const classes = useLoaderData() as Instructor[];
  
  return (
    <div className="bg-slate-800 py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-bushido-red/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <SectionHeader
          heading="Grand Masters"
          subHeading="Learn from the industry&apos;s most respected martial arts experts"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {classes.slice(0, 3).map((item, index) => (
            <InstructorCard
              key={index}
              item={item}
              email={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopInstructor;
