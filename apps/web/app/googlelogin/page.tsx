"use client";

import { useState } from "react";
import Link from "next/link";

import { useLogin } from "~/hooks/api/auth/index";
import LogoMark from "~/components/branding/logo"

// function LogoMark({ size = 48 }: { size?: number }) {
//   return (
//     <div
//       className="relative flex shrink-0 items-center justify-center rounded-2xl border border-[#A9854F]/30 bg-[#17130F]"
//       style={{ width: size, height: size }}
//     >
//       <svg
//         width={size * 0.68}
//         height={size * 0.68}
//         viewBox="0 0 48 48"
//         fill="none"
//       >
//         {/* Outer thread */}
//         <path
//           d="M24 4
//              C34 4 44 14 44 24
//              C44 34 34 44 24 44
//              C14 44 4 34 4 24
//              C4 14 14 4 24 4Z"
//           stroke="#A9854F"
//           strokeWidth="1.2"
//           strokeDasharray="2 4"
//           opacity="0.7"
//         />

//         {/* Four connected petals */}
//         <path
//           d="M24 8
//              C28 15 28 20 24 24
//              C20 20 20 15 24 8Z"
//           stroke="#D6C4A3"
//           strokeWidth="1.4"
//         />

//         <path
//           d="M40 24
//              C33 28 28 28 24 24
//              C28 20 33 20 40 24Z"
//           stroke="#D6C4A3"
//           strokeWidth="1.4"
//         />

//         <path
//           d="M24 40
//              C20 33 20 28 24 24
//              C28 28 28 33 24 40Z"
//           stroke="#D6C4A3"
//           strokeWidth="1.4"
//         />

//         <path
//           d="M8 24
//              C15 20 20 20 24 24
//              C20 28 15 28 8 24Z"
//           stroke="#D6C4A3"
//           strokeWidth="1.4"
//         />

//         {/* Diagonal thread */}
//         <path
//           d="M13 13
//              C18 18 20 20 24 24
//              C28 28 30 30 35 35"
//           stroke="#9A6847"
//           strokeWidth="1"
//           strokeLinecap="round"
//         />

//         <path
//           d="M35 13
//              C30 18 28 20 24 24
//              C20 28 18 30 13 35"
//           stroke="#9A6847"
//           strokeWidth="1"
//           strokeLinecap="round"
//         />

//         {/* Center structure */}
//         <rect
//           x="20"
//           y="20"
//           width="8"
//           height="8"
//           rx="1.5"
//           transform="rotate(45 24 24)"
//           fill="#17130F"
//           stroke="#A9854F"
//           strokeWidth="1.5"
//         />

//         {/* Center point */}
//         <circle
//           cx="24"
//           cy="24"
//           r="2"
//           fill="#F0E6D2"
//         />

//         {/* Four outer nodes */}
//         <circle
//           cx="24"
//           cy="8"
//           r="1.5"
//           fill="#A9854F"
//         />

//         <circle
//           cx="40"
//           cy="24"
//           r="1.5"
//           fill="#A9854F"
//         />

//         <circle
//           cx="24"
//           cy="40"
//           r="1.5"
//           fill="#A9854F"
//         />

//         <circle
//           cx="8"
//           cy="24"
//           r="1.5"
//           fill="#A9854F"
//         />
//       </svg>
//     </div>
//   );
// }
<LogoMark/>

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.78-.07-1.53-.22-2.25H12v4.26h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.39Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.36l3.24-2.52Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.23 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.52C6.31 7.85 8.46 6.13 12 6.13Z"
      />
    </svg>
  );
}

function ThreadLine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        viewBox="0 0 900 900"
        fill="none"
      >
        <path
          d="M80 640 C210 520 190 340 350 280 C500 225 590 370 760 250"
          stroke="#A9854F"
          strokeWidth="1"
          strokeDasharray="6 10"
        />

        <path
          d="M100 300 C240 390 350 440 470 330 C580 230 660 330 800 470"
          stroke="#9A6847"
          strokeWidth="0.8"
          strokeDasharray="5 12"
        />

        <circle
          cx="350"
          cy="280"
          r="4"
          fill="#A9854F"
        />

        <circle
          cx="470"
          cy="330"
          r="3"
          fill="#D6C4A3"
        />

        <circle
          cx="760"
          cy="250"
          r="4"
          fill="#9A6847"
        />
      </svg>
    </div>
  );
}

export default function GoogleLoginPage() {
  const { getGoogleAuthUrlAsync, isError, error, status } = useLogin();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);

      const result = await getGoogleAuthUrlAsync();

      const authUrl =
        typeof result === "string"
          ? result
          : result?.authUrl;

      if (!authUrl) {
        throw new Error(
          "Google authentication URL was not returned.",
        );
      }

      window.location.href = authUrl;
    } catch (loginError) {
      console.error("Google login failed:", loginError);
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F0D0A] text-[#F0E6D2]">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.18]"
        style={{
          backgroundImage: "url('/rachana-hero.png')",
        }}
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#0F0D0A]/80" />

      {/* Golden ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9854F]/[0.035] blur-[140px]" />

      <ThreadLine />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-[#A9854F]/10 bg-[#0F0D0A]/60 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <LogoMark size={38} />

            <div>
              <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#F0E6D2]">
                Sutradhara
              </div>

              <div className="font-mono text-[7px] uppercase tracking-[0.24em] text-[#B39A72]/50">
                Visual thinking
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#B39A72]/60 transition hover:text-[#F0E6D2]"
          >
            <span>Back to home</span>

            <ArrowIcon />
          </Link>
        </div>
      </nav>

      {/* Login */}
      <section className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-[470px]">
          {/* Top label */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex justify-center">
              <LogoMark size={72} />
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#A9854F]">
              Enter the workspace
            </p>

            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.04em] text-[#F0E6D2] sm:text-5xl">
              Follow your
              <br />
              <span className="text-[#A9854F]">
                thread.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-[#B39A72]/60">
              Continue to Sutradhara and turn your ideas,
              systems and architecture into something you can
              see.
            </p>
          </div>

          {/* Login card */}
          <div className="relative overflow-hidden rounded-[28px] border border-[#A9854F]/20 bg-[#17130F]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
            {/* Card glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-[#A9854F]/[0.06] blur-[70px]" />

            <div className="relative">
              <div className="mb-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#A9854F]/10" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B39A72]/40">
                  Sign in
                </span>

                <div className="h-px flex-1 bg-[#A9854F]/10" />
              </div>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={
                  isLoggingIn || status === "pending"
                }
                className="group flex min-h-[68px] w-full items-center justify-center gap-4 rounded-2xl border border-[#A9854F]/25 bg-[#F0E6D2] px-6 text-sm font-medium text-[#17130F] shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                  <GoogleIcon />
                </div>

                <span className="text-[14px]">
                  {isLoggingIn || status === "pending"
                    ? "Connecting to Google..."
                    : "Continue with Google"}
                </span>

                {!isLoggingIn &&
                  status !== "pending" && (
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  )}
              </button>

              {/* Error */}
              {isError && (
                <div className="mt-4 rounded-xl border border-red-900/30 bg-red-950/20 px-4 py-3">
                  <p className="text-center text-xs leading-5 text-red-300/75">
                    {error?.message ||
                      "Unable to connect to Google. Please try again."}
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#A9854F]/10" />

                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#B39A72]/30">
                  Secure access
                </span>

                <div className="h-px flex-1 bg-[#A9854F]/10" />
              </div>

              {/* Security information */}
              <div className="rounded-xl border border-[#A9854F]/10 bg-[#0F0D0A]/50 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#A9854F]/15 bg-[#17130F]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A9854F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />

                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                      <circle
                        cx="12"
                        cy="15"
                        r="1"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#D6C4A3]">
                      One account. One workspace.
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#B39A72]/45">
                      Sign in securely with your Google
                      account. Your Sutradhara workspace will
                      be connected to your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="mt-6 text-center text-[10px] leading-5 text-[#B39A72]/35">
                By continuing, you agree to use Sutradhara
                responsibly and keep your workspace secure.
              </p>
            </div>
          </div>

          {/* Bottom principle */}
          <div className="mt-8 text-center">
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#A9854F]/50">
              विचार · योजना · रचना · संपूर्णता
            </p>

            <p className="mt-2 text-[11px] text-[#B39A72]/30">
              Think it. Structure it. Build it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}