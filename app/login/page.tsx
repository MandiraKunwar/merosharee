"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Landmark,
  User,
  LockOpen,
} from "lucide-react";

import { BsFillExclamationTriangleFill } from "react-icons/bs";
import SearchableSelect from "@/app/components/SearchableSelect";
import { DP } from "@/app/data/dpList";

export default function LoginPage() {
  const [dp, setDp] = useState<DP | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!dp || !username || !password) {
      return; // Stop execution and display the warning icons
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dp, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed.");
      } else {
        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Input styling matching Mero Share
  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "35px",
    backgroundColor: "#ffffff",
    border: "1px solid #d7dde3",
    borderRadius: "3px",
    color: "#151B1E",
    fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
    fontSize: "14px",
    paddingLeft: "10px",
    paddingRight: "35px", // Extra space for the warning icon
    outline: "none",
  };

  // Label styling matching DevTools (12.8px, #FAFAFA)
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
    fontSize: "12.8px",
    color: "#FAFAFA",
    fontWeight: 400,
  };

  return (
    <div className="min-h-screen bg-[#333a56] flex flex-col items-center justify-center p-4 select-none">
      <main
        className="w-full bg-[#333a56] shadow-[0_8px_24px_rgba(0,0,0,.38)] -translate-y-3"
        style={{
          maxWidth: "420px",
          paddingTop: "28px",
          paddingRight: "32px",
          paddingBottom: "24px",
          paddingLeft: "32px",
          marginTop: "24px",
          marginBottom: "24px",
          borderRadius: "6px",
        }}
      >
        {/* Mero Share Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/image.png"
            alt="Mero Share Logo"
            width={200}
            height={42}
            priority
            className="object-contain h-auto"
          />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Depository Participants */}
          <div>
            <label
              className="flex items-center gap-[6px] mb-1.5"
              style={labelStyle}
            >
              <Landmark size={18} strokeWidth={1.75} className="shrink-0 text-[#FAFAFA]" />
              <span>Depository Participants</span>
            </label>
            <div className="h-[35px]">
              <SearchableSelect value={dp} onChange={setDp} />
            </div>
          </div>

          {/* Username */}
          <div>
            <label
              className="flex items-center gap-[6px] mb-1.5"
              style={labelStyle}
            >
              <User size={18} strokeWidth={1.75} className="shrink-0 text-[#FAFAFA]" />
              <span>Username</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                autoComplete="username"
              />
              {attemptedSubmit && !username && (
                  <BsFillExclamationTriangleFill
                      size={15}
                      className="absolute right-[11px] top-1/2 -translate-y-1/2 text-[#F3B300]"
                  />
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="flex items-center gap-[6px] mb-1.5"
              style={labelStyle}
            >
              <LockOpen
                size={18}
                strokeWidth={1.8}
                className="shrink-0 text-[#FAFAFA]"
              />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                autoComplete="current-password"
              />
              {attemptedSubmit && !password && (
                  <BsFillExclamationTriangleFill
                      size={15}
                      className="absolute right-[11px] top-1/2 -translate-y-1/2 text-[#F3B300]"
                  />
              )}
            </div>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#566594] hover:bg-[#4b5984] text-white font-medium text-[14px] h-[36px] rounded transition cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
              style={{
                fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center pt-2">
            <Link
              href="/forgot-password"
              className="text-[#FAFAFA] hover:underline text-[12.8px]"
              style={{
                fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
              }}
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer
        className="text-[#FAFAFA] text-center text-[13.2px] -translate-y-3"
        style={{
          fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
        }}
      >
        © 2026 CDS and Clearing Limited. All Rights Reserved
      </footer>
    </div>
  );
}