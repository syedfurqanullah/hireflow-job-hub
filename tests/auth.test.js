import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  endDemoSession,
  getCurrentUser,
  isAuthenticated,
  startDemoSession,
} from "../src/services/auth.js";

const originalStorage = globalThis.localStorage;
const originalWindow = globalThis.window;

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

const setBrowserMocks = () => {
  globalThis.localStorage = new MemoryStorage();
  globalThis.window = new EventTarget();
};

afterEach(() => {
  globalThis.localStorage = originalStorage;
  globalThis.window = originalWindow;
});

test("demo session can be created and read without saving passwords", () => {
  setBrowserMocks();
  const user = { name: "Amina", email: "amina@example.com", role: "job-seeker" };

  startDemoSession(user, true);

  assert.equal(isAuthenticated(), true);
  assert.deepEqual(getCurrentUser(), user);
  assert.equal(localStorage.getItem("hireflow_remember_me"), "true");
  assert.equal(localStorage.getItem("password"), null);
});

test("ending a session removes local session data", () => {
  setBrowserMocks();
  startDemoSession({ name: "Amina", email: "amina@example.com" });

  endDemoSession();

  assert.equal(isAuthenticated(), false);
  assert.equal(getCurrentUser(), null);
});

test("malformed saved user data is treated as logged out", () => {
  setBrowserMocks();
  localStorage.setItem("hireflow_user", "not-json");
  localStorage.setItem("hireflow_is_authenticated", "true");

  assert.equal(getCurrentUser(), null);
  assert.equal(isAuthenticated(), false);
});
