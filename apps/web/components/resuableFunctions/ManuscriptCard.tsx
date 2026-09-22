export default function ManuscriptCard() {
  return (
    <div className="group relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#A9854F]/20 bg-[#17130F] sm:min-h-[600px] lg:min-h-[640px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D0A]/20 via-transparent to-[#0F0D0A]/90" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0A]/35 via-transparent to-[#0F0D0A]/20" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
        <div className="rounded-full border border-[#D6C4A3]/20 bg-[#0F0D0A]/55 px-3 py-1.5 backdrop-blur-md">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D6C4A3]/80">
            Rachana · रचना
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#D6C4A3]/15 bg-[#0F0D0A]/45 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A9854F]" />

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D6C4A3]/70">
            Living diagram
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="max-w-md">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[#A9854F]">
            The structure of an idea
          </p>

          <h3 className="font-serif text-2xl tracking-tight text-[#F0E6D2] sm:text-3xl">
            विचार → योजना → रचना → संपूर्णता
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-[#D6C4A3]/65">
            Give every thought a structure. Let every structure tell a story.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9854F]/5 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
    </div>
  );
}