"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchableSelect from "@/app/components/SearchableSelect";
import { DP } from "@/app/data/dpList";

export default function ForgotPasswordPage() {
  const [dp, setDp] = useState<DP | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  
  const [emailError, setEmailError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    if (val && !val.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function handleDobChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDob(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage("");

    if (!email.includes("@")) {
      setEmailError(true);
      return;
    }

    // Check date pattern on submit or display "Invalid date"
    const datePattern = /^(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}[-/]\d{2}[-/]\d{4})$/;
    if (!dob || !datePattern.test(dob)) {
      setDob("Invalid date");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dp, username, email, dob }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSuccessMessage(data.error || "The information you have provided doesn't match with the registered information.");
      } else {
        setSuccessMessage("The verification email has been sent to your mailbox. Please check it.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("An error occurred during processing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "38px",
    backgroundColor: "#ffffff",
    border: "1px solid #dcdfe6",
    borderRadius: "4px",
    color: "#1f2937",
    fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
    fontSize: "13.5px",
    paddingLeft: "11px",
    paddingRight: "11px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
    fontSize: "13px",
    color: "#4b5563",
    fontWeight: 500,
  };

  return (
    <div className="min-h-screen bg-[#323a4d] flex flex-col items-center justify-between pt-5 pb-8 px-4 select-none box-border">
      {/* Upper Section: Logo + Form Card */}
      <div className="w-full flex flex-col items-center">
        {/* Mero Share Logo */}
        <div className="flex justify-center mb-3">
          <Image
            src="/image.png"
            alt="Mero Share Logo"
            width={190}
            height={42}
            priority
            className="object-contain h-auto"
          />
        </div>

        {/* Form Card */}
        <main
          className="w-full bg-white shadow-2xl"
          style={{
            maxWidth: "420px",
            color: "#151B1E",
            fontFamily:
              "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
            paddingTop: "22px",
            paddingRight: "30px",
            paddingBottom: "22px",
            paddingLeft: "30px",
            borderRadius: "8px",
          }}
        >
          {/* Header Title & Subtext */}
          <h1
            className="text-[#000000] font-bold text-[20px] tracking-tight mb-0.5"
            style={{
              fontFamily:
                "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
            }}
          >
            Reset your Password
          </h1>
          <p
            className="text-[#8892a0] text-[13px] mb-3.5 leading-snug"
            style={{
              fontFamily:
                "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
            }}
          >
            The verification email will be sent to your mailbox.Please check it.
          </p>

          {/* Success Message Banner */}
          {successMessage && (
            <div className="mb-3.5 p-3 text-[13px] rounded bg-[#5cb85c] text-white">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* 1. Depository Participants */}
            <div className="w-full">
              <label
                className="flex items-center gap-[6px] mb-1"
                style={labelStyle}
              >
                <svg
                  className="w-3.5 h-3.5 text-[#4b5563] shrink-0 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21h18M3 10h18M12 3L2 9h20L12 3zM8 14v5m4-5v5m4-5v5"
                  />
                </svg>
                <span>Depository Participants</span>
              </label>
              <div className="w-full min-h-[38px] [&>div]:w-full [&_button]:w-full [&_input]:w-full">
                <SearchableSelect value={dp} onChange={setDp} />
              </div>
            </div>

            {/* 2. Username */}
            <div className="w-full">
              <label
                className="flex items-center gap-[6px] mb-1"
                style={labelStyle}
              >
                <svg
                  className="w-3.5 h-3.5 text-[#4b5563] shrink-0 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                autoComplete="username"
              />
            </div>

            {/* 3. Email */}
            <div className="w-full">
              <label
                className="flex items-center gap-[6px] mb-1"
                style={labelStyle}
              >
                <svg
                  className="w-3.5 h-3.5 text-[#4b5563] shrink-0 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    ...inputStyle,
                    borderColor: emailError ? "#e6a23c" : "#dcdfe6",
                  }}
                  autoComplete="email"
                />
                {emailError && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e6a23c] flex items-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* 4. Date of Birth (Shows "Invalid date" on submit if pattern fails, fully editable) */}
            <div className="w-full">
              <label
                className="flex items-center gap-[6px] mb-1"
                style={labelStyle}
              >
                <svg
                  className="w-3.5 h-3.5 text-[#4b5563] shrink-0 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Date of Birth</span>
              </label>
              <input
                type="text"
                value={dob}
                onChange={handleDobChange}
                placeholder="MM/DD/YYYY"
                style={{
                  ...inputStyle,
                  color: dob === "Invalid date" ? "#a8a8a8" : "#1f2937",
                  borderColor: dob === "Invalid date" ? "#f56c6c" : "#dcdfe6",
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3.5 space-y-2.5">
              {/* Send Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-medium text-[14px] h-[38px] rounded-[5px] transition cursor-pointer hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "#808690",
                  fontFamily:
                    "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
                }}
              >
                {isLoading ? "Processing..." : "Send"}
              </button>

              {/* Back Button */}
              <Link
                href="/"
                className="w-full text-white font-medium text-[14px] h-[38px] rounded-[5px] transition flex items-center justify-center cursor-pointer block text-center hover:opacity-90"
                style={{
                  backgroundColor: "#606772",
                  fontFamily:
                    "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
                }}
              >
                Back
              </Link>
            </div>
          </form>
        </main>
      </div>

      {/* Footer Text */}
      <footer
        className="text-[#ffffff] text-center text-[12.78px] font-medium mt-6"
        style={{
          fontFamily:
            "var(--font-roboto-condensed), 'Roboto Condensed', sans-serif",
        }}
      >
        © 2026 CDS and Clearing Limited. All Rights Reserved
      </footer>
    </div>
  );
}