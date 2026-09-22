export default function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-2xl border border-[#A9854F]/30 bg-[#17130F]"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 48 48"
        fill="none"
      >
        {/* Outer thread */}
        <path
          d="M24 4
             C34 4 44 14 44 24
             C44 34 34 44 24 44
             C14 44 4 34 4 24
             C4 14 14 4 24 4Z"
          stroke="#A9854F"
          strokeWidth="1.2"
          strokeDasharray="2 4"
          opacity="0.7"
        />

        {/* Four connected petals */}
        <path
          d="M24 8
             C28 15 28 20 24 24
             C20 20 20 15 24 8Z"
          stroke="#D6C4A3"
          strokeWidth="1.4"
        />

        <path
          d="M40 24
             C33 28 28 28 24 24
             C28 20 33 20 40 24Z"
          stroke="#D6C4A3"
          strokeWidth="1.4"
        />

        <path
          d="M24 40
             C20 33 20 28 24 24
             C28 28 28 33 24 40Z"
          stroke="#D6C4A3"
          strokeWidth="1.4"
        />

        <path
          d="M8 24
             C15 20 20 20 24 24
             C20 28 15 28 8 24Z"
          stroke="#D6C4A3"
          strokeWidth="1.4"
        />

        {/* Diagonal thread */}
        <path
          d="M13 13
             C18 18 20 20 24 24
             C28 28 30 30 35 35"
          stroke="#9A6847"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <path
          d="M35 13
             C30 18 28 20 24 24
             C20 28 18 30 13 35"
          stroke="#9A6847"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center structure */}
        <rect
          x="20"
          y="20"
          width="8"
          height="8"
          rx="1.5"
          transform="rotate(45 24 24)"
          fill="#17130F"
          stroke="#A9854F"
          strokeWidth="1.5"
        />

        {/* Center point */}
        <circle
          cx="24"
          cy="24"
          r="2"
          fill="#F0E6D2"
        />

        {/* Four outer nodes */}
        <circle
          cx="24"
          cy="8"
          r="1.5"
          fill="#A9854F"
        />

        <circle
          cx="40"
          cy="24"
          r="1.5"
          fill="#A9854F"
        />

        <circle
          cx="24"
          cy="40"
          r="1.5"
          fill="#A9854F"
        />

        <circle
          cx="8"
          cy="24"
          r="1.5"
          fill="#A9854F"
        />
      </svg>
    </div>
  );
}
