import {
  FiChevronDown,
  FiCreditCard,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import useDropdown from "../../../hooks/useDropdown";
import { mockMember } from "../../../data/mockMember";

const MENU_ITEMS = [
  { label: "My Profile", icon: FiUser },
  { label: "Account Settings", icon: FiSettings },
  { label: "Billing & Plan", icon: FiCreditCard },
];

const UserProfileMenu = () => {
  const {
    open: profileOpen,
    setOpen: setProfileOpen,
    ref: profileRef,
  } = useDropdown();

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
        <span className="grid h-8 w-8 place-items-center rounded-full bg-volt/15 text-xs font-semibold text-volt ring-1 ring-volt/30">
          {mockMember.initials}
        </span>
        <span className="hidden text-sm font-medium text-ink sm:block">
          {mockMember.firstName}
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
              {mockMember.fullName}
            </p>
            <p className="truncate text-xs text-muted">{mockMember.email}</p>
            <span className="mt-2 inline-flex rounded-full bg-volt/12 px-2 py-0.5 text-[11px] font-medium text-volt">
              {mockMember.plan}
            </span>
          </div>

          <ul className="p-1.5">
            {MENU_ITEMS.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-(--radius) px-3 py-2.5 text-sm text-muted transition-colors hover:bg-panel-2 hover:text-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-line p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => setProfileOpen(false)}
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
