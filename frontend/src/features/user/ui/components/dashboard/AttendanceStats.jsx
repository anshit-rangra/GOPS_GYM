import { FiActivity, FiCheckCircle, FiClock, FiZap } from "react-icons/fi";
import StatCard from "./StatCard";
import { fromISODate, relativeDayLabel } from "../../../utils/attendanceUtils";

const AttendanceStats = ({ statistics, today }) => {
  const { attendanceRate, totalVisits, streak, lastVisit } = statistics;
  const lastVisitDate = lastVisit ? fromISODate(lastVisit.date) : null;

  const cards = [
    {
      label: "Attendance Rate",
      value: `${attendanceRate}%`,
      hint: "Last 60 days",
      icon: FiActivity,
      progress: attendanceRate,
    },
    {
      label: "Total Gym Visits",
      value: `${totalVisits}`,
      hint: "Last 2 months",
      icon: FiCheckCircle,
    },
    {
      label: "Current Streak",
      value: `${streak} ${streak === 1 ? "day" : "days"}`,
      hint: "Keep it going!",
      icon: FiZap,
    },
    {
      label: "Last Visit",
      value: lastVisitDate ? relativeDayLabel(lastVisitDate, today) : "—",
      hint: lastVisit
        ? `Checked in at ${lastVisit.checkInTime}`
        : "No visits recorded yet",
      icon: FiClock,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default AttendanceStats;
