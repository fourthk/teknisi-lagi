export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://sakti-backend-674826252080.asia-southeast2.run.app";

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API Error");
  }

  return response.json(); 
};

export const getAuthToken = () => localStorage.getItem("token");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};