import {
    AiFillControl,
    AiFillGold,
    AiOutlineFileAdd,
    AiOutlineHome,
    AiOutlineUserSwitch,
} from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { ImBook, ImBooks } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import DarkThemeToggle from "../navbar/DarkThemeToggle";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();



  return (
    <div className="drawer lg:drawer-open bg-base-300 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-6 lg:p-10">
        {/* Mobile Navbar/Header */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-slate-800 p-4 rounded-2xl shadow-lg border border-white/10">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-circle text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </label>
          <span className="text-bushido-red font-bold text-xl russo-one-regular">BUSHIDO</span>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <div className="flex-grow">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="w-80 h-full bg-slate-900 p-6 flex flex-col shadow-2xl border-r border-white/5">
          <div className="mb-10 flex items-center gap-3">
             <div className="w-12 h-12 bg-bushido-red rounded-xl flex items-center justify-center shadow-lg shadow-bushido-red/20 rotate-3">
                <span className="text-white font-black text-2xl -rotate-3">B</span>
             </div>
             <div>
                <h1 className="text-white font-black text-xl leading-none">BUSHIDO</h1>
                <p className="text-slate-400 text-xs font-medium tracking-widest mt-1 uppercase">Bootcamp LMS</p>
             </div>
          </div>

          <ul className="menu p-0 w-full space-y-2 flex-grow">
            {isInstructor ? (
              <>
                <li className="menu-title text-slate-500 uppercase text-xs tracking-widest mb-2 px-4">Instructor</li>
                <li>
                  <NavLink to="addAClass" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <AiOutlineFileAdd className="text-xl" />
                    <span className="font-medium">Add a Class</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myClasses" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <AiFillGold className="text-xl" />
                    <span className="font-medium">My Classes</span>
                  </NavLink>
                </li>
              </>
            ) : isAdmin ? (
              <>
                <li className="menu-title text-slate-500 uppercase text-xs tracking-widest mb-2 px-4">Admin</li>
                <li>
                  <NavLink to="manageClasses" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <AiFillControl className="text-xl" />
                    <span className="font-medium">Manage Classes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manageUsers" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <AiOutlineUserSwitch className="text-xl" />
                    <span className="font-medium">Manage Users</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="menu-title text-slate-500 uppercase text-xs tracking-widest mb-2 px-4">Student</li>
                <li>
                  <NavLink to="mySelectedClasses" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <ImBooks className="text-xl" />
                    <span className="font-medium">Selected Classes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myEnrolledClasses" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <ImBook className="text-xl" />
                    <span className="font-medium">Enrolled Classes</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="paymentHistory" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-bushido-red text-white shadow-lg shadow-bushido-red/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <MdPayment className="text-xl" />
                    <span className="font-medium">Payment History</span>
                  </NavLink>
                </li>
              </>
            )}

            <div className="h-px bg-white/5 my-6 mx-4"></div>

            <li className="menu-title text-slate-500 uppercase text-xs tracking-widest mb-2 px-4">Navigation</li>
            <li>
              <NavLink to="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                <AiOutlineHome className="text-xl" />
                <span className="font-medium">Go Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                <FaClipboardList className="text-xl" />
                <span className="font-medium">View All Classes</span>
              </NavLink>
            </li>
          </ul>

          <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 text-sm font-medium">Appearance</span>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
