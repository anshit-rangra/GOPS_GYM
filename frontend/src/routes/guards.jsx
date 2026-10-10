import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { getRoleHome } from "../lib/auth/roles";

export const RequireAuth = () => {
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="app-shell theme-dark">
        <Loader fullscreen label="Restoring your session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const RequireAdmin = () => {
  const user = useSelector((state) => state.auth.user);

  if (user?.role !== "admin") {
    return <Navigate to={getRoleHome(user)} replace />;
  }

  return <Outlet />;
};

export const RedirectIfAuthenticated = ({ children }) => {
  const { initialized, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  if (initialized && isAuthenticated) {
    return <Navigate to={getRoleHome(user)} replace />;
  }

  return children;
};

export const RoleHomeRedirect = () => {
  const user = useSelector((state) => state.auth.user);

  return <Navigate to={getRoleHome(user)} replace />;
};
