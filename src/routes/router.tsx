import { createBrowserRouter } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import DashBoard from "../components/layout/dashboard/DashBoard";
import Main from "../components/layout/main/Main";
import Classes from "../pages/Classes/Classes";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddAClass from "../pages/Dashboard/Instructor/AddAClass/AddAClass";
import MyClassEdit from "../pages/Dashboard/Instructor/MyClasses/MyClassEdit";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses/MyEnrolledClasses";
import MySelectedClasses from "../pages/Dashboard/Student/MySelectedClasses/MySelectedClasses";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory/PaymentHistory";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors/Instructors";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Register from "../pages/Register/Register";
import AdminRoute from "./guards/AdminRoute";
import InstructorRoute from "./guards/InstructorRoute";
import PrivateRoute from "./guards/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {
          const res = await axiosPublic.get("/classes/top-six");
          return res.data;
        },
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        loader: async () => {
          const res = await axiosPublic.get("/classes");
          return res.data;
        },
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
        loader: async () => {
          const res = await axiosPublic.get("/classes");
          return res.data;
        },
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "mySelectedClasses",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "myEnrolledClasses",
        element: <MyEnrolledClasses></MyEnrolledClasses>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "mySelectedClasses/payment/:id",
        element: <Payment />,
      },
      {
        path: "addAClass",
        element: (
          <InstructorRoute>
            <AddAClass></AddAClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses/:id",
        element: (
          <InstructorRoute>
            <MyClassEdit />
          </InstructorRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
