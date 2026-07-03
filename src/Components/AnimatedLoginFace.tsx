import { useEffect, useRef, useState, type FormEvent } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { loadingScreenLogoUrl } from "../content/mediaHub";

/** Framer Animated Login Face — https://framer.com/m/Face-CBkL5Y.js@n1ZlSq3ddpVn3wEP2kmM */

type EyeProps = {
  isClosed: boolean;
  bgColor: string;
  size: number;
};

function Eye({ isClosed, bgColor, size }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  const eyeW = size * 1.5;
  const eyeH = size;
  const pupilR = size * 0.55;
  const maxTravel = size * 0.18;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!eyeRef.current || isClosed) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const clamp = Math.min(maxTravel / dist, 1);
      setPupil({ x: dx * clamp, y: dy * clamp });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isClosed, maxTravel]);

  useEffect(() => {
    if (isClosed) setPupil({ x: 0, y: 0 });
  }, [isClosed]);

  return (
    <div
      ref={eyeRef}
      style={{
        position: "relative",
        width: eyeW,
        height: eyeH,
        borderRadius: eyeH * 0.8,
        background: "white",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 4px 20px rgba(0, 1, 127, 0.2)",
      }}
      aria-hidden
    >
      <div
        style={{
          position: "absolute",
          width: pupilR,
          height: pupilR,
          borderRadius: "50%",
          background: "#00017f",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))`,
          transition: isClosed ? "transform 0.2s ease" : "transform 0.04s linear",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: pupilR * 0.28,
            height: pupilR * 0.28,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.55)",
            top: "14%",
            left: "18%",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: bgColor,
          borderRadius: `${eyeH * 0.2}px ${eyeH * 0.2}px 0 0`,
          height: isClosed ? "98%" : "0%",
          transition: "height 0.30s cubic-bezier(0.55, 0, 0.45, 1)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: bgColor,
          borderRadius: `0 0 ${eyeH * 0.6}px ${eyeH * 0.6}px`,
          height: isClosed ? "12%" : "0%",
          transition: "height 0.30s cubic-bezier(0.55, 0, 0.45, 1)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

type AnimatedLoginFaceProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onForgotPassword: () => void;
  loading?: boolean;
  error?: string | null;
};

const BACKGROUND = "linear-gradient(145deg, #00017f 0%, #000b29 55%, #000010 100%)";
const EYE_BG = "#000b29";
const EYE_SIZE = 58;

export default function AnimatedLoginFace({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  loading = false,
  error = null,
}: AnimatedLoginFaceProps) {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const eyesClosed = passwordFocused && !showPassword;

  return (
    <div
      className="font-display"
      style={{
        width: "100%",
        maxWidth: 420,
        minHeight: 520,
        minWidth: 0,
        background: BACKGROUND,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        boxShadow: "0 24px 80px rgba(0, 1, 127, 0.35)",
        padding: "2.5rem 2rem",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "rgba(255, 30, 38, 0.12)",
          filter: "blur(40px)",
        }}
      />

      <img
        src={loadingScreenLogoUrl}
        alt="Qbit Force"
        className="relative z-10 mx-auto h-14 w-14 rounded-xl object-contain"
      />
      <p className="relative z-10 mx-auto mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        Secure Admin Portal
      </p>

      <div
        className="mx-auto"
        style={{
          display: "flex",
          gap: EYE_SIZE * 0.55,
          marginTop: 20,
          marginBottom: EYE_SIZE * 0.65,
          alignItems: "flex-end",
        }}
      >
        <Eye isClosed={eyesClosed} bgColor={EYE_BG} size={EYE_SIZE} />
        <Eye isClosed={eyesClosed} bgColor={EYE_BG} size={EYE_SIZE} />
      </div>

      <form onSubmit={onSubmit} className="relative z-10 flex w-full min-w-0 flex-col gap-3">
        <div className="box-border w-full min-w-0 rounded-[10px] border border-navy/10 bg-white/[0.97] px-4 py-3">
          <label
            htmlFor="admin-email"
            className="mb-1 block select-none text-[10px] text-[#5c6378]"
          >
            Email
          </label>
          <div className="flex w-full min-w-0 items-center">
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              placeholder="admin@email.com"
              className="block min-w-0 flex-1 border-0 bg-transparent p-0 text-[17px] text-[#1a1f36] outline-none ring-0 focus:outline-none focus:ring-0"
              style={{ fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div className="box-border w-full min-w-0 rounded-[10px] border border-navy/10 bg-white/[0.97] px-4 py-3">
          <label
            htmlFor="admin-password"
            className="mb-1 block select-none text-[10px] text-[#5c6378]"
          >
            Password
          </label>
          <div className="flex w-full min-w-0 items-center gap-2">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              placeholder="••••••••"
              className="block min-w-0 flex-1 border-0 bg-transparent p-0 text-[17px] text-[#1a1f36] outline-none ring-0 focus:outline-none focus:ring-0"
              style={{ fontFamily: "inherit", boxSizing: "border-box" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-1 text-navy/50 transition hover:bg-navy/5 hover:text-navy"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HiOutlineEyeOff className="h-5 w-5" aria-hidden />
              ) : (
                <HiOutlineEye className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="cursor-pointer border-none bg-transparent text-xs text-white/70 underline-offset-2 hover:text-petal hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p
            className="rounded-lg border border-petal/40 bg-petal/10 px-3 py-2 text-center text-sm text-petal"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full cursor-pointer rounded-lg border-none bg-petal py-4 text-base font-bold tracking-wide text-white transition hover:bg-petal-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
