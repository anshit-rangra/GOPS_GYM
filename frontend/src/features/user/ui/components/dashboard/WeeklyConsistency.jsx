import { Card } from "../../../../../components/ui";
import { formatMediumDate } from "../../../utils/attendanceUtils";

const getBarHeight = (attended, sessions) => {
  if (!attended) return 8;
  return Math.min(40 + sessions * 20, 100);
};

const WeeklyConsistency = ({ week }) => {
  const attendedDays = week.filter((day) => day.attended).length;
  const todayKey = week[week.length - 1]?.key;

  return (
    <Card variant="panel" padding="base" className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">
            Weekly Consistency
          </h2>
          <p className="text-xs text-muted">Last 7 days</p>
        </div>
        <span className="rounded-full border border-volt/25 bg-volt/10 px-2.5 py-1 text-xs font-medium text-volt">
          {attendedDays}/7 days
        </span>
      </div>

      <div
        className="mt-5 flex h-32 items-end gap-2"
        role="img"
        aria-label={`${attendedDays} of the last 7 days attended`}
      >
        {week.map(({ date, key, record, attended }) => {
          const sessions = record?.sessions ?? 0;
          const isToday = key === todayKey;
          return (
            <div
              key={key}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className={`w-full rounded-md transition-all motion-safe:duration-500 ${
                  attended
                    ? "bg-volt"
                    : "border border-line bg-panel-2"
                }`}
                style={{ height: `${getBarHeight(attended, sessions)}%` }}
                title={`${formatMediumDate(date)}: ${
                  attended ? `${sessions} session${sessions > 1 ? "s" : ""}` : "no visit"
                }`}
              />
              <span
                className={`text-[11px] ${
                  isToday ? "font-semibold text-volt" : "text-muted"
                }`}
              >
                {new Intl.DateTimeFormat("en-US", { weekday: "narrow" }).format(
                  date,
                )}
              </span>
              <span className="sr-only">
                {formatMediumDate(date)}:{" "}
                {attended
                  ? `${sessions} session${sessions > 1 ? "s" : ""}`
                  : "no visit"}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-muted">
        {attendedDays >= 5
          ? "Great week — you're building real momentum."
          : "Aim for one more session to beat last week."}
      </p>
    </Card>
  );
};

export default WeeklyConsistency;
