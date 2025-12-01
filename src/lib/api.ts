export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://sakti-backend-674826252080.asia-southeast2.run.app";

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    accept: "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
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
