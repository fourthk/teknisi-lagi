import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/api/auth";
import { Eye, EyeOff } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Username dan password wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await login({ username: username.trim(), password });

      toast({
        title: "Berhasil",
        description: "Login berhasil",
      });

      navigate("/dashboard", { replace: true });
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
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #253040 0%, #4B6184 100%)" }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl animate-fadeIn">
        
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/src/assets/logo-sakti.png"
            className="h-20 mx-auto drop-shadow-lg"
            alt="SAKTI"
          />
          <h1 className="text-2xl font-bold mt-4 text-[#253040]">
            Change & Configuration Management
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Username
            </label>
            <Input
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100"
              autoComplete="username"
            />
          </div>

          {/* Password + Toggle */}
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Password
            </label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 pr-10"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forget Password */}
            <p
              className="text-xs text-[#253040] mt-2 text-right cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Lupa Password?
            </p>
          </div>

          {/* Button Login */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            style={{ backgroundColor: "#253040" }}
          >
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 SAKTI – Pemerintah Kota • All Rights Reserved
        </p>
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
