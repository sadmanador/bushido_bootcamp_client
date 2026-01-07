import React from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import SectionImgBg from "../../../components/common/SectionImgBg";

const OurPartners: React.FC = () => {
  return (
    <SectionImgBg
      bg_img={
        "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2000"
      }
    >
      <div className="py-20">
        <SectionHeader
          heading={"Our Honored Partners"}
          subHeading={"Proudly collaborating with world-class organizations"}
        ></SectionHeader>
        <div className="flex flex-wrap justify-center gap-12 mt-12 px-4">
          <div className="avatar grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
            <div className="w-24 lg:w-40 rounded-xl">
              <img src="assets/image/partner/nba.png" alt="NBA" />
            </div>
          </div>
          <div className="avatar grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
            <div className="w-24 lg:w-40 rounded-xl">
              <img src="assets/image/partner/harvard.svg.png" alt="Harvard" />
            </div>
          </div>
          <div className="avatar grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
            <div className="w-24 lg:w-40 rounded-xl">
              <img src="assets/image/partner/nfl.gif" alt="NFL" />
            </div>
          </div>
          <div className="avatar grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
            <div className="w-24 lg:w-40 rounded-xl">
              <img src="assets/image/partner/ufc.jpg" alt="UFC" />
            </div>
          </div>
        </div>
      </div>
    </SectionImgBg>
  );
};

export default OurPartners;
