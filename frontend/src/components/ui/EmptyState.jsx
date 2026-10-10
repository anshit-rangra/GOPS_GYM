import { FiInbox } from "react-icons/fi";

const EmptyState = ({ icon: Icon = FiInbox, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-panel-2/40 px-6 py-10 text-center">
    <span className="grid h-12 w-12 place-items-center rounded-full bg-panel-2 text-muted">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
    <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
    {description && (
      <p className="mt-1 max-w-sm text-xs text-muted">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
