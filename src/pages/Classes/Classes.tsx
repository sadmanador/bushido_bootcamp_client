import React from "react";
import { useLoaderData } from "react-router-dom";
import ClassCard from "../../components/common/ClassCard";
import MiddleAlign from "../../components/common/MiddleAlign";
import SectionHeader from "../../components/common/SectionHeader";
import SectionImgBg from "../../components/common/SectionImgBg";
import { ClassItem } from "../../types";

const Classes: React.FC = () => {
  const classes = useLoaderData() as ClassItem[];

  return (
    <div>
      <SectionImgBg
        bg_img={
          "https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=2000"
        }
      >
        <SectionHeader
          heading="Classes"
          subHeading="Build Confidence and Discipline, Excel in Martial Arts Classes"
        />
        <MiddleAlign>
          <div className="flex flex-wrap justify-center gap-6 pb-12">
            {classes.map((item, index) => {
              return <ClassCard key={index} item={item} />;
            })}
          </div>
        </MiddleAlign>
      </SectionImgBg>
    </div>
  );
};

export default Classes;
