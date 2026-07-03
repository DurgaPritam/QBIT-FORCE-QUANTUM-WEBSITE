import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import AnimatedLoginFace from "../../Components/AnimatedLoginFace";
import { apiRequest, enforceAdminSession, getAdminToken, setAdminSession } from "../../api/client";
import { loadingScreenLogoUrl } from "../../content/mediaHub";
import type { LoginResponse } from "../../api/types";

type View = "login" | "forgot";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (getAdminToken() && enforceAdminSession()) {
    return <Navigate to="/qbitadmin-2026-login/dashboard/home" replace />;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: { username: email.trim(), password },
      });
      setAdminSession(data.accessToken, data.expiresIn);
      navigate("/qbitadmin-2026-login/dashboard/home", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const data = await apiRequest<{ message: string }>("/auth/forgot-password", {
        method: "POST",
        body: { email: email.trim() },
      });
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,1,127,0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(232,74,95,0.12), transparent), #fafbff",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(rgba(0,1,127,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,1,127,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <a
        href="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-navy no-underline shadow-sm backdrop-blur-md transition hover:border-petal hover:text-petal sm:left-6 sm:top-6"
      >
        <HiOutlineHome className="text-base" /> Home
      </a>
      <div className="relative z-10 w-full min-w-0 max-w-md">
      {view === "login" ? (
        <div className="w-full min-w-0 rounded-3xl border border-white/60 bg-white/80 p-1 shadow-2xl shadow-navy/10 backdrop-blur-xl">
        <AnimatedLoginFace
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          onForgotPassword={() => {
            setView("forgot");
            setError(null);
            setMessage(null);
          }}
          loading={loading}
          error={error}
        />
        </div>
      ) : (
        <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl shadow-navy/10 backdrop-blur-xl">
          <img src={loadingScreenLogoUrl} alt="Qbit Force" className="mx-auto mb-4 h-12 w-12 rounded-lg" />
          <h1 className="text-center font-display text-xl font-bold text-navy">Reset Password</h1>
          <p className="mt-2 text-center text-sm text-text-muted">
            Enter your admin email. We&apos;ll send a reset link.
          </p>

          <form onSubmit={handleForgot} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="venkataniharbillakurthi@gmail.com"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none"
            />
            {error && <p className="text-sm text-petal" role="alert">{error}</p>}
            {message && <p className="text-sm text-navy" role="status">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-petal py-3 text-sm font-bold text-white hover:bg-petal-hover disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={() => setView("login")}
              className="w-full text-sm text-navy hover:text-petal"
            >
              ← Back to sign in
            </button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}
