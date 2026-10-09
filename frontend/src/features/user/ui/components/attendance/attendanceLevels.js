export const ATTENDANCE_LEVELS = [
  { level: 0, className: "bg-panel-2" },
  { level: 1, className: "bg-volt/25" },
  { level: 2, className: "bg-volt/60" },
  { level: 3, className: "bg-volt" },
];

export const HEATMAP_CELL =
  "h-3.5 w-3.5 rounded-[3px] md:h-5 md:w-5 md:rounded-[4px]";
export const HEATMAP_GAP = "gap-1 md:gap-1.5";

export const getAttendanceLevel = (record) => {
  if (!record?.attended) return 0;
  return Math.min(Math.max(record.sessions, 1), 3);
};

export const getAttendanceLevelClass = (record) =>
  ATTENDANCE_LEVELS[getAttendanceLevel(record)].className;
