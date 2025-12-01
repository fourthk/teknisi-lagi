import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import saktiLogo from "@/assets/sakti-logo.png";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Username dan password harus diisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Login gagal");

      const token = result?.data?.token;
      const user = result?.data?.user;

      if (!token) throw new Error("Token tidak ditemukan");

      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      toast({ title: "Berhasil", description: "Login berhasil" });
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#253040] to-[#4B6184]">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl animate-fade-in">
        {/* LOGO */}
        <div className="text-center mb-6">
          <img
            src={saktiLogo}
            alt="SAKTI Logo"
            className="h-20 mx-auto drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold mt-4 text-[#253040]">
            Change & Configuration Management
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Username
            </label>
            <Input
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border-gray-300"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-[#253040] hover:bg-[#1a2330]"
          >
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 SAKTI – Pemerintah Kota • All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
