import { FiCheckCircle, FiCalendar } from "react-icons/fi";
import { Badge, Card } from "../../../../../components/ui";
import { formatMediumDate, fromISODate } from "../../../utils/attendanceUtils";

const RecentAttendance = ({ visits }) => (
  <Card variant="panel" padding="base" className="h-full">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-ink">Recent Attendance</h2>
        <p className="text-xs text-muted">Your last 5 gym visits</p>
      </div>
    </div>

    {visits.length === 0 ? (
      <div className="mt-5 rounded-xl border border-dashed border-line bg-panel-2/50 p-5 text-center">
        <FiCalendar className="mx-auto h-5 w-5 text-muted" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-ink">No visits yet</p>
        <p className="mt-0.5 text-xs text-muted">
          Your check-ins will appear here.
        </p>
      </div>
    ) : (
      <ul className="mt-3 divide-y divide-line">
        {visits.map((visit) => (
          <li key={visit.date} className="flex items-center gap-3 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-volt/10 text-volt">
              <FiCheckCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {formatMediumDate(fromISODate(visit.date))}
              </p>
              <p className="truncate text-xs text-muted">
                {visit.checkInTime}
                {visit.workout ? ` · ${visit.workout}` : ""}
              </p>
            </div>
            <Badge variant="success" size="small">
              Attended
            </Badge>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

export default RecentAttendance;
