import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

import Registrationform from "../components/Registrationform";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import TenantHome from "../pages/home/tenantHome";
import Loginform from "../components/Loginform";
import Post from "../components/Post";
import PostCard from "../components/PostCard";
import Enquiry from "../components/Enquiry";
import Tenantcards from "../components/Tenantcards";
import Cardowner from "../components/Cardowner";
import Ownercards from "../components/Ownercards";
import Navbar from "../components/Navbar";
import EditProperty from "../components/EditProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registrationform />,
  },
  {
    path: "/dashboard",
    element: <TenantHome />,
  },
  {
    path: "/owner/dashboard",
    element: <Ownercards />,
  },
  {
    path: "/owner/addproperty",
    element: <Post />,
  },
  {
    path: "/owner/editproperty/:id",
    element: <EditProperty />,
  },
  {
    path: "/enquiry/:id",
    element: <Enquiry />,
  },

]);

export default router;
