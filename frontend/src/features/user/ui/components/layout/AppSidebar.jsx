import { NavLink } from "react-router";
import { FiLogOut, FiTrendingUp, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getNavSections } from "./navItems";
import { logoutThunk } from "../../../../auth/state/authThunk";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GM";

const AppSidebar = ({ open, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sections = getNavSections(user);

  const handleLogout = () => {
    dispatch(logoutThunk());
    onClose?.();
    navigate("/auth/login", { replace: true });
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-line bg-night-soft transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <NavLink
            to="/dashboard/user"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-on-volt">
              <FiTrendingUp className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-base font-bold tracking-tight text-ink">
              GOPS<span className="text-volt">GYM</span>
            </span>
          </NavLink>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-(--radius) p-2 text-muted transition-colors hover:bg-panel-2 hover:text-ink lg:hidden"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map(({ label, icon: Icon, to, end }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-(--radius) px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-volt/12 text-volt"
                            : "text-muted hover:bg-panel-2 hover:text-ink"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center gap-3 rounded-xl bg-panel p-3">
            {user?.profilePic?.url ? (
              <img
                src={user.profilePic.url}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-volt/30"
              />
            ) : (
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-volt/15 text-xs font-semibold text-volt ring-1 ring-volt/30">
                {getInitials(user?.name)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {user?.name || "Member"}
              </p>
              <p className="truncate text-xs capitalize text-muted">
                {user?.role || "user"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign out"
              className="rounded-(--radius) p-2 text-muted transition-colors hover:bg-error/10 hover:text-error"
            >
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
