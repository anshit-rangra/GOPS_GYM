import { useState } from "react";
import { Link } from "react-router";
import {
  FiBarChart2,
  FiRefreshCw,
  FiTrash2,
  FiUserX,
  FiUsers,
} from "react-icons/fi";
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Skeleton,
} from "../../../../components/ui";
import useAsync from "../../../../lib/hooks/useAsync";
import { getApiErrorMessage } from "../../../../lib/api/errors";
import { showError, showSuccess } from "../../../../lib/toast/toast";
import {
  deleteUser,
  fetchAuthorizedUsers,
  unauthorizeUser,
} from "../../api/adminApi";
import UserListItem from "../components/UserListItem";

const AdminMembers = () => {
  const { status, data, error, refetch } = useAsync(
    () => fetchAuthorizedUsers({ limit: 100, skip: 0 }),
    [],
  );
  const [busyId, setBusyId] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const users = data?.data?.users ?? [];

  const runAction = async () => {
    if (!confirm) return;
    const { type, user } = confirm;
    setBusyId(user._id);
    try {
      if (type === "unauthorize") {
        await unauthorizeUser(user._id);
        showSuccess(`${user.name} is no longer authorized`);
      } else {
        await deleteUser(user._id);
        showSuccess(`${user.name} was deleted`);
      }
      setConfirm(null);
      await refetch();
    } catch (err) {
      showError(getApiErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Members</h1>
          <p className="text-sm text-muted">
            Authorized members with access to the gym.
          </p>
        </div>
        <Button variant="night" size="small" onClick={refetch}>
          <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {status === "loading" ? (
        <Skeleton className="h-64 w-full" />
      ) : status === "error" ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : users.length === 0 ? (
        <EmptyState
          icon={FiUsers}
          title="No members yet"
          description="Authorize pending requests to add members."
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
          {users.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              actions={
                <>
                  <Link
                    to={`/dashboard/admin/members/${user._id}`}
                    state={{ user }}
                  >
                    <Button size="small" variant="night">
                      <FiBarChart2 className="h-4 w-4" aria-hidden="true" />
                      Attendance
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    variant="night"
                    onClick={() => setConfirm({ type: "unauthorize", user })}
                  >
                    <FiUserX className="h-4 w-4" aria-hidden="true" />
                    Revoke
                  </Button>
                  <Button
                    size="small"
                    variant="night"
                    onClick={() => setConfirm({ type: "delete", user })}
                  >
                    <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </>
              }
            />
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(confirm)}
        title={
          confirm?.type === "delete" ? "Delete account" : "Revoke access"
        }
        description={
          confirm?.type === "delete"
            ? `Permanently delete ${confirm?.user?.name} and their profile photo? This cannot be undone.`
            : `Revoke access for ${confirm?.user?.name}? They will no longer be able to sign in until authorized again.`
        }
        confirmLabel={confirm?.type === "delete" ? "Delete" : "Revoke"}
        tone={confirm?.type === "delete" ? "danger" : "accent"}
        loading={busyId === confirm?.user?._id}
        onConfirm={runAction}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
};

export default AdminMembers;
