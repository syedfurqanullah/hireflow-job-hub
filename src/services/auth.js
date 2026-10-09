const USER_KEY = "hireflow_user";
const AUTH_KEY = "hireflow_is_authenticated";
const REMEMBER_KEY = "hireflow_remember_me";
export const AUTH_CHANGE_EVENT = "hireflow-auth-change";

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    return (
      localStorage.getItem(AUTH_KEY) === "true" && Boolean(getCurrentUser())
    );
  } catch {
    return false;
  }
};

export const startDemoSession = (user, rememberMe = false) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_KEY, "true");
    if (rememberMe) localStorage.setItem(REMEMBER_KEY, "true");
    else localStorage.removeItem(REMEMBER_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  } catch {
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }
};

export const endDemoSession = () => {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  } catch {
    // If storage is blocked, the UI still exits the local demo session.
  } finally {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};
