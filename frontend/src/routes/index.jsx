import { createBrowserRouter } from "react-router";
import authRoutes from "./authRoutes";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import userRoutes from "./protected/userRoutes";
import adminRoutes from "./protected/adminRoutes";
import Home from "../features/home/ui/pages/Home"


const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Home />
    },

    { // public { auth } routes
        path:"/auth",
        element: <AuthLayout />,
        children: authRoutes
    },
    { // private { authorized } routes
        path: "/dashboard",
        children: [
            { // member dashboard shell
                element: <DashboardLayout />,
                children: userRoutes
            },
            { // admin dashboard shell
                element: <MainLayout />,
                children: adminRoutes
            }
        ]
    }

])

export default router;