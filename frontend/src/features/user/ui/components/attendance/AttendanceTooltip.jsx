import Tooltip from "../../../../../components/ui/Tooltip";
import { STATUS_META, formatMediumDate } from "../../../utils/attendanceUtils";

const AttendanceTooltip = ({ day, record, status, align, children }) => (
  <Tooltip
    align={align}
    content={
      <div className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-left shadow-xl">
        <p className="text-xs font-semibold text-ink">
          {formatMediumDate(day.date)}
        </p>
        <p
          className={`mt-0.5 text-[11px] ${
            status === "attended" ? "text-volt" : "text-muted"
          }`}
        >
          {status === "attended"
            ? `Attended · ${record.checkInTime}`
            : STATUS_META[status].label}
        </p>
        {status === "attended" && record.workout && (
          <p className="text-[11px] text-muted">{record.workout}</p>
        )}
        {status === "attended" && record.sessions > 1 && (
          <p className="text-[11px] text-muted">{record.sessions} sessions</p>
        )}
      </div>
    }
  >
    {children}
  </Tooltip>
);

export default AttendanceTooltip;
