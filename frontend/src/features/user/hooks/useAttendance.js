import { useMemo } from "react";
import { attendanceByDate, attendanceRecords } from "../data/mockAttendance";
import {
  buildHeatmapGrid,
  buildWeeklySummary,
  computeStatistics,
  countWorkouts,
  getRecentVisits,
  startOfDay,
} from "../utils/attendanceUtils";

const HEATMAP_DAYS = 60;

const useAttendance = () => {
  const today = useMemo(() => startOfDay(new Date()), []);

  const heatmap = useMemo(() => {
    const grid = buildHeatmapGrid(today, HEATMAP_DAYS);
    return {
      ...grid,
      totalWorkouts: countWorkouts(attendanceByDate, grid.rangeStart, grid.rangeEnd),
    };
  }, [today]);

  const statistics = useMemo(
    () => computeStatistics(attendanceByDate, today),
    [today],
  );

  const week = useMemo(
    () => buildWeeklySummary(attendanceByDate, today),
    [today],
  );

  const recentVisits = useMemo(
    () => getRecentVisits(attendanceRecords, today, 5),
    [today],
  );

  return { today, records: attendanceByDate, heatmap, statistics, week, recentVisits };
};

export default useAttendance;
