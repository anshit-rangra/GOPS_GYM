import { useState } from "react";
import { Card } from "../../../../../components/ui";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import AttendanceStatusLegend from "./AttendanceStatusLegend";
import { WEEKDAYS_SHORT, buildCalendarDays } from "../../../utils/attendanceUtils";

const AttendanceCalendar = ({ records, today, selectedKey, onSelectDate }) => {
  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));

  const days = buildCalendarDays(view.year, view.month);

  const shiftMonth = (delta) => {
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const goToToday = () =>
    setView({ year: today.getFullYear(), month: today.getMonth() });

  const handleSelect = (day) => {
    onSelectDate(day.key);
    if (!day.inMonth) {
      setView({ year: day.date.getFullYear(), month: day.date.getMonth() });
    }
  };

  return (
    <Card variant="panel" padding="base" className="h-full">
      <CalendarHeader
        year={view.year}
        month={view.month}
        onPrevious={() => shiftMonth(-1)}
        onNext={() => shiftMonth(1)}
        onToday={goToToday}
      />

      <div className="mt-4" aria-label="Attendance calendar" role="group">
        <div className="grid grid-cols-7 gap-1 md:gap-1.5">
          {WEEKDAYS_SHORT.map((weekday) => (
            <span
              key={weekday}
              className="pb-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted"
            >
              {weekday}
            </span>
          ))}
          {days.map((day) => (
            <CalendarDay
              key={day.key}
              day={day}
              record={records.get(day.key) ?? null}
              today={today}
              selected={day.key === selectedKey}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <AttendanceStatusLegend />
      </div>
    </Card>
  );
};

export default AttendanceCalendar;
