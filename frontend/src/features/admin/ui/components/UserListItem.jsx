import { Badge } from "../../../../components/ui";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GM";

const UserListItem = ({ user, actions }) => (
  <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-3">
      {user.profilePic?.url ? (
        <img
          src={user.profilePic.url}
          alt=""
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-line"
        />
      ) : (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-volt/15 text-sm font-semibold text-volt ring-1 ring-volt/25">
          {getInitials(user.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">
          {user.name}
        </p>
        <p className="truncate text-xs text-muted">
          +91 {user.phoneNumber} · Age {user.age}
        </p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
      <Badge variant="info">
        <span className="capitalize">{user.role}</span>
      </Badge>
      <Badge variant={user.isAuthorized ? "success" : "warning"}>
        {user.isAuthorized ? "Authorized" : "Pending"}
      </Badge>
      {actions}
    </div>
  </li>
);

export default UserListItem;
