import AttendanceTooltip from "./AttendanceTooltip";
import { HEATMAP_CELL, getAttendanceLevelClass } from "./attendanceLevels";
import {
  STATUS_META,
  formatFullDate,
  getAttendanceStatus,
} from "../../../utils/attendanceUtils";

const AttendanceDay = ({
  day,
  record,
  today,
  align = "center",
  selected = false,
  onSelect,
}) => {
  const status = getAttendanceStatus(day.date, record, today);
  const statusLabel = STATUS_META[status].label;
  const checkIn = record?.attended ? `, check-in ${record.checkInTime}` : "";

  return (
    <AttendanceTooltip day={day} record={record} status={status} align={align}>
      <button
        type="button"
        onClick={() => onSelect(day, record)}
        aria-label={`${formatFullDate(day.date)} — ${statusLabel}${checkIn}`}
        aria-pressed={selected}
        className={`${HEATMAP_CELL} block transition-transform duration-150 hover:ring-2 hover:ring-ink/40 focus-visible:ring-2 focus-visible:ring-volt motion-safe:hover:scale-110 ${getAttendanceLevelClass(
          record,
        )} ${selected ? "ring-2 ring-volt" : ""}`}
      />
    </AttendanceTooltip>
  );
};

export default AttendanceDay;
