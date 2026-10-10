import axios from "axios";
import { store } from "../../app/store";
import { logout, setAccessToken } from "../../features/auth/state/authSlice";

const API_ORIGIN = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
});

/**
 * Endpoints that must never carry an Authorization header and must never be
 * retried through the refresh flow (otherwise we would recurse forever).
 */
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

const isAuthEndpoint = (url = "") =>
  AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token && !isAuthEndpoint(config.url)) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A single in-flight refresh promise so concurrent 401s cannot trigger
// multiple refresh requests (which would race on the rotating refresh token).
let refreshPromise = null;

const requestNewAccessToken = async () => {
  const response = await api.get("/auth/refresh");
  const token = response.data?.data?.accessToken;
  if (!token) throw new Error("No access token returned by refresh");
  store.dispatch(setAccessToken(token));
  return token;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const status = response?.status;
    const message = response?.data?.message || "";
    const authFailure =
      status === 401 ||
      (status === 404 && message.toLowerCase().includes("access token"));

    if (authFailure && config && !config._retry && !isAuthEndpoint(config.url)) {
      config._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = requestNewAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const token = await refreshPromise;
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        return api(config);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
