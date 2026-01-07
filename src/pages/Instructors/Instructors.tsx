import React from "react";
import { useLoaderData } from "react-router-dom";
import InstructorCard from "../../components/common/InstructorCard";
import MiddleAlign from "../../components/common/MiddleAlign";
import SectionHeader from "../../components/common/SectionHeader";
import SectionImgBg from "../../components/common/SectionImgBg";
import { Instructor } from "../../types";

const Instructors: React.FC = () => {
  const teachers = useLoaderData() as Instructor[];
  return (
    <SectionImgBg bg_img={"https://images.unsplash.com/photo-1629813134918-dc2983570216?auto=format&fit=crop&q=80&w=2000"}>
      <SectionHeader
        heading="Our Masters"
        subHeading="Training under world-class instructors dedicated to the art."
      ></SectionHeader>
      <MiddleAlign>
        <div className="flex flex-col gap-12 pb-20">
          <div className="max-w-4xl mx-auto text-center glass-card p-10">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Guardians of Martial Arts Excellence
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Our summer camp stands as a sanctuary of learning, growth, and self-discovery. 
              Under the guidance of esteemed martial arts masters, we invite you to embark 
              on a transformative journey. Each master embodies the true essence of 
              martial arts—discipline, respect, and resilience—serving as a living 
              testament to the power of dedication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {teachers.map((item, index) => {
              return <InstructorCard key={index} item={item} email={true} />;
            })}
          </div>
        </div>
      </MiddleAlign>
    </SectionImgBg>
  );
};

export default Instructors;
