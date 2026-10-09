import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiMoon,
} from "react-icons/fi";
import { Badge, Card } from "../../../../../components/ui";
import {
  STATUS_META,
  formatFullDate,
  fromISODate,
  getAttendanceStatus,
  relativeDayLabel,
} from "../../../utils/attendanceUtils";

const STATUS_BADGE = {
  attended: "success",
  missed: "neutral",
  upcoming: "info",
};

const STATUS_ICON = {
  attended: FiCheckCircle,
  missed: FiMoon,
  upcoming: FiCalendar,
};

const STATUS_HINT = {
  attended: "Workout logged",
  missed: "No check-in recorded",
  upcoming: "Date is still ahead",
};

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-panel-2 text-muted">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
    <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="truncate text-sm font-medium text-ink">{value}</dd>
    </div>
  </div>
);

const SelectedDateDetails = ({ dateKey, record, today }) => {
  const date = fromISODate(dateKey);
  const status = getAttendanceStatus(date, record, today);
  const StatusIcon = STATUS_ICON[status];

  return (
    <Card variant="panel" padding="base" className="h-full">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        Selected date
      </p>
      <h2 className="mt-1 text-base font-semibold text-ink">
        {formatFullDate(date)}
      </h2>
      <p className="text-xs text-muted">{relativeDayLabel(date, today)}</p>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
            status === "attended"
              ? "bg-volt/12 text-volt"
              : "bg-panel-2 text-muted"
          }`}
        >
          <StatusIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <Badge variant={STATUS_BADGE[status]}>{STATUS_META[status].label}</Badge>
          <p className="mt-1 text-xs text-muted">{STATUS_HINT[status]}</p>
        </div>
      </div>

      {status === "attended" ? (
        <dl className="mt-4 space-y-3 border-t border-line pt-4">
          <DetailRow icon={FiClock} label="Check-in time" value={record.checkInTime} />
          {record.workout && (
            <DetailRow
              icon={FiActivity}
              label="Workout focus"
              value={record.workout}
            />
          )}
          <DetailRow
            icon={FiLayers}
            label="Sessions"
            value={`${record.sessions} session${record.sessions > 1 ? "s" : ""}`}
          />
        </dl>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line bg-panel-2/50 p-4 text-center">
          <FiMoon className="mx-auto h-5 w-5 text-muted" aria-hidden="true" />
          <p className="mt-2 text-sm font-medium text-ink">
            {status === "upcoming" ? "Nothing here yet" : "No visit recorded"}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {status === "upcoming"
              ? "This date is in the future."
              : "Looks like a rest day. Keep your streak on track."}
          </p>
        </div>
      )}
    </Card>
  );
};

export default SelectedDateDetails;
