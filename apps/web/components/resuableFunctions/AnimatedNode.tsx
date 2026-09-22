type AnimatedNodeProps = {
  label: string;
  subtitle: string;
  className?: string;
  delay?: string;
};

export default function AnimatedNode({
  label,
  subtitle,
  className = "",
  delay = "0s",
}: AnimatedNodeProps) {
  return (
    <div
      className={`absolute z-20 ${className}`}
      style={{
        animation: "nodeFloat 5s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <div className="min-w-[110px] rounded-xl border border-[#A9854F]/20 bg-[#17130F]/95 px-3 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A9854F]" />

          <span className="text-[10px] font-medium text-[#F0E6D2]">
            {label}
          </span>
        </div>

        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#B39A72]/60">
          {subtitle}
        </p>
      </div>
    </div>
  );
}