import Login from "../features/auth/ui/pages/Login";
import Register from "../features/auth/ui/pages/Register";

const authRoutes = [
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    }
]

export default authRoutes;