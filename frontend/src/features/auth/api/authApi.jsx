import api from "../../../lib/api/axios";

export const registerUser = async (formData) => {
  const { data } = await api.post("/auth/register", formData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const requestAccessToken = async () => {
  const { data } = await api.get("/auth/refresh");
  return data;
};
