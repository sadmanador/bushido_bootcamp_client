import { useLoaderData } from "react-router-dom";
import MiddleAlign from "../../components/common/MiddleAlign";
import SectionHeader from "../../components/common/SectionHeader";
import SectionImgBg from "../../components/common/SectionImgBg";
import ClassCard from "./ClassCard";

const Classes = () => {
  const classes = useLoaderData();


  return (
    <div>
      <SectionImgBg
        bg_img={
          "https://wallpapercosmos.com/w/full/6/e/6/1118575-3008x2000-desktop-hd-martial-art-wallpaper-image.jpg"
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
