import { api } from "@/lib/http";
import { setAuth, type AuthUser } from "@/lib/auth";

type LoginPayload = { username: string; password: string };

type LoginResponse = {
  data: {
    token: string;
    user?: AuthUser;
  };
  message?: string;
};

export async function login(payload: LoginPayload) {
  const res = await api<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const token = res?.data?.token;
  const user = res?.data?.user;

  if (!token) throw new Error("Token tidak ditemukan dari response login");
  setAuth(token, user);

  return { token, user };
}

type ProfileResponse = { data: AuthUser; message?: string };

export async function getProfile() {
  const res = await api<ProfileResponse>("/auth/profile");
  const token = localStorage.getItem("token");
  if (token) setAuth(token, res.data);
  return res.data;
}