import AdminDashboard from "../../features/admin/ui/pages/AdminDashboard";
import AdminPendingUsers from "../../features/admin/ui/pages/AdminPendingUsers";
import AdminMembers from "../../features/admin/ui/pages/AdminMembers";
import AdminMemberDetail from "../../features/admin/ui/pages/AdminMemberDetail";
import { RequireAdmin } from "../guards";

const adminRoutes = [
  {
    path: "admin",
    element: <RequireAdmin />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "pending",
        element: <AdminPendingUsers />,
      },
      {
        path: "members",
        element: <AdminMembers />,
      },
      {
        path: "members/:userId",
        element: <AdminMemberDetail />,
      },
    ],
  },
];

export default adminRoutes;
