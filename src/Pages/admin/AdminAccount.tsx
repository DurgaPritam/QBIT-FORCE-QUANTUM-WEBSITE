import { useState, type FormEvent } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { apiRequest } from "../../api/client";
import { AdminPageShell } from "./adminShared";
import { inputClass } from "./adminFormDefaults";

export default function AdminAccount() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const res = await apiRequest<{ message: string }>("/admin/change-password", {
        method: "POST",
        auth: true,
        body: { currentPassword, newPassword },
      });
      setMessage(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    }
  };

  return (
    <AdminPageShell title="Account" error={error} subtitle="Change your admin password">
      <form onSubmit={handleSubmit} className="grid max-w-lg gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <input
            type={showPasswords ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            required
            className={inputClass}
          />
        </div>
        <input
          type={showPasswords ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
          minLength={8}
          className={inputClass}
        />
        <input
          type={showPasswords ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          minLength={8}
          className={inputClass}
        />
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button type="submit" className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">
            Update password
          </button>
          <button
            type="button"
            onClick={() => setShowPasswords((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm text-navy hover:text-petal"
          >
            {showPasswords ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            {showPasswords ? "Hide" : "Show"} passwords
          </button>
        </div>
        {message && <p className="text-sm text-navy sm:col-span-2">{message}</p>}
      </form>
    </AdminPageShell>
  );
}
