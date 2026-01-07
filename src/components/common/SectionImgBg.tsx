import React, { ReactNode } from "react";

interface SectionImgBgProps {
  children: ReactNode;
  bg_img: string;
}

const SectionImgBg: React.FC<SectionImgBgProps> = ({ children, bg_img }) => {
  return (
    <div
    className="max-w-7xl mx-auto"
      style={{
        backgroundImage: `url('${bg_img}')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize:"cover"
      }}
    >
      {children}
    </div>
  );
};

export default SectionImgBg;
