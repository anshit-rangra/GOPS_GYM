import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import authRoutes from "./authRoutes";
import userRoutes from "./protected/userRoutes";
import adminRoutes from "./protected/adminRoutes";
import {
  RequireAuth,
  RedirectIfAuthenticated,
  RoleHomeRedirect,
} from "./guards";
import Home from "../features/home/ui/pages/Home";
import NotFound from "../components/common/NotFound";

const guardedAuthRoutes = authRoutes.map((route) => ({
  ...route,
  element: <RedirectIfAuthenticated>{route.element}</RedirectIfAuthenticated>,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: guardedAuthRoutes,
  },
  {
    path: "/dashboard",
    element: <RequireAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <RoleHomeRedirect /> },
          ...userRoutes,
          ...adminRoutes,
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
