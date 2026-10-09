import { ATTENDANCE_LEVELS } from "./attendanceLevels";

const AttendanceLegend = () => (
  <div
    role="img"
    aria-label="Attendance intensity: lighter green means fewer sessions, brighter green means more sessions"
    className="flex items-center gap-1.5 text-[11px] text-muted"
  >
    <span>Less</span>
    {ATTENDANCE_LEVELS.map(({ level, className }) => (
      <span
        key={level}
        aria-hidden="true"
        className={`h-3 w-3 rounded-[3px] ${className}`}
      />
    ))}
    <span>More</span>
  </div>
);

export default AttendanceLegend;
