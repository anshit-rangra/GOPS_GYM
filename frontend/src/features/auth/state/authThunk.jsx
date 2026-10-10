import { showError, showSuccess } from "../../../lib/toast/toast";
import { getApiErrorMessage } from "../../../lib/api/errors";
import { fetchCurrentUser, loginUser, registerUser } from "../api/authApi";
import {
  authResolved,
  loginFailure,
  loginStart,
  loginSuccess,
  logout as logoutAction,
  registrationFailure,
  registrationStart,
  registrationSuccess,
  sessionChecked,
} from "./authSlice";

/**
 * The backend has no /logout endpoint and the refresh token lives in an
 * httpOnly cookie we cannot clear from JavaScript. To keep logout meaningful
 * on this device we remember the explicit sign-out and skip the silent
 * session bootstrap until the user signs in again.
 */
const LOGGED_OUT_KEY = "gops:logged-out";

export const markLoggedOut = () => {
  try {
    window.localStorage.setItem(LOGGED_OUT_KEY, "true");
  } catch {
    /* storage unavailable */
  }
};

const clearLoggedOut = () => {
  try {
    window.localStorage.removeItem(LOGGED_OUT_KEY);
  } catch {
    /* storage unavailable */
  }
};

const isMarkedLoggedOut = () => {
  try {
    return window.localStorage.getItem(LOGGED_OUT_KEY) === "true";
  } catch {
    return false;
  }
};

export const registerThunk = (formData) => async (dispatch) => {
  dispatch(registrationStart());
  try {
    const body = await registerUser(formData);
    dispatch(registrationSuccess());
    showSuccess(
      body?.message || "Registration request sent. Please await admin approval.",
    );
    return true;
  } catch (error) {
    const message = getApiErrorMessage(error);
    dispatch(registrationFailure(message));
    showError(message);
    throw new Error(message, { cause: error });
  }
};

export const loginThunk = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const body = await loginUser(credentials);
    const user = body?.data?.user;
    const accessToken = body?.data?.accessToken;
    if (!user || !accessToken) {
      throw new Error("Unexpected login response");
    }
    clearLoggedOut();
    dispatch(loginSuccess({ user, accessToken }));
    showSuccess(body?.message || "Signed in successfully");
    return user;
  } catch (error) {
    const message = getApiErrorMessage(error);
    dispatch(loginFailure(message));
    showError(message);
    throw new Error(message, { cause: error });
  }
};

export const bootstrapSessionThunk = () => async (dispatch) => {
  if (isMarkedLoggedOut()) {
    dispatch(sessionChecked());
    return;
  }

  try {
    // The request interceptor transparently refreshes the access token using
    // the httpOnly cookie when this first call comes back unauthorized.
    const body = await fetchCurrentUser();
    dispatch(authResolved({ user: body?.data?.user }));
  } catch {
    dispatch(sessionChecked());
  }
};

export const logoutThunk = () => (dispatch) => {
  markLoggedOut();
  dispatch(logoutAction());
};
