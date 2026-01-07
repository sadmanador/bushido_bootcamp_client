import { Link, useLoaderData } from "react-router-dom";
import ClassCard from "../../../components/common/ClassCard";
import SectionHeader from "../../../components/common/SectionHeader";

const TopClasses = () => {
  const classes = useLoaderData();

  return (
    <div className="bg-slate-900 pb-24">
      <SectionHeader
        heading="Our Premium Classes"
        subHeading="Experience the world's most disciplined training programs"
      />
      
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.slice(0, 6).map((item, index) => (
            <ClassCard key={index} item={item} />
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Link to='/classes' className="group relative inline-flex items-center gap-2 px-10 py-4 bg-white/5 hover:bg-bushido-red text-white font-bold rounded-full border border-white/10 transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Explore All Classes</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopClasses;
