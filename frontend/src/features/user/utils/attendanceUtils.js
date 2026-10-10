export const DAY_MS = 86_400_000;

export const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const to2 = (value) => String(value).padStart(2, "0");

export const toISODate = (date) =>
  `${date.getFullYear()}-${to2(date.getMonth() + 1)}-${to2(date.getDate())}`;

export const fromISODate = (key) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date, amount) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

export const getMondayIndex = (date) => (date.getDay() + 6) % 7;

export const startOfWeek = (date) =>
  addDays(startOfDay(date), -getMondayIndex(date));

export const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isFutureDay = (date, today) =>
  startOfDay(date).getTime() > startOfDay(today).getTime();

export const formatFullDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

export const formatMediumDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);

export const formatMonthYear = (year, month) =>
  `${MONTHS_LONG[month]} ${year}`;

export const formatClock = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

export const relativeDayLabel = (date, today) => {
  const diff = Math.round(
    (startOfDay(date).getTime() - startOfDay(today).getTime()) / DAY_MS,
  );
  if (diff === 0) return "Today";
  if (diff === -1) return "Yesterday";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return `${Math.abs(diff)} days ago`;
  return `In ${diff} days`;
};

export const STATUS_META = {
  attended: { label: "Attended" },
  missed: { label: "No Visit" },
  upcoming: { label: "Upcoming" },
};

export const getAttendanceStatus = (date, record, today) => {
  if (record?.attended) return "attended";
  if (isFutureDay(date, today)) return "upcoming";
  return "missed";
};

export const buildHeatmapGrid = (endDate, totalDays = 60) => {
  const today = startOfDay(endDate);
  const rangeStart = addDays(today, -(totalDays - 1));
  const gridStart = startOfWeek(rangeStart);
  const gridEnd = addDays(startOfWeek(today), 6);

  const columns = [];
  let cursor = gridStart;

  while (cursor <= gridEnd) {
    const week = [];
    for (let day = 0; day < 7; day++) {
      const date = addDays(cursor, day);
      const inRange =
        date.getTime() >= rangeStart.getTime() &&
        date.getTime() <= today.getTime();
      week.push({ date, key: toISODate(date), inRange });
    }
    columns.push(week);
    cursor = addDays(cursor, 7);
  }

  return { columns, monthLabels: buildMonthLabels(columns), rangeStart, rangeEnd: today, totalDays };
};

const buildMonthLabels = (columns) => {
  const labels = [];
  let lastMonth = -1;

  columns.forEach((week, index) => {
    const firstOfMonth = week.find(
      (cell) => cell.inRange && cell.date.getDate() === 1,
    );
    const firstInRange = week.find((cell) => cell.inRange);
    const anchor = firstOfMonth || (index === 0 ? firstInRange : null);

    if (anchor && anchor.date.getMonth() !== lastMonth) {
      labels.push({ index, label: MONTHS_SHORT[anchor.date.getMonth()] });
      lastMonth = anchor.date.getMonth();
    }
  });

  return labels;
};

export const buildCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const gridStart = startOfWeek(firstDay);
  const gridEnd = addDays(startOfWeek(lastDay), 6);

  const days = [];
  for (let cursor = gridStart; cursor <= gridEnd; cursor = addDays(cursor, 1)) {
    days.push({
      date: new Date(cursor),
      key: toISODate(cursor),
      inMonth: cursor.getMonth() === month,
    });
  }
  return days;
};

export const countWorkouts = (recordsByDate, startDate, endDate) => {
  let count = 0;
  for (let cursor = startOfDay(startDate); cursor <= endDate; cursor = addDays(cursor, 1)) {
    if (recordsByDate.get(toISODate(cursor))?.attended) count += 1;
  }
  return count;
};

export const computeStatistics = (recordsByDate, today) => {
  const startDate = addDays(today, -59);

  let attendedDays = 0;
  let elapsedDays = 0;
  for (let cursor = startDate; cursor <= today; cursor = addDays(cursor, 1)) {
    elapsedDays += 1;
    if (recordsByDate.get(toISODate(cursor))?.attended) attendedDays += 1;
  }

  let streak = 0;
  let streakCursor = today;
  if (!recordsByDate.get(toISODate(streakCursor))?.attended) {
    streakCursor = addDays(streakCursor, -1);
  }
  while (recordsByDate.get(toISODate(streakCursor))?.attended) {
    streak += 1;
    streakCursor = addDays(streakCursor, -1);
  }

  let lastVisit = null;
  for (let cursor = today, guard = 0; guard < 400; guard++) {
    const record = recordsByDate.get(toISODate(cursor));
    if (record?.attended) {
      lastVisit = record;
      break;
    }
    cursor = addDays(cursor, -1);
  }

  return {
    attendanceRate: elapsedDays ? Math.round((attendedDays / elapsedDays) * 100) : 0,
    totalVisits: attendedDays,
    elapsedDays,
    streak,
    lastVisit,
  };
};

export const buildWeeklySummary = (recordsByDate, today) => {
  const days = [];
  for (let offset = 6; offset >= 0; offset--) {
    const date = addDays(today, -offset);
    const record = recordsByDate.get(toISODate(date)) || null;
    days.push({ date, key: toISODate(date), record, attended: Boolean(record?.attended) });
  }
  return days;
};

export const getRecentVisits = (records, today, limit = 5) =>
  records
    .filter((record) => record.attended && fromISODate(record.date).getTime() <= today.getTime())
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);

/**
 * The backend stores one attendance document per check-in with a `createdAt`
 * timestamp. Multiple documents on the same local calendar day represent
 * multiple sessions that day, so we collapse them into a single per-day record.
 */
export const groupAttendanceRecords = (rawRecords = []) => {
  const byDate = new Map();
  if (!Array.isArray(rawRecords)) return byDate;

  for (const raw of rawRecords) {
    const created = new Date(raw?.createdAt);
    if (Number.isNaN(created.getTime())) continue;

    const key = toISODate(created);
    const existing = byDate.get(key);

    if (!existing) {
      byDate.set(key, {
        date: key,
        attended: true,
        sessions: 1,
        checkInAt: created,
        checkInTime: formatClock(created),
        recordIds: raw?._id ? [raw._id] : [],
      });
      continue;
    }

    existing.sessions += 1;
    if (raw?._id) existing.recordIds.push(raw._id);
    if (created.getTime() < existing.checkInAt.getTime()) {
      existing.checkInAt = created;
      existing.checkInTime = formatClock(created);
    }
  }

  return byDate;
};

export const buildAttendanceModel = (rawRecords, { heatmapDays = 60 } = {}) => {
  const today = startOfDay(new Date());
  const records = groupAttendanceRecords(rawRecords);

  const heatmap = { ...buildHeatmapGrid(today, heatmapDays) };
  heatmap.totalWorkouts = countWorkouts(
    records,
    heatmap.rangeStart,
    heatmap.rangeEnd,
  );

  const statistics = computeStatistics(records, today);
  const week = buildWeeklySummary(records, today);

  const allVisits = Array.from(records.values()).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const recentVisits = allVisits.slice(0, 5);

  return {
    today,
    records,
    heatmap,
    statistics,
    week,
    allVisits,
    recentVisits,
    totalSessions: Array.isArray(rawRecords) ? rawRecords.length : 0,
  };
};
