const FALLBACK = "Something went wrong. Please try again.";

export const getApiErrorMessage = (error) => {
  if (!error) return FALLBACK;

  const response = error.response;

  if (response) {
    const data = response.data;

    const validationErrors = data?.errors;
    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      return validationErrors
        .map((item) => item?.msg)
        .filter(Boolean)
        .join(", ");
    }

    if (typeof data === "string" && data.trim()) return data;
    if (data?.message) return data.message;

    switch (response.status) {
      case 400:
        return "The request was invalid. Please check the form and try again.";
      case 401:
        return "Your session has expired. Please sign in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This resource already exists.";
      default:
        if (response.status >= 500) {
          return "The server ran into a problem. Please try again shortly.";
        }
        return `Request failed (${response.status}).`;
    }
  }

  if (error.request) {
    return "Network error. Please check your connection and try again.";
  }

  return error.message || FALLBACK;
};

export const isUnauthorizedError = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || "";
  return (
    status === 401 ||
    (status === 404 && message.toLowerCase().includes("access token"))
  );
};
