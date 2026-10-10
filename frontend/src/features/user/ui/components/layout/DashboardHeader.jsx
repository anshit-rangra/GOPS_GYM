import { FiCalendar, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserProfileMenu from "./UserProfileMenu";

const getGreeting = (date) => {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardHeader = ({ theme, onToggleTheme, onOpenSidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(now);
  const firstName = user?.name?.split(" ")[0] || "there";
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="rounded-(--radius) p-2 text-muted transition-colors hover:bg-panel-2 hover:text-ink lg:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-ink sm:text-base">
            {getGreeting(now)}, {firstName}
          </h1>
          <p className="hidden text-xs text-muted sm:block">
            {user?.isAuthorized === false
              ? "Your account is awaiting admin approval"
              : "Track your consistency and keep the streak alive"}
          </p>
        </div>

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

          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
