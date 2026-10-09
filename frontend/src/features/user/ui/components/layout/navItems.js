import {
  FiActivity,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiSettings,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

export const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: FiGrid, to: "/dashboard/user" },
      { label: "My Attendance", icon: FiCalendar },
      { label: "Workouts", icon: FiActivity },
      { label: "Classes", icon: FiUsers },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Progress", icon: FiTrendingUp },
      { label: "Payments", icon: FiCreditCard },
      { label: "Settings", icon: FiSettings },
    ],
  },
];
