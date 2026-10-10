import UserDashboard from "../../features/user/ui/pages/UserDashboard";
import UserAttendance from "../../features/user/ui/pages/UserAttendance";
import UserProfile from "../../features/user/ui/pages/UserProfile";

const userRoutes = [
  {
    path: "user",
    element: <UserDashboard />,
  },
  {
    path: "user/attendance",
    element: <UserAttendance />,
  },
  {
    path: "user/profile",
    element: <UserProfile />,
  },
];

export default userRoutes;
