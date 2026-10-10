const USER_KEY = "hireflow_user";
const AUTH_KEY = "hireflow_is_authenticated";
const REMEMBER_KEY = "hireflow_remember_me";
const ACCOUNTS_KEY = "hireflow_accounts";
export const AUTH_CHANGE_EVENT = "hireflow-auth-change";

const getStorage = (persistent = true) => {
  try {
    if (persistent || !globalThis.sessionStorage)
      return globalThis.localStorage;
    return globalThis.sessionStorage;
  } catch {
    return null;
  }
};

const getAvailableStorages = () =>
  [getStorage(true), getStorage(false)].filter(Boolean);

const normalizeEmail = (email) =>
  String(email || "")
    .trim()
    .toLowerCase();

const getAccounts = () => {
  try {
    const accounts = JSON.parse(
      getStorage(true)?.getItem(ACCOUNTS_KEY) || "[]",
    );
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
};

const hashPassword = async (password, salt) => {
  if (!globalThis.crypto?.subtle || typeof TextEncoder === "undefined") {
    throw new Error("Secure password hashing is unavailable in this browser.");
  }

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const digest = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
};

export const getCurrentUser = () => {
  for (const storage of getAvailableStorages()) {
    try {
      if (storage.getItem(AUTH_KEY) !== "true") continue;
      const user = JSON.parse(storage.getItem(USER_KEY) || "null");
      if (user) return user;
    } catch {
      // Try the next available browser storage.
    }
  }
  return null;
};

export const registerLocalAccount = async (user, password) => {
  const storage = getStorage(true);
  const email = normalizeEmail(user?.email);

  if (!storage)
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  if (!email || !password) throw new Error("Email and password are required.");

  const accounts = getAccounts();
  if (accounts.some((account) => account.email === email)) {
    throw new Error(
      "An account with this email already exists. Please sign in.",
    );
  }

  const account = {
    name: String(user?.name || "HireFlow user").trim(),
    email,
    role: user?.role === "employer" ? "employer" : "job-seeker",
    passwordSalt: globalThis.crypto.randomUUID(),
  };
  account.passwordHash = await hashPassword(password, account.passwordSalt);

  try {
    storage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  } catch {
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }

  startLocalSession({
    name: account.name,
    email: account.email,
    role: account.role,
  });
};

export const signInLocalAccount = async (
  email,
  password,
  rememberMe = false,
) => {
  const account = getAccounts().find(
    (item) => item.email === normalizeEmail(email),
  );

  if (
    !account ||
    account.passwordHash !==
      (await hashPassword(password, account.passwordSalt))
  ) {
    throw new Error("Invalid email or password.");
  }

  startLocalSession(
    { name: account.name, email: account.email, role: account.role },
    rememberMe,
  );
};

export const resetLocalPassword = async (email, password) => {
  const storage = getStorage(true);
  const normalizedEmail = normalizeEmail(email);
  const accounts = getAccounts();
  const accountIndex = accounts.findIndex(
    (account) => account.email === normalizedEmail,
  );

  if (accountIndex === -1) {
    throw new Error("No account was found with this email address.");
  }

  const updatedAccount = {
    ...accounts[accountIndex],
    passwordSalt: globalThis.crypto.randomUUID(),
  };
  updatedAccount.passwordHash = await hashPassword(
    password,
    updatedAccount.passwordSalt,
  );
  accounts[accountIndex] = updatedAccount;

  try {
    storage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    throw new Error(
      "Browser storage is unavailable. Enable local storage and try again.",
    );
  }
};

export const hasRole = (allowedRoles = []) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return isAuthenticated() && roles.includes(getCurrentUser()?.role);
};

export const isAuthenticated = () => {
  return getAvailableStorages().some((storage) => {
    try {
      return (
        storage.getItem(AUTH_KEY) === "true" &&
        Boolean(JSON.parse(storage.getItem(USER_KEY) || "null"))
      );
    } catch {
      return false;
    }
  });
};

const startLocalSession = (user, rememberMe = false) => {
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
