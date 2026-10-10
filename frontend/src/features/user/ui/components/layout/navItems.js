import {
  FiCalendar,
  FiGrid,
  FiShield,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

export const getNavSections = (user) => {
  const sections = [
    {
      title: "Member",
      items: [
        { label: "Dashboard", icon: FiGrid, to: "/dashboard/user", end: true },
        {
          label: "My Attendance",
          icon: FiCalendar,
          to: "/dashboard/user/attendance",
        },
        { label: "Profile", icon: FiUser, to: "/dashboard/user/profile" },
      ],
    },
  ];

  if (user?.role === "admin") {
    sections.push({
      title: "Administration",
      items: [
        {
          label: "Overview",
          icon: FiShield,
          to: "/dashboard/admin",
          end: true,
        },
        {
          label: "Pending Requests",
          icon: FiUserCheck,
          to: "/dashboard/admin/pending",
        },
        {
          label: "Members",
          icon: FiUsers,
          to: "/dashboard/admin/members",
        },
      ],
    });
  }

  return sections;
};
