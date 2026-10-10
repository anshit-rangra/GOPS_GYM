import { useState } from "react";
import { Skeleton, ErrorState } from "../../../../components/ui";
import useAttendance from "../../hooks/useAttendance";
import { toISODate } from "../../utils/attendanceUtils";
import AttendanceStats from "../components/dashboard/AttendanceStats";
import QRCodeCheckIn from "../components/dashboard/QRCodeCheckIn";
import RecentAttendance from "../components/dashboard/RecentAttendance";
import WeeklyConsistency from "../components/dashboard/WeeklyConsistency";
import MotivationCard from "../components/dashboard/MotivationCard";
import AttendanceHeatmap from "../components/attendance/AttendanceHeatmap";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import SelectedDateDetails from "../components/attendance/SelectedDateDetails";

const DashboardSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl space-y-6" aria-hidden="true">
    <Skeleton className="h-44 w-full" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-28 w-full" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Skeleton className="h-64 lg:col-span-2" />
      <Skeleton className="h-64" />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Skeleton className="h-80 lg:col-span-2" />
      <Skeleton className="h-80" />
    </div>
  </div>
);

const UserDashboard = () => {
  const {
    today,
    records,
    heatmap,
    statistics,
    week,
    recentVisits,
    status,
    error,
    refetch,
    hasCheckedInToday,
  } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(() => toISODate(today));

  if (status === "loading") return <DashboardSkeleton />;

  if (status === "error") {
    return (
      <div className="mx-auto w-full max-w-3xl py-10">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  const selectedRecord = records.get(selectedDate) ?? null;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <QRCodeCheckIn
        hasCheckedInToday={hasCheckedInToday}
        onCheckedIn={refetch}
      />

      <AttendanceStats statistics={statistics} today={today} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceHeatmap
            heatmap={heatmap}
            records={records}
            today={today}
          />
        </div>
        <WeeklyConsistency week={week} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceCalendar
            records={records}
            today={today}
            selectedKey={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        <SelectedDateDetails
          dateKey={selectedDate}
          record={selectedRecord}
          today={today}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentAttendance visits={recentVisits} />
        <MotivationCard streak={statistics.streak} />
      </div>
    </div>
  );
};

export default UserDashboard;
