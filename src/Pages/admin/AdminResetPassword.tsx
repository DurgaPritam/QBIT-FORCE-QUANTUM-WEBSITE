import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { apiRequest } from "../../api/client";
import { loadingScreenLogoUrl } from "../../content/mediaHub";

export default function AdminResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: { token, newPassword: password },
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafbff] px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-xl">
        <img src={loadingScreenLogoUrl} alt="Qbit Force" className="mx-auto mb-4 h-12 w-12 rounded-lg" />

        {done ? (
          <div className="text-center">
            <h1 className="font-display text-xl font-bold text-navy">Password Updated</h1>
            <p className="mt-2 text-sm text-text-muted">You can now sign in with your new password.</p>
            <Link
              to="/qbitadmin-2026-login"
              className="mt-6 inline-flex rounded-full bg-petal px-6 py-2.5 text-sm font-bold text-white hover:bg-petal-hover"
            >
              Go to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-center font-display text-xl font-bold text-navy">Set New Password</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="New password"
                  className="w-full rounded-xl border border-border px-4 py-3 pr-12 text-sm focus:border-navy focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none"
              />
              {error && <p className="text-sm text-petal" role="alert">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-petal py-3 text-sm font-bold text-white hover:bg-petal-hover disabled:opacity-50"
              >
                {loading ? "Updating…" : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
