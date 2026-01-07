import React from "react";
import Swal from "sweetalert2";
import axiosPublic from "../../api/axiosPublic";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useBusket from "../../hooks/useBusket";
import useInstructor from "../../hooks/useInstructor";
import { ClassItem } from "../../types";

interface ClassCardProps {
  item: ClassItem;
}

const ClassCard: React.FC<ClassCardProps> = ({ item }) => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { user } = useAuth();
  const { refetch } = useBusket();
  const { _id, image, name, instructor, seats, price, instructor_img, enrolled } = item;

  const handleAddToBusket = async () => {
    if (user && user?.email) {
      const courseData = {
        courseId: _id,
        name,
        image,
        price,
        enrolled: "none",
        email: user?.email,
        userName: user?.displayName,
        userId: user?.uid,
      };

      try {
        const res = await axiosPublic.post("/taken-courses", courseData);
        if (res.data.message) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Course already in your list",
            text: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (res.data.insertedId) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Course added to your list",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Error adding to basket:", error);
      }
    }
  };

  const isEnrollDisabled = isAdmin || isInstructor || seats === 0 || !user;

  return (
    <div className={`group relative bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-bushido-red/20 hover:-translate-y-2 ${seats === 0 ? "bg-red-900/20" : ""}`}>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-bushido-red text-white font-bold px-4 py-1 rounded-full shadow-lg">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-12 relative">
        {/* Instructor Avatar */}
        <div className="absolute -top-10 left-8">
          <div className="w-20 h-20 rounded-2xl ring-4 ring-slate-900 overflow-hidden shadow-xl rotate-3 transition-transform duration-500 group-hover:rotate-0">
            <img src={instructor_img} alt={instructor} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-bushido-red text-xs font-bold tracking-widest uppercase mb-1">Master: {instructor}</p>
          <h2 className="text-2xl font-black text-white russo-one-regular leading-tight group-hover:text-bushido-red transition-colors">{name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Students</span>
            <span className="text-white font-bold">{enrolled} Enrolled</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Availability</span>
            <span className={`font-bold ${seats === 0 ? 'text-red-500' : 'text-emerald-400'}`}>
              {seats === 0 ? 'Full' : `${seats} Seats`}
            </span>
          </div>
        </div>
        
        <div className="mt-auto pt-6">
          <button 
            className="w-full btn-premium py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 disabled:opacity-50 disabled:grayscale"
            onClick={() => handleAddToBusket()}
            disabled={isEnrollDisabled}
          >
            {seats === 0 ? "Class Full" : "Enroll Now"}
          </button>
          {!user && (
            <p className="text-[10px] text-slate-500 mt-2 text-center italic">Login required to enroll</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
