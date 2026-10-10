import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FiInfo,
  FiLogOut,
  FiRefreshCw,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { Badge, Button, Card, ErrorState } from "../../../../components/ui";
import { fetchCurrentUser } from "../../../auth/api/authApi";
import { setUser } from "../../../auth/state/authSlice";
import { logoutThunk } from "../../../auth/state/authThunk";
import { getApiErrorMessage } from "../../../../lib/api/errors";
import { showError, showSuccess } from "../../../../lib/toast/toast";

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0">
    <dt className="text-sm text-muted">{label}</dt>
    <dd className="text-sm font-medium text-ink">{value}</dd>
  </div>
);

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const body = await fetchCurrentUser();
      dispatch(setUser(body?.data?.user));
      showSuccess("Profile refreshed");
    } catch (err) {
      setError(getApiErrorMessage(err));
      showError(getApiErrorMessage(err));
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/auth/login", { replace: true });
  };

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl py-10">
        <ErrorState message="Your profile could not be loaded." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">My Profile</h1>
          <p className="text-sm text-muted">
            Your account details as stored by the gym.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="night"
            size="small"
            loading={refreshing}
            onClick={handleRefresh}
          >
            <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </Button>
          <Button variant="danger" size="small" onClick={handleLogout}>
            <FiLogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </div>

      {error && <ErrorState message={error} compact onRetry={handleRefresh} />}

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card variant="panel" padding="base" className="text-center">
          {user.profilePic?.url ? (
            <img
              src={user.profilePic.url}
              alt={user.name}
              className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-volt/40"
            />
          ) : (
            <span className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-volt/15 text-3xl font-bold text-volt ring-2 ring-volt/40">
              {user.name?.[0]?.toUpperCase() || "G"}
            </span>
          )}
          <h2 className="mt-4 text-lg font-bold text-ink">{user.name}</h2>
          <p className="text-sm text-muted">+91 {user.phoneNumber}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="info" icon={FiUser}>
              <span className="capitalize">{user.role}</span>
            </Badge>
            <Badge
              variant={user.isAuthorized ? "success" : "warning"}
              icon={FiShield}
            >
              {user.isAuthorized ? "Authorized" : "Pending approval"}
            </Badge>
          </div>
        </Card>

        <div className="space-y-6">
          <Card variant="panel" padding="base">
            <h2 className="text-base font-semibold text-ink">Account details</h2>
            <dl className="mt-3">
              <DetailRow label="Full name" value={user.name || "—"} />
              <DetailRow label="Age" value={user.age ?? "—"} />
              <DetailRow label="Phone number" value={`+91 ${user.phoneNumber}`} />
              <DetailRow
                label="Role"
                value={<span className="capitalize">{user.role}</span>}
              />
              <DetailRow
                label="Account status"
                value={
                  user.isAuthorized
                    ? "Approved by admin"
                    : "Awaiting admin approval"
                }
              />
              <DetailRow label="Member ID" value={user._id} />
            </dl>
          </Card>

          <div className="flex items-start gap-3 rounded-xl border border-dashed border-line bg-panel-2/40 p-4">
            <FiInfo
              className="mt-0.5 h-4 w-4 shrink-0 text-muted"
              aria-hidden="true"
            />
            <p className="text-xs text-muted">
              Editing your profile, changing your password, or replacing your
              profile photo is not currently supported by the gym backend. There
              is no profile-update endpoint available, so these details are
              read-only. Ask the gym admin if something needs to change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
