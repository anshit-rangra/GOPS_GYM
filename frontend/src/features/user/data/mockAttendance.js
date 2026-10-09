import { addDays, startOfDay, toISODate } from "../utils/attendanceUtils";

const CHECK_IN_TIMES = [
  "06:15 AM",
  "06:45 AM",
  "07:05 AM",
  "05:40 PM",
  "06:30 PM",
  "07:15 PM",
  "08:00 PM",
];

const WORKOUT_FOCUS = [
  "Push Day",
  "Pull Day",
  "Leg Day",
  "Full Body",
  "Cardio & Core",
  "HIIT Session",
  "Mobility Flow",
];

const HISTORY_DAYS = 150;

const mulberry32 = (seed) => {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const RECENT_PATTERN = [
  { offset: 0, attended: false },
  { offset: 1, attended: true, checkInTime: "06:45 AM", workout: "Push Day", sessions: 2 },
  { offset: 2, attended: true, checkInTime: "07:10 PM", workout: "Leg Day", sessions: 1 },
  { offset: 3, attended: true, checkInTime: "06:30 AM", workout: "HIIT Session", sessions: 1 },
  { offset: 4, attended: true, checkInTime: "06:55 PM", workout: "Pull Day", sessions: 1 },
  { offset: 5, attended: true, checkInTime: "07:20 AM", workout: "Cardio & Core", sessions: 2 },
  { offset: 6, attended: false },
  { offset: 7, attended: true, checkInTime: "06:40 AM", workout: "Full Body", sessions: 1 },
];

const createAttendanceHistory = () => {
  const random = mulberry32(987654321);
  const today = startOfDay(new Date());
  const records = [];

  for (let offset = HISTORY_DAYS - 1; offset >= 0; offset--) {
    const date = addDays(today, -offset);
    const attended = random() < 0.78;
    const roll = random();
    const sessions = attended ? (roll < 0.08 ? 3 : roll < 0.35 ? 2 : 1) : 0;

    records.push({
      date: toISODate(date),
      attended,
      sessions,
      checkInTime: attended
        ? CHECK_IN_TIMES[Math.floor(random() * CHECK_IN_TIMES.length)]
        : null,
      workout: attended
        ? WORKOUT_FOCUS[Math.floor(random() * WORKOUT_FOCUS.length)]
        : null,
    });
  }

  RECENT_PATTERN.forEach(({ offset, ...pattern }) => {
    const index = HISTORY_DAYS - 1 - offset;
    if (index < 0) return;
    records[index] = {
      date: records[index].date,
      attended: pattern.attended,
      sessions: pattern.sessions ?? 0,
      checkInTime: pattern.checkInTime ?? null,
      workout: pattern.workout ?? null,
    };
  });

  return records;
};

export const attendanceRecords = createAttendanceHistory();

export const attendanceByDate = new Map(
  attendanceRecords.map((record) => [record.date, record]),
);

export const getAttendanceRecord = (dateKey) =>
  attendanceByDate.get(dateKey) ?? null;
