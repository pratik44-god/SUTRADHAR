type MenuIconProps = {
  open: boolean;
};

export default function MenuIcon({ open }: MenuIconProps) {
  return (
    <div className="flex h-5 w-5 flex-col justify-center gap-1.5">
      <span
        className={`block h-px w-5 bg-[#D6C4A3] transition ${
          open ? "translate-y-[4px] rotate-45" : ""
        }`}
      />

      <span
        className={`block h-px w-5 bg-[#D6C4A3] transition ${
          open ? "-rotate-45" : ""
        }`}
      />
    </div>
  );
}