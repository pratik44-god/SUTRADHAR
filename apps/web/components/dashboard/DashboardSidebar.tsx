"use client";

import type { DashboardSection } from "~/app/dashboard/page";

type DashboardSidebarProps = {
  activeSection: DashboardSection;
  projectCount: number;
  onSectionChange: (
    section: DashboardSection,
  ) => void;
};

export default function DashboardSidebar({
  activeSection,
  projectCount,
  onSectionChange,
}: DashboardSidebarProps) {
  const handleOverviewClick = () => {
    onSectionChange("home");
  };

  const handleProjectsClick = () => {
    onSectionChange("projects");
  };

  const handleSharedClick = () => {
    onSectionChange("shared");
  };

  const handleArchiveClick = () => {
    onSectionChange("archive");
  };

  const handleTeamClick = () => {
    onSectionChange("team");
  };

  return (
    <aside className="border-r border-[#A9854F]/10 bg-[#0B0D0C]">
      <div className="flex h-full min-h-[calc(100vh-76px)] flex-col px-5 py-6">
        <div>
          <p className="px-3 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[#625D54]">
            Workspace
          </p>

          <div className="mt-3 space-y-1.5">
            <SidebarItem
              label="Overview"
              icon={<HomeIcon />}
              active={
                activeSection === "home"
              }
              onClick={
                handleOverviewClick
              }
            />

            <SidebarItem
              label="Projects"
              count={projectCount}
              icon={<ProjectIcon />}
              active={
                activeSection === "projects"
              }
              onClick={
                handleProjectsClick
              }
            />

            <SidebarItem
              label="Shared with me"
              icon={<SharedIcon />}
              active={
                activeSection === "shared"
              }
              onClick={
                handleSharedClick
              }
            />

            <SidebarItem
              label="Archive"
              icon={<ArchiveIcon />}
              active={
                activeSection === "archive"
              }
              onClick={
                handleArchiveClick
              }
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="px-3 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[#625D54]">
            Collaboration
          </p>

          <div className="mt-3">
            <SidebarItem
              label="Team"
              icon={<TeamIcon />}
              active={
                activeSection === "team"
              }
              onClick={
                handleTeamClick
              }
            />
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17]">
                <ThreadIcon />
              </div>

              <div>
                <p className="text-[12px] font-medium text-[#D6CBB9]">
                  Sutradhara
                </p>

                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-[#67635B]">
                  Workspace ready
                </p>
              </div>
            </div>

            <div className="mt-4 h-px bg-[#A9854F]/10" />

            <p className="mt-3 text-[10px] leading-5 text-[#77736B]">
              Give every thought a
              structure, then let the
              structure evolve.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

type SidebarItemProps = {
  label: string;
  count?: number;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

function SidebarItem({
  label,
  count,
  icon,
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition ${
        active
          ? "border border-[#A9854F]/20 bg-[#1A1712] text-[#E8DDCA]"
          : "border border-transparent text-[#89847A] hover:border-[#A9854F]/10 hover:bg-[#121513] hover:text-[#C9BEAC]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={
            active
              ? "text-[#C49A5A]"
              : "text-[#716C63]"
          }
        >
          {icon}
        </div>

        <span className="text-[13px] font-medium">
          {label}
        </span>
      </div>

      {typeof count === "number" && (
        <span className="rounded-md border border-[#A9854F]/10 bg-[#121411] px-2 py-0.5 font-mono text-[9px] text-[#7C776E]">
          {count}
        </span>
      )}
    </button>
  );
}

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 10.5L12 4L20 10.5V20H4V10.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M9 20V14H15V20"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M10 7H14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M17 10V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M10 17H14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M7 10V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SharedIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <circle
        cx="17"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M3.5 20C3.9 16.8 5.5 14.8 8 14.8C10.5 14.8 12.1 16.8 12.5 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M14 15.2C15 14.4 16 14 17 14C19.1 14 20.2 15.6 20.5 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7H20V20H4V7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M3 4H21V7H3V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M9 12H15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <circle
        cx="17"
        cy="9"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M3.5 20C4 16.5 5.7 14.5 9 14.5C12.3 14.5 14 16.5 14.5 20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M14.5 15C15.3 14.5 16.2 14.2 17 14.2C19.5 14.2 20.5 16 20.7 18.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThreadIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="#A9854F"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />

      <path
        d="M12 6C15 9 15 11 12 12C9 13 9 15 12 18"
        stroke="#D6C4A3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}