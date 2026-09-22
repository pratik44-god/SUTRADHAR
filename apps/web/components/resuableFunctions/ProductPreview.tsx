import LogoMark from "~/components/branding/logo";
import AnimatedNode from "./AnimatedNode";

export default function ProductPreview() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#A9854F]/15 bg-[#110F0C] shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(169,133,79,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(169,133,79,0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9854F]/5 blur-3xl" />

      <div className="relative min-h-[520px] sm:min-h-[600px]">
        <div className="absolute left-0 right-0 top-0 flex h-14 items-center justify-between border-b border-[#A9854F]/10 bg-[#17130F]/75 px-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <LogoMark size={28} />

            <div>
              <p className="text-[11px] font-medium text-[#F0E6D2]">
                System Architecture
              </p>

              <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#B39A72]/50">
                Untitled workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-md border border-[#A9854F]/10 bg-[#211A13] px-2.5 py-1.5 font-mono text-[8px] text-[#B39A72]/60 sm:block">
              ⌘ K
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-[#A9854F]/15 bg-[#211A13] px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7B9B72]" />

              <span className="font-mono text-[7px] uppercase tracking-wider text-[#B39A72]/70">
                Live
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-14">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 900 520"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M450 260 C340 170 250 150 145 115"
              stroke="#A9854F"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="7 8"
              fill="none"
              style={{
                animation: "dashMove 9s linear infinite",
              }}
            />

            <path
              d="M450 260 C550 165 650 145 755 110"
              stroke="#A9854F"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="7 8"
              fill="none"
              style={{
                animation: "dashMove 8s linear infinite reverse",
              }}
            />

            <path
              d="M450 260 C345 340 250 380 145 405"
              stroke="#9A6847"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="7 8"
              fill="none"
              style={{
                animation: "dashMove 10s linear infinite",
              }}
            />

            <path
              d="M450 260 C550 345 650 380 755 405"
              stroke="#9A6847"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="7 8"
              fill="none"
              style={{
                animation: "dashMove 11s linear infinite reverse",
              }}
            />

            <circle
              cx="450"
              cy="260"
              r="58"
              fill="#A9854F"
              opacity="0.035"
            />

            <circle
              cx="450"
              cy="260"
              r="42"
              fill="#A9854F"
              opacity="0.025"
            />

            <circle
              cx="145"
              cy="115"
              r="3"
              fill="#A9854F"
              filter="url(#softGlow)"
            />

            <circle
              cx="755"
              cy="110"
              r="3"
              fill="#A9854F"
              filter="url(#softGlow)"
            />

            <circle
              cx="145"
              cy="405"
              r="3"
              fill="#9A6847"
              filter="url(#softGlow)"
            />

            <circle
              cx="755"
              cy="405"
              r="3"
              fill="#9A6847"
              filter="url(#softGlow)"
            />

            <circle r="3" fill="#D6C4A3">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M450 260 C340 170 250 150 145 115"
              />
            </circle>

            <circle r="3" fill="#D6C4A3">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M450 260 C550 165 650 145 755 110"
              />
            </circle>

            <circle r="3" fill="#D6C4A3">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M450 260 C345 340 250 380 145 405"
              />
            </circle>

            <circle r="3" fill="#D6C4A3">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M450 260 C550 345 650 380 755 405"
              />
            </circle>
          </svg>

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-5 rounded-full bg-[#A9854F]/10 blur-2xl" />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-[#A9854F]/30 bg-[#17130F]/95 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="text-center">
                  <LogoMark size={34} />

                  <p className="mt-2 text-[9px] font-medium text-[#F0E6D2]">
                    Sutradhara
                  </p>

                  <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.15em] text-[#B39A72]/50">
                    workspace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AnimatedNode
            label="Vichar"
            subtitle="Idea"
            className="left-[7%] top-[12%]"
            delay="0s"
          />

          <AnimatedNode
            label="Yojana"
            subtitle="Plan"
            className="right-[7%] top-[11%]"
            delay="1.2s"
          />

          <AnimatedNode
            label="Rachana"
            subtitle="Structure"
            className="left-[7%] bottom-[13%]"
            delay="2.1s"
          />

          <AnimatedNode
            label="Sampurnata"
            subtitle="Complete"
            className="right-[7%] bottom-[13%]"
            delay="3s"
          />

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg border border-[#A9854F]/10 bg-[#17130F]/75 px-3 py-2 backdrop-blur-xl">
            <div className="flex -space-x-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#17130F] bg-[#9A6847] text-[7px] text-[#F0E6D2]">
                P
              </div>

              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#17130F] bg-[#A9854F] text-[7px] text-[#17130F]">
                A
              </div>

              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#17130F] bg-[#B39A72] text-[7px] text-[#17130F]">
                S
              </div>
            </div>

            <span className="font-mono text-[7px] uppercase tracking-wider text-[#B39A72]/55">
              3 collaborators
            </span>
          </div>

          <div className="absolute bottom-5 right-5 rounded-lg border border-[#A9854F]/10 bg-[#17130F]/75 px-3 py-2 backdrop-blur-xl">
            <span className="font-mono text-[7px] uppercase tracking-wider text-[#B39A72]/55">
              Autosaved · just now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}