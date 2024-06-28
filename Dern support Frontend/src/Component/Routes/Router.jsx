import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Layout";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import DashboardComp from "../Dashboard/DashboardComp";
import RepairComp from "../Repair/RepairComp";
import SupportRequestComp from "../SupportRequest/SupportRequestComp";
import SparePartComp from "../SpareParts/SparePartComp";
import Create from "../Create/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashboardComp />,
      },
      {
        path: "dashboard",
        element: <DashboardComp />,
      },
      {
        path: "repairs",
        element: <RepairComp />,
      },
      {
        path: "supportrequest",
        element: <SupportRequestComp />,
      },
      {
        path: "spareparts",
        element: <SparePartComp />,
      },
      {
        path: "create-spare-part",
        element: <Create />,
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

export { router };
