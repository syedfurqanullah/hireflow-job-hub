const USER_KEY = "hireflow_user";
const AUTH_KEY = "hireflow_is_authenticated";
const REMEMBER_KEY = "hireflow_remember_me";
export const AUTH_CHANGE_EVENT = "hireflow-auth-change";

const getStorage = (persistent = true) => {
  try {
    if (persistent || !globalThis.sessionStorage) return globalThis.localStorage;
    return globalThis.sessionStorage;
  } catch {
    return null;
  }
};

const getAvailableStorages = () => [
  getStorage(true),
  getStorage(false),
].filter(Boolean);

export const getCurrentUser = () => {
  for (const storage of getAvailableStorages()) {
    try {
      const user = JSON.parse(storage.getItem(USER_KEY) || "null");
      if (user) return user;
    } catch {
      // Try the next available browser storage.
    }
  }
  return null;
};

export const isAuthenticated = () => {
  return getAvailableStorages().some((storage) => {
    try {
      return storage.getItem(AUTH_KEY) === "true" && Boolean(
        JSON.parse(storage.getItem(USER_KEY) || "null"),
      );
    } catch {
      return false;
    }
  });
};

export const startDemoSession = (user, rememberMe = false) => {
  const storage = getStorage(rememberMe);
  const storages = getAvailableStorages();

  if (!storage) {
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }

  try {
    storages.forEach((availableStorage) => {
      availableStorage.removeItem(USER_KEY);
      availableStorage.removeItem(AUTH_KEY);
      availableStorage.removeItem(REMEMBER_KEY);
    });
    storage.setItem(USER_KEY, JSON.stringify(user));
    storage.setItem(AUTH_KEY, "true");
    if (rememberMe) storage.setItem(REMEMBER_KEY, "true");
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  } catch {
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }
};

export const endDemoSession = () => {
  try {
    getAvailableStorages().forEach((storage) => {
      storage.removeItem(USER_KEY);
      storage.removeItem(AUTH_KEY);
      storage.removeItem(REMEMBER_KEY);
    });
  } catch {
    // If storage is blocked, the UI still exits the local demo session.
  } finally {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};
