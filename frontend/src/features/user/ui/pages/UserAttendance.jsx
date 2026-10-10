import { useMemo, useState } from "react";
import { FiCalendar, FiRefreshCw } from "react-icons/fi";
import { Button, ErrorState, Skeleton, Badge } from "../../../../components/ui";
import useAttendance from "../../hooks/useAttendance";
import AttendanceStats from "../components/dashboard/AttendanceStats";
import QRScannerModal from "../components/attendance/LazyQRScannerModal";
import EmptyState from "../../../../components/ui/EmptyState";
import {
  WEEKDAYS_SHORT,
  buildCalendarDays,
  formatMediumDate,
  formatMonthYear,
  fromISODate,
} from "../../utils/attendanceUtils";

const MonthlyBreakdown = ({ visits, today }) => {
  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));

  const days = buildCalendarDays(view.year, view.month);
  const byDate = useMemo(() => new Map(visits.map((v) => [v.date, v])), [visits]);

  const shift = (delta) =>
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const monthVisits = visits.filter((v) => {
    const d = fromISODate(v.date);
    return d.getFullYear() === view.year && d.getMonth() === view.month;
  });
  const monthSessions = monthVisits.reduce((sum, v) => sum + v.sessions, 0);

  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">
            {formatMonthYear(view.year, view.month)}
          </h3>
          <p className="text-xs text-muted">
            {monthSessions} session{monthSessions === 1 ? "" : "s"} across{" "}
            {monthVisits.length} day{monthVisits.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button size="small" variant="night" onClick={() => shift(-1)}>
            Prev
          </Button>
          <Button size="small" variant="night" onClick={() => shift(1)}>
            Next
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {WEEKDAYS_SHORT.map((day) => (
          <span
            key={day}
            className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-muted"
          >
            {day}
          </span>
        ))}
        {days.map((day) => {
          const visit = byDate.get(day.key);
          return (
            <div
              key={day.key}
              title={
                visit
                  ? `${formatMediumDate(day.date)} · ${visit.sessions} session${
                      visit.sessions === 1 ? "" : "s"
                    }`
                  : formatMediumDate(day.date)
              }
              className={`flex h-9 items-center justify-center rounded-md text-xs ${
                !day.inMonth
                  ? "text-muted/30"
                  : visit
                    ? "bg-volt/15 font-semibold text-volt ring-1 ring-volt/40"
                    : "text-muted"
              }`}
            >
              {day.date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AttendanceHistory = ({ visits }) => {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const visit of visits) {
      const date = fromISODate(visit.date);
      const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(visit);
    }
    return Array.from(map.entries());
  }, [visits]);

  if (visits.length === 0) {
    return (
      <EmptyState
        icon={FiCalendar}
        title="No attendance yet"
        description="Once you scan the gym QR code your visits will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      {grouped.map(([key, monthVisits]) => {
        const [year, month] = key.split("-").map(Number);
        return (
          <div key={key}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {formatMonthYear(year, month)}
            </p>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
              {monthVisits.map((visit) => (
                <li
                  key={visit.date}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {formatMediumDate(fromISODate(visit.date))}
                    </p>
                    <p className="text-xs text-muted">
                      First check-in at {visit.checkInTime}
                    </p>
                  </div>
                  <Badge variant="success" size="small">
                    {visit.sessions} session{visit.sessions === 1 ? "" : "s"}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const UserAttendance = () => {
  const {
    today,
    statistics,
    allVisits,
    status,
    error,
    refetch,
    totalSessions,
  } = useAttendance();
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">My Attendance</h1>
          <p className="text-sm text-muted">
            Every recorded gym visit, grouped by month.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="night" size="small" onClick={refetch}>
            <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </Button>
          <Button variant="accent" size="small" onClick={() => setScannerOpen(true)}>
            Scan QR Code
          </Button>
        </div>
      </div>

      {status === "loading" ? (
        <div className="space-y-4" aria-hidden="true">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      ) : status === "error" ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <>
          <AttendanceStats statistics={statistics} today={today} />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <MonthlyBreakdown visits={allVisits} today={today} />
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-ink">
                  Session history
                </h2>
                <span className="text-xs text-muted">
                  {totalSessions} total check-in{totalSessions === 1 ? "" : "s"}
                </span>
              </div>
              <AttendanceHistory visits={allVisits} />
            </div>
          </div>
        </>
      )}

      <QRScannerModal
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onCheckedIn={refetch}
      />
    </div>
  );
};

export default UserAttendance;
