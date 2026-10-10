import api from "../../../lib/api/axios";

export const fetchMyAttendance = async () => {
  const { data } = await api.get("/attendance/record/me");
  return data;
};

export const fetchUserAttendance = async (userId) => {
  const { data } = await api.get(
    `/attendance/record/user/${encodeURIComponent(userId)}`,
  );
  return data;
};

export const markAttendance = async (secret) => {
  const { data } = await api.post("/attendance/mark", null, {
    params: { secret },
  });
  return data;
};
