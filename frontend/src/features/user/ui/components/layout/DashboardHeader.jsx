import { NavLink } from "react-router";
import {
  FiBell,
  FiCalendar,
  FiCreditCard,
  FiMoon,
  FiSun,
  FiTrendingUp,
} from "react-icons/fi";
import useDropdown from "../../../hooks/useDropdown";
import UserProfileMenu from "./UserProfileMenu";
import { NAV_SECTIONS } from "./navItems";
import { mockMember, mockNotifications } from "../../../data/mockMember";

const NOTIFICATION_ICONS = {
  streak: FiTrendingUp,
  class: FiCalendar,
  billing: FiCreditCard,
};

const HEADER_NAV = NAV_SECTIONS.flatMap((section) => section.items).slice(0, 4);

const getGreeting = (date) => {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardHeader = ({ theme, onToggleTheme }) => {
  const {
    open: notificationsOpen,
    setOpen: setNotificationsOpen,
    ref: notificationsRef,
  } = useDropdown();
  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(now);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/dashboard/user"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-on-volt">
            <FiTrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="hidden text-base font-bold tracking-tight text-ink sm:inline">
            GOPS<span className="text-volt">GYM</span>
          </span>
        </NavLink>

        <span className="hidden h-6 w-px bg-line lg:block" aria-hidden="true" />

        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate text-sm font-semibold text-ink">
            {getGreeting(now)}, {mockMember.firstName}
          </h1>
        </div>

        <nav className="ml-6 hidden items-center gap-1 xl:flex">
          {HEADER_NAV.map(({ label, icon: Icon, to }) =>
            to ? (
              <NavLink
                key={label}
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-volt/12 font-medium text-volt"
                      : "text-muted hover:bg-panel-2 hover:text-ink"
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            ) : (
              <button
                key={label}
                type="button"
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-panel-2 hover:text-ink"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-xs text-muted md:inline-flex">
            <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
            {dateLabel}
          </span>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
            className="rounded-full p-2 text-muted transition-colors hover:bg-panel-2 hover:text-ink"
          >
            {theme === "dark" ? (
              <FiSun className="h-5 w-5" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
          </button>

          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen((value) => !value)}
              aria-label="Notifications"
              aria-haspopup="menu"
              aria-expanded={notificationsOpen}
              className="relative rounded-full p-2 text-muted transition-colors hover:bg-panel-2 hover:text-ink"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-volt ring-2 ring-night" />
            </button>

            {notificationsOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-line bg-panel shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-sm font-semibold text-ink">Notifications</p>
                  <span className="rounded-full bg-volt/12 px-2 py-0.5 text-[11px] font-medium text-volt">
                    {mockNotifications.length} new
                  </span>
                </div>
                <ul className="max-h-72 overflow-y-auto">
                  {mockNotifications.map((notification) => {
                    const Icon = NOTIFICATION_ICONS[notification.type] || FiBell;
                    return (
                      <li
                        key={notification.id}
                        className="flex gap-3 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-panel-2"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-volt/10 text-volt">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-ink">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted">
                            {notification.body}
                          </p>
                          <p className="mt-1 text-[11px] text-muted">
                            {notification.time}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className="w-full px-4 py-2.5 text-center text-xs font-medium text-volt transition-colors hover:bg-panel-2"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
