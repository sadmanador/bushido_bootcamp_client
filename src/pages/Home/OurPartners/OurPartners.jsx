import SectionHeader from "../../../components/common/SectionHeader";
import SectionImgBg from "../../../components/common/SectionImgBg";

const OurPartners = () => {
  return (
    <SectionImgBg
      bg_img={
        "https://images.pexels.com/photos/3695238/pexels-photo-3695238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    >
      <div className="">
        <SectionHeader
          heading={"Our honored partners"}
          subHeading={"Lots of families companies"}
        ></SectionHeader>
        <div className="flex lg:flex-row flex-wrap flex-col justify-center gap-9 pb-10 pl-32 lg:pl-0">
          <div className="avatar">
            <div className="w-24 lg:w-72 rounded-full">
              <img src="assets/image/partner/nba.png" alt="" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 lg:w-72 rounded-full">
              <img src="assets/image/partner/harvard.svg.png" alt="" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 lg:w-72 rounded-full">
              <img src="assets/image/partner/nfl.gif" alt="" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 lg:w-72 rounded-full">
              <img src="assets/image/partner/ufc.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </SectionImgBg>
  );
};

export default OurPartners;
