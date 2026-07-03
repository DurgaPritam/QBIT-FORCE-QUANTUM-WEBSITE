import {
  ADMIN_LOGIN_AT_KEY,
  ADMIN_TOKEN_EXPIRES_KEY,
  ADMIN_TOKEN_KEY,
  API_BASE_URL,
  SESSION_MS,
} from "./config";

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function setAdminSession(token: string, expiresIn = SESSION_MS) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  sessionStorage.setItem(ADMIN_LOGIN_AT_KEY, String(Date.now()));
  sessionStorage.setItem(ADMIN_TOKEN_EXPIRES_KEY, String(expiresIn));
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_LOGIN_AT_KEY);
  sessionStorage.removeItem(ADMIN_TOKEN_EXPIRES_KEY);
}

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function isAdminSessionExpired(): boolean {
  const loginAt = Number(sessionStorage.getItem(ADMIN_LOGIN_AT_KEY));
  const expires = Number(sessionStorage.getItem(ADMIN_TOKEN_EXPIRES_KEY) || SESSION_MS);
  if (!loginAt || !getAdminToken()) return true;
  return Date.now() - loginAt > expires;
}

export function enforceAdminSession(): boolean {
  if (isAdminSessionExpired()) {
    clearAdminToken();
    return false;
  }
  return true;
}

/** @deprecated use setAdminSession */
export function setAdminToken(token: string) {
  setAdminSession(token);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (options.auth && !enforceAdminSession()) {
    throw new ApiError("Session expired. Please sign in again.", 401);
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (options.auth) {
    const token = getAdminToken();
    if (!token) throw new ApiError("Not authenticated", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
  });

  if (response.status === 401 && options.auth) {
    clearAdminToken();
  }

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = (await response.json()) as { message?: string; error?: string };
      message = data.message ?? data.error ?? message;
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  if (!text) return undefined as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined as T;
  }
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const data = await apiRequest<{ url: string }>("/admin/upload", {
    method: "POST",
    body: form,
    auth: true,
  });
  return data.url;
}
