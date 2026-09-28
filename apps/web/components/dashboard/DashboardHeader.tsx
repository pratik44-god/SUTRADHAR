"use client";

import {
  ChevronDown,
  LogOut,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import LogoMark from "~/components/branding/logo";
import {
  useLogin,
  useLogout,
} from "~/hooks/api/auth/index";

type DashboardHeaderProps = {
  fullName: string;
  email: string;
};

export default function DashboardHeader({
  fullName,
  email,
}: DashboardHeaderProps) {
  const router = useRouter();

  const [isAccountMenuOpen, setIsAccountMenuOpen] =
    useState(false);

  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] =
    useState(false);

  const accountMenuRef =
    useRef<HTMLDivElement>(null);

  const {
    getGoogleAuthUrlAsync,
    status: loginStatus,
  } = useLogin();

  const {
    logoutAsync,
    status: logoutStatus,
  } = useLogout();

  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const handleAccountMenu = () => {
    setIsAccountMenuOpen(
      (previous) => !previous,
    );
  };

  const handleAddAnotherAccount = async () => {
    if (loginStatus === "pending") {
      return;
    }

    try {
      const result =
        await getGoogleAuthUrlAsync();

      if (result?.authUrl) {
        window.location.href =
          result.authUrl;
      }
    } catch (error) {
      console.error(
        "Failed to start Google login:",
        error,
      );
    }
  };

  const handleLogoutClick = () => {
    setIsAccountMenuOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  const handleCancelLogout = () => {
    if (logoutStatus === "pending") {
      return;
    }

    setIsLogoutConfirmOpen(false);
  };

  const handleConfirmLogout = async () => {
    if (logoutStatus === "pending") {
      return;
    }

    try {
      await logoutAsync();

      setIsLogoutConfirmOpen(false);

      router.replace("/googlelogin");
    } catch (error) {
      console.error(
        "Logout failed:",
        error,
      );
    }
  };

  return (
    <>
      <header className="h-[76px] border-b border-[#A9854F]/10 bg-[#090B0A]">
        <div className="flex h-full items-center justify-between px-7">
          <div className="flex items-center gap-4">
            <LogoMark size={42} />

            <div>
              <p className="font-serif text-[20px] leading-none text-[#F0E6D2]">
                Sutradhara
              </p>

              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-[#71695D]">
                Visual thinking workspace
              </p>
            </div>
          </div>

          <div
            ref={accountMenuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={handleAccountMenu}
              className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition hover:border-[#A9854F]/15 hover:bg-[#17130F]"
              aria-expanded={
                isAccountMenuOpen
              }
              aria-haspopup="menu"
            >
              <div className="hidden text-right sm:block">
                <p className="text-[13px] text-[#D6C4A3]">
                  {fullName}
                </p>

                <p className="mt-1 max-w-[220px] truncate font-mono text-[8px] uppercase tracking-[0.12em] text-[#68645D]">
                  {email}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A9854F]/30 bg-[#17130F] font-serif text-[13px] text-[#D6C4A3]">
                {initials}
              </div>

              <ChevronDown
                size={14}
                className={`text-[#827B70] transition-transform ${
                  isAccountMenuOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {isAccountMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[100] w-[290px] overflow-hidden rounded-2xl border border-[#A9854F]/20 bg-[#17130F] shadow-2xl shadow-black/40">
                <div className="p-2">
                  <div className="rounded-xl bg-[#211A13] px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A9854F]/30 bg-[#0F0D0A] font-serif text-[12px] text-[#D6C4A3]">
                        {initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] text-[#F0E6D2]">
                          {fullName}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-[#827B70]">
                          {email}
                        </p>
                      </div>

                      <div className="h-2 w-2 rounded-full bg-[#A9854F]" />
                    </div>
                  </div>
                </div>

                <div className="mx-3 border-t border-[#A9854F]/10" />

                <div className="p-2">
                  <button
                    type="button"
                    onClick={
                      handleAddAnotherAccount
                    }
                    disabled={
                      loginStatus ===
                      "pending"
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[#D6C4A3] transition hover:bg-[#211A13] hover:text-[#F0E6D2] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#A9854F]/15 bg-[#0F0D0A]">
                      <Plus size={15} />
                    </span>

                    <span className="flex flex-col">
                      <span className="text-[12px]">
                        {loginStatus ===
                        "pending"
                          ? "Connecting..."
                          : "Add another account"}
                      </span>

                      <span className="mt-0.5 text-[9px] text-[#827B70]">
                        Sign in with Google
                      </span>
                    </span>
                  </button>
                </div>

                <div className="mx-3 border-t border-[#A9854F]/10" />

                <div className="p-2">
                  <button
                    type="button"
                    onClick={
                      handleLogoutClick
                    }
                    disabled={
                      logoutStatus ===
                      "pending"
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[#B39A72] transition hover:bg-[#2A1713] hover:text-[#E5B09A] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#A9854F]/10 bg-[#0F0D0A]">
                      <LogOut size={14} />
                    </span>

                    <span className="text-[12px]">
                      Log out
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {isLogoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 px-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCancelLogout();
            }
          }}
        >
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-[#A9854F]/20 bg-[#17130F] shadow-2xl shadow-black/50">
            <div className="border-b border-[#A9854F]/10 px-6 py-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#A9854F]">
                Sutradhara
              </p>

              <h2 className="mt-1.5 font-serif text-xl text-[#F0E6D2]">
                Log out?
              </h2>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm leading-6 text-[#B39A72]">
                Are you sure you want to log
                out of Sutradhara?
              </p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={
                    handleCancelLogout
                  }
                  disabled={
                    logoutStatus ===
                    "pending"
                  }
                  className="rounded-lg border border-[#A9854F]/15 px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#B39A72] transition hover:border-[#A9854F]/30 hover:bg-[#211A13] hover:text-[#F0E6D2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleConfirmLogout
                  }
                  disabled={
                    logoutStatus ===
                    "pending"
                  }
                  className="rounded-lg bg-[#A9854F] px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#0F0D0A] transition hover:bg-[#C49A5A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {logoutStatus ===
                  "pending"
                    ? "Logging out..."
                    : "Log out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}