import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useBusket from "../../../hooks/useBusket";
import useInstructor from "../../../hooks/useInstructor";

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth();
  const { busket } = useBusket();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const navOptions = (
    <>
      <li className="list-none">
        <NavLink to="/" className={({ isActive }) => `flex items-center px-4 py-2 text-lg font-medium transition-all duration-300 hover:text-bushido-red ${isActive ? 'text-bushido-red' : 'text-white'}`}>Home</NavLink>
      </li>
      <li className="list-none">
        <NavLink to="/classes" className={({ isActive }) => `flex items-center px-4 py-2 text-lg font-medium transition-all duration-300 hover:text-bushido-red ${isActive ? 'text-bushido-red' : 'text-white'}`}>Classes</NavLink>
      </li>
      <li className="list-none">
        <NavLink to="/instructors" className={({ isActive }) => `flex items-center px-4 py-2 text-lg font-medium transition-all duration-300 hover:text-bushido-red ${isActive ? 'text-bushido-red' : 'text-white'}`}>Instructors</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar glass-nav fixed top-0 w-full z-50 lg:px-24 transition-all duration-500">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-white/10 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow-2xl bg-slate-800 rounded-2xl w-64 border border-white/10 space-y-2 backdrop-blur-xl"
          >
            {navOptions}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="avatar hidden lg:flex hover:scale-105 transition-transform">
            <div className="w-12 rounded-xl ring ring-bushido-red/30 ring-offset-base-100 ring-offset-2">
              <img src="assets/image/logo/logo.jpg" alt="Bushido Logo" />
            </div>
          </Link>
          <Link to="/" className="normal-case text-xl lg:text-2xl font-black text-bushido-red russo-one-regular leading-none hover:opacity-80 transition-opacity">
            BUSHIDO <br /> <span className="text-white">BOOTCAMP</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center space-x-1">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-2 lg:gap-4">
        {user?.email ? (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom ring-2 ring-white/10 hover:ring-bushido-red/50 transition-all"
                data-tip={user?.displayName || ""}
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || ""} alt="Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-2xl bg-slate-800 rounded-xl w-52 border border-white/10 backdrop-blur-xl"
              >
                <li>
                  <a className="py-3 px-4 hover:bg-bushido-red/20 transition-colors rounded-lg">Profile</a>
                </li>
                <li>
                  <a className="py-3 px-4 hover:bg-bushido-red/20 transition-colors rounded-lg">Settings</a>
                </li>
                <li>
                  <button onClick={() => logOut()} className="py-3 px-4 text-red-400 hover:bg-red-400/10 transition-colors rounded-lg">Logout</button>
                </li>
              </ul>
            </div>
            <div className="hidden sm:block">
              {isAdmin ? (
                <Link
                  to="dashboard/manageClasses"
                  className="btn btn-premium btn-sm h-auto py-2 leading-tight"
                >
                  Admin <br /> Dashboard
                </Link>
              ) : isInstructor ? (
                <Link
                  to="dashboard/myClasses"
                  className="btn btn-premium btn-sm h-auto py-2 leading-tight"
                >
                  Instructor <br /> Dashboard
                </Link>
              ) : (
                <Link
                  to="dashboard/mySelectedClasses"
                  className="btn btn-premium btn-sm h-auto py-2 leading-tight flex items-center gap-2"
                >
                  Dashboard
                  <div className="badge badge-sm bg-white/20 border-none text-white">{busket?.length || 0}</div>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-premium px-8 rounded-full font-bold uppercase tracking-wider text-sm transition-all">
              Login
            </button>
          </Link>
        )}
        <div className="divider divider-horizontal mx-1 opacity-20"></div>
      </div>
    </div>
  );
};

export default Navbar;
