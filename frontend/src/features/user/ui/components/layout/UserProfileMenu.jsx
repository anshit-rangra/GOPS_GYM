import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FiChevronDown,
  FiLogOut,
  FiShield,
  FiUser,
} from "react-icons/fi";
import useDropdown from "../../../hooks/useDropdown";
import { logoutThunk } from "../../../../auth/state/authThunk";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GM";

const UserProfileMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    open: profileOpen,
    setOpen: setProfileOpen,
    ref: profileRef,
  } = useDropdown();

  const firstName = user?.name?.split(" ")[0] || "Member";

  const handleLogout = () => {
    setProfileOpen(false);
    dispatch(logoutThunk());
    navigate("/auth/login", { replace: true });
  };

  const items = [
    { label: "My Profile", icon: FiUser, to: "/dashboard/user/profile" },
  ];
  if (user?.role === "admin") {
    items.push({
      label: "Admin Panel",
      icon: FiShield,
      to: "/dashboard/admin",
    });
  }

  return (
    <div className="relative" ref={profileRef}>
      <button
        type="button"
        onClick={() => setProfileOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={profileOpen}
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-full border border-transparent p-1 pr-2 transition-colors hover:border-line hover:bg-panel-2"
      >
        {user?.profilePic?.url ? (
          <img
            src={user.profilePic.url}
            alt=""
            className="h-8 w-8 rounded-full object-cover ring-1 ring-volt/30"
          />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-volt/15 text-xs font-semibold text-volt ring-1 ring-volt/30">
            {getInitials(user?.name)}
          </span>
        )}
        <span className="hidden text-sm font-medium text-ink sm:block">
          {firstName}
        </span>
        <FiChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-muted transition-transform ${
            profileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {profileOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-line bg-panel shadow-2xl"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="text-sm font-semibold text-ink">
              {user?.name || "Member"}
            </p>
            <p className="truncate text-xs text-muted">
              +91 {user?.phoneNumber}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-volt/12 px-2 py-0.5 text-[11px] font-medium capitalize text-volt">
              {user?.role || "user"}
            </span>
          </div>

          <ul className="p-1.5">
            {items.map(({ label, icon: Icon, to }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-(--radius) px-3 py-2.5 text-sm text-muted transition-colors hover:bg-panel-2 hover:text-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-t border-line p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-(--radius) px-3 py-2.5 text-sm text-error transition-colors hover:bg-error/10"
            >
              <FiLogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
