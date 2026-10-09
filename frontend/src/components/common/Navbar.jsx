import { FiMenu, FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { Button } from "../ui";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 md:px-6 bg-bg-primary border-b border-border shadow-sm">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="p-2 rounded-[var(--radius)] text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      <span className="text-lg md:text-xl font-bold tracking-tight text-text-primary">
        Gops<span className="text-primary">Gym</span>
      </span>

      <div className="hidden md:flex items-center flex-1 max-w-md ml-4 relative">
        <FiSearch className="absolute left-3 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search members, plans, trainers..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-[var(--radius)] bg-bg-secondary border border-border text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-[var(--radius)] text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
        >
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        </button>

        <Button size="small" className="hidden sm:inline-flex">
          + New Member
        </Button>

        <button
          type="button"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-bg-secondary transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
            A
          </span>
          <span className="hidden md:block text-sm font-medium text-text-primary text-left leading-tight">
            Anshit
            <span className="block text-xs font-normal text-text-secondary">Admin</span>
          </span>
          <FiChevronDown className="hidden md:block w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
