import { Link } from "react-router";
import {
  FiChevronRight,
  FiClock,
  FiShield,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import {
  Card,
  ErrorState,
  Skeleton,
} from "../../../../components/ui";
import useAsync from "../../../../lib/hooks/useAsync";
import {
  fetchAuthorizedUsers,
  fetchUnauthorizedUsers,
} from "../../api/adminApi";

const StatTile = ({ icon: Icon, label, value, hint, to }) => {
  const content = (
    <Card
      variant="panel"
      padding="base"
      className="h-full transition-colors hover:border-volt/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
          <p className="mt-1 text-xs text-muted">{hint}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-volt/10 text-volt">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </Card>
  );

  return to ? (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
};

const AdminDashboard = () => {
  const { status, data, error, refetch } = useAsync(
    () =>
      Promise.all([
        fetchAuthorizedUsers({ limit: 100, skip: 0 }),
        fetchUnauthorizedUsers({ limit: 100, skip: 0 }),
      ]),
    [],
  );

  if (status === "loading") {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-6" aria-hidden="true">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto w-full max-w-3xl py-10">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  const [authorizedBody, unauthorizedBody] = data;
  const authorized = authorizedBody?.data?.users ?? [];
  const pending = unauthorizedBody?.data?.users ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Admin Overview</h1>
        <p className="text-sm text-muted">
          Manage gym members and approve new registrations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          icon={FiUsers}
          label="Members"
          value={authorized.length}
          hint="Authorized accounts"
          to="/dashboard/admin/members"
        />
        <StatTile
          icon={FiClock}
          label="Pending approvals"
          value={pending.length}
          hint="Waiting for review"
          to="/dashboard/admin/pending"
        />
        <StatTile
          icon={FiShield}
          label="Total accounts"
          value={authorized.length + pending.length}
          hint="Members + pending"
        />
      </div>

      <Card variant="panel" padding="base">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FiUserCheck className="h-5 w-5 text-volt" aria-hidden="true" />
            <h2 className="text-base font-semibold text-ink">
              Latest pending requests
            </h2>
          </div>
          <Link
            to="/dashboard/admin/pending"
            className="flex items-center gap-1 text-xs font-medium text-volt hover:underline"
          >
            View all
            <FiChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {pending.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-line bg-panel-2/40 px-4 py-6 text-center text-sm text-muted">
            No pending requests. You&apos;re all caught up.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {pending.slice(0, 5).map((user) => (
              <li key={user._id} className="flex items-center gap-3 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-panel-2 text-xs font-semibold text-muted">
                  {user.name?.[0]?.toUpperCase() || "?"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted">+91 {user.phoneNumber}</p>
                </div>
                <Link
                  to="/dashboard/admin/pending"
                  className="text-xs font-medium text-volt hover:underline"
                >
                  Review
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;
