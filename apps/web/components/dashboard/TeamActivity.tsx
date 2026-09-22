"use client";

export default function TeamActivity() {
  return (
    <aside className="border-l border-[#B28A50]/10 bg-[#0B0F0F] px-6 py-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ActivityIcon />

          <h2 className="font-serif text-[18px] text-[#E8DECE]">
            Team Activity
          </h2>
        </div>

        <span className="font-mono text-[9px] text-[#8C7551]/50">
          —
        </span>
      </div>

      <div className="mt-7 border-t border-[#B28A50]/10 pt-9">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B28A50]/10 bg-[#171A19]">
            <ActivityIcon />
          </div>

          <p className="mt-4 text-[12px] text-[#BDB3A3]">
            No team activity yet
          </p>

          <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-[#77736C]">
            Activity will appear here when team
            collaboration is added.
          </p>
        </div>
      </div>
    </aside>
  );
}

function ActivityIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-6 4 12 2-6h6"
        stroke="#C49A5A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}