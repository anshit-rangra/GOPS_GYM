import {
  STATUS_META,
  formatFullDate,
  getAttendanceStatus,
  isSameDay,
} from "../../../utils/attendanceUtils";

const CalendarDay = ({ day, record, today, selected, onSelect }) => {
  const status = getAttendanceStatus(day.date, record, today);
  const isToday = isSameDay(day.date, today);

  const stateClasses = !day.inMonth
    ? "text-muted/35 hover:bg-panel-2"
    : status === "upcoming"
      ? "text-muted/60 hover:bg-panel-2"
      : status === "attended"
        ? "font-semibold text-ink hover:bg-volt/15"
        : "text-muted hover:bg-panel-2";

  const ringClasses = selected
    ? "ring-2 ring-volt"
    : isToday
      ? "ring-1 ring-volt/60"
      : "";

  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      aria-pressed={selected}
      aria-label={`${formatFullDate(day.date)} — ${STATUS_META[status].label}`}
      className={`relative flex h-10 items-center justify-center rounded-lg text-sm transition-colors md:h-11 ${stateClasses} ${ringClasses} ${
        selected ? "bg-panel-2" : ""
      }`}
    >
      {record?.attended && (
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-md bg-volt/10"
        />
      )}
      <span className="relative z-10">{day.date.getDate()}</span>
      {record?.attended && (
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-volt"
        />
      )}
    </button>
  );
};

export default CalendarDay;
