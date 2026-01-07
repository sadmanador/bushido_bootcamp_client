import Gallery from "./home/Gallery/Gallery";
import HeaderPoster from "./home/HeaderPoster/HeaderPoster";
import Message from "./home/Message/Message";
import OurPartners from "./home/OurPartners/OurPartners";
import TopClasses from "./home/TopClasses/TopClasses";
import TopInstructor from "./home/TopInstructor/TopInstructor";

const Home = () => {
  return (
    <>
      <HeaderPoster></HeaderPoster>
      <TopClasses></TopClasses>
      <OurPartners/>
      <TopInstructor></TopInstructor>
      <Gallery/>
      <Message/>
    </>
  );
};

export default Home;
