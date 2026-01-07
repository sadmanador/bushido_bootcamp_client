import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Main;
