"use client";

import LogoMark from "~/components/branding/logo";

type DashboardHeaderProps = {
  fullName: string;
};

export default function DashboardHeader({
  fullName,
}: DashboardHeaderProps) {
  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .map(
        (name) => name[0],
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
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

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] text-[#D6C4A3]">
              {fullName}
            </p>

            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-[#68645D]">
              Workspace
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A9854F]/30 bg-[#17130F] font-serif text-[13px] text-[#D6C4A3]">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}