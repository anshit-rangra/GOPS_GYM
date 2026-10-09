import { Card } from "../../../../../components/ui";

const StatCard = ({ label, value, hint, icon: Icon, progress }) => (
  <Card
    variant="panel"
    padding="base"
    className="group transition-colors hover:border-volt/30"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </p>
        <p className="mt-2 truncate text-2xl font-bold text-ink">{value}</p>
        <p className="mt-1 text-xs text-muted">{hint}</p>
      </div>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-volt/10 text-volt transition-colors group-hover:bg-volt/15">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>

    {typeof progress === "number" && (
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-panel-2"
        role="progressbar"
        aria-label={`${label} ${progress}%`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-volt"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
  </Card>
);

export default StatCard;
