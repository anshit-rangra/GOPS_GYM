import { NavLink } from "react-router";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiActivity,
  FiSettings,
  FiX,
  FiHelpCircle,
} from "react-icons/fi";

const sections = [
  {
    title: "Overview",
    links: [
      { to: "/dashboard/user", label: "Dashboard", icon: FiHome },
      { to: "/dashboard/admin", label: "Members", icon: FiUsers },
    ],
  },
  {
    title: "Management",
    links: [
      { to: "#", label: "Payments", icon: FiDollarSign },
      { to: "#", label: "Classes & Schedule", icon: FiCalendar },
      { to: "#", label: "Workouts", icon: FiActivity },
    ],
  },
  {
    title: "System",
    links: [
      { to: "#", label: "Settings", icon: FiSettings },
      { to: "#", label: "Help & Support", icon: FiHelpCircle },
    ],
  },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col bg-bg-primary border-r border-border shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <span className="text-lg font-bold tracking-tight text-text-primary">
            Gops<span className="text-primary">Gym</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 rounded-[var(--radius)] text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors lg:hidden"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.links.map(({ to, label, icon: Icon }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="rounded-xl bg-bg-secondary border border-border p-4 space-y-2">
            <p className="text-sm font-semibold text-text-primary">Pro Membership</p>
            <p className="text-xs text-text-secondary">
              Unlock advanced reports and member insights.
            </p>
            <button
              type="button"
              className="w-full mt-1 py-2 text-xs font-semibold text-white bg-primary rounded-[var(--radius)] hover:bg-primary-dark transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
