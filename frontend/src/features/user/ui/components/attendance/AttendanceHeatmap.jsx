import { useState } from "react";
import { Card } from "../../../../../components/ui";
import AttendanceDay from "./AttendanceDay";
import AttendanceLegend from "./AttendanceLegend";
import { HEATMAP_CELL, HEATMAP_GAP } from "./attendanceLevels";
import {
  STATUS_META,
  WEEKDAYS_SHORT,
  formatMediumDate,
  getAttendanceStatus,
} from "../../../utils/attendanceUtils";

const getTooltipAlign = (column, totalColumns) => {
  if (column <= 1) return "start";
  if (column >= totalColumns - 2) return "end";
  return "center";
};

const AttendanceHeatmap = ({ heatmap, records, today }) => {
  const [selected, setSelected] = useState(null);
  const totalColumns = heatmap.columns.length;
  const cells = heatmap.columns.flatMap((week, column) =>
    week.map((day) => ({ ...day, column })),
  );

  const selectedStatus = selected
    ? getAttendanceStatus(selected.date, selected.record, today)
    : null;

  return (
    <Card variant="panel" padding="base" className="h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink">Your Consistency</h2>
          <p className="text-sm text-muted">
            Your gym journey over the last 60 days
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-volt/25 bg-volt/10 px-3 py-1 text-xs font-medium text-volt">
          {heatmap.totalWorkouts} workouts in the last 60 days
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        <div
          className={`grid shrink-0 grid-rows-7 ${HEATMAP_GAP} pt-[18px] text-[10px] leading-none text-muted md:pt-6`}
          aria-hidden="true"
        >
          {WEEKDAYS_SHORT.map((weekday, index) => (
            <span
              key={weekday}
              className="flex h-3.5 items-center pr-1 md:h-5"
            >
              {index % 2 === 0 ? weekday : ""}
            </span>
          ))}
        </div>

        <div className="min-w-0">
          <div
            className={`mb-1 grid grid-flow-col ${HEATMAP_GAP}`}
            aria-hidden="true"
          >
            {Array.from({ length: totalColumns }).map((_, index) => {
              const label = heatmap.monthLabels.find(
                (month) => month.index === index,
              );
              return (
                <span key={index} className={`relative ${HEATMAP_CELL}`}>
                  {label && (
                    <span className="absolute left-0 top-0 text-[10px] leading-none text-muted">
                      {label.label}
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          <div className={`grid grid-flow-col grid-rows-7 ${HEATMAP_GAP}`}>
            {cells.map((cell) =>
              cell.inRange ? (
                <AttendanceDay
                  key={cell.key}
                  day={cell}
                  record={records.get(cell.key) ?? null}
                  today={today}
                  align={getTooltipAlign(cell.column, totalColumns)}
                  selected={selected?.key === cell.key}
                  onSelect={(day, record) =>
                    setSelected({ key: day.key, date: day.date, record })
                  }
                />
              ) : (
                <span
                  key={`empty-${cell.key}`}
                  aria-hidden="true"
                  className={HEATMAP_CELL}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted" aria-live="polite">
          {selected ? (
            <span>
              {formatMediumDate(selected.date)} —{" "}
              {selectedStatus === "attended"
                ? `Attended at ${selected.record.checkInTime}`
                : STATUS_META[selectedStatus].label}
            </span>
          ) : (
            <>
              <span className="sm:hidden">Tap a day to see details</span>
              <span className="hidden sm:inline">Hover a day to see details</span>
            </>
          )}
        </p>
        <AttendanceLegend />
      </div>
    </Card>
  );
};

export default AttendanceHeatmap;
