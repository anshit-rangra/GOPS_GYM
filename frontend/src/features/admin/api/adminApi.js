import api from "../../../lib/api/axios";

export const fetchAuthorizedUsers = async ({ limit = 50, skip = 0 } = {}) => {
  const { data } = await api.get("/admin/authorized/users", {
    params: { limit, skip },
  });
  return data;
};

export const fetchUnauthorizedUsers = async ({ limit = 50, skip = 0 } = {}) => {
  const { data } = await api.get("/admin/unauthorized/users", {
    params: { limit, skip },
  });
  return data;
};

export const authorizeUser = async (userId) => {
  const { data } = await api.post(
    `/admin/authorize/user/${encodeURIComponent(userId)}`,
  );
  return data;
};

export const unauthorizeUser = async (userId) => {
  const { data } = await api.post(
    `/admin/unauthorize/user/${encodeURIComponent(userId)}`,
  );
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await api.delete(
    `/admin/delete/user/${encodeURIComponent(userId)}`,
  );
  return data;
};
