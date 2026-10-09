const LEGEND_ITEMS = [
  { label: "Attended", className: "bg-volt/20 ring-1 ring-volt" },
  { label: "No visit", className: "bg-panel-2 border border-line" },
  { label: "Today", className: "ring-1 ring-volt/60" },
  { label: "Upcoming", className: "bg-panel-2/50 border border-line/60" },
];

const AttendanceStatusLegend = () => (
  <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted">
    {LEGEND_ITEMS.map(({ label, className }) => (
      <li key={label} className="flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 rounded-[3px] ${className}`}
        />
        {label}
      </li>
    ))}
  </ul>
);

export default AttendanceStatusLegend;
