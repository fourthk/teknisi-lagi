export type AuthUser = {
  id?: string;
  username?: string;
  role?: string;
  [k: string]: any;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function setAuth(token: string, user?: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser<T extends AuthUser = AuthUser>(): T | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthed() {
  return !!getToken();
}

export function getRole() {
  return getUser()?.role ?? null;
}
