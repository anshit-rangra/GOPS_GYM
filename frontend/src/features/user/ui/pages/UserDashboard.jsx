import { useState } from "react";
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

const UserDashboard = () => {
  const { today, records, heatmap, statistics, week, recentVisits } =
    useAttendance();
  const [selectedDate, setSelectedDate] = useState(() => toISODate(today));

  const selectedRecord = records.get(selectedDate) ?? null;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <QRCodeCheckIn />

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
