import { useState } from "react";
import { FiCheck, FiRefreshCw, FiTrash2, FiUserCheck } from "react-icons/fi";
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
  authorizeUser,
  deleteUser,
  fetchUnauthorizedUsers,
} from "../../api/adminApi";
import UserListItem from "../components/UserListItem";

const AdminPendingUsers = () => {
  const { status, data, error, refetch } = useAsync(
    () => fetchUnauthorizedUsers({ limit: 100, skip: 0 }),
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
      if (type === "authorize") {
        await authorizeUser(user._id);
        showSuccess(`${user.name} is now authorized`);
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
          <h1 className="text-xl font-bold text-ink">Pending Requests</h1>
          <p className="text-sm text-muted">
            Approve new members before they can sign in.
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
          icon={FiUserCheck}
          title="No pending requests"
          description="New registrations will show up here for approval."
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
          {users.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              actions={
                <>
                  <Button
                    size="small"
                    variant="accent"
                    loading={busyId === user._id && confirm?.type === "authorize"}
                    onClick={() => setConfirm({ type: "authorize", user })}
                  >
                    <FiCheck className="h-4 w-4" aria-hidden="true" />
                    Authorize
                  </Button>
                  <Button
                    size="small"
                    variant="night"
                    onClick={() => setConfirm({ type: "delete", user })}
                  >
                    <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
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
          confirm?.type === "delete" ? "Delete account" : "Authorize member"
        }
        description={
          confirm?.type === "delete"
            ? `Permanently delete ${confirm?.user?.name} and their profile photo? This cannot be undone.`
            : `Grant ${confirm?.user?.name} access to sign in and check in?`
        }
        confirmLabel={confirm?.type === "delete" ? "Delete" : "Authorize"}
        tone={confirm?.type === "delete" ? "danger" : "accent"}
        loading={busyId === confirm?.user?._id}
        onConfirm={runAction}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
};

export default AdminPendingUsers;
