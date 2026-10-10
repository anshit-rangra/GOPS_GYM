import { useState } from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../features/user/ui/components/layout/DashboardHeader";
import AppSidebar from "../features/user/ui/components/layout/AppSidebar";
import useTheme from "../features/user/hooks/useTheme";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`app-shell ${
        theme === "dark" ? "theme-dark" : "theme-light"
      } min-h-screen bg-night text-ink`}
    >
      <div className="flex min-h-screen">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <main className="flex-1 overflow-x-clip px-4 py-6 pb-16 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
