"use client";

import { useState } from "react";
import Link from "next/link";

import LogoMark from "~/components/branding/logo";

import ArrowIcon from "~/components/resuableFunctions/ArrowIcon";
import SearchIcon from "~/components/resuableFunctions/SearchIcon";
import MenuIcon from "~/components/resuableFunctions/MenuIcon";
import ChevronIcon from "~/components/resuableFunctions/ChevronIcon";
import ManuscriptCard from "~/components/resuableFunctions/ManuscriptCard";
import AnimatedNode from "~/components/resuableFunctions/AnimatedNode";
import ProductPreview from "~/components/resuableFunctions/ProductPreview";

const NAV_ITEMS = ["Product", "Solutions", "Resources", "Pricing"];

function FeatureIcon({ type }: { type: string }) {
  if (type === "diagram") {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="3" y="4" width="6" height="5" rx="1" />
        <rect x="15" y="4" width="6" height="5" rx="1" />
        <rect x="9" y="15" width="6" height="5" rx="1" />
        <path d="M9 6.5h6M6 9v3.5l6 2.5M18 9v3.5l-6 2.5" />
      </svg>
    );
  }

  if (type === "collab") {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 19c.8-3.2 2.5-5 5-5s4.2 1.8 5 5" />
        <path d="M14 15c2.5-.3 4.5 1.1 5 4" />
      </svg>
    );
  }

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="8" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function StepIcon({ number }: { number: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A9854F]/20 bg-[#17130F] font-serif text-sm text-[#A9854F]">
      {number}
    </div>
  );
}

function DecorativeTemple() {
  return (
    <svg
      width="180"
      height="100"
      viewBox="0 0 180 100"
      fill="none"
      className="opacity-[0.13]"
    >
      <path
        d="M20 82H160M28 76H152M35 69H145M43 62H137M51 55H129M60 48H120M70 40H110M80 30H100M90 18V82"
        stroke="#A9854F"
        strokeWidth="1"
      />

      <path
        d="M70 40L90 18L110 40M51 55L90 18L129 55M35 69L90 18L145 69"
        stroke="#A9854F"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export default function LandingPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0F0D0A] text-[#F0E6D2]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#A9854F]/[0.025] blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#9A6847]/[0.02] blur-[140px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-[#A9854F]/10 bg-[#0F0D0A]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <button
            onClick={() => scrollToSection("top")}
            className="group flex items-center gap-3"
          >
            <LogoMark />

            <div className="text-left">
              <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#F0E6D2]">
                Sutradhara
              </div>

              <div className="font-mono text-[7px] uppercase tracking-[0.24em] text-[#B39A72]/50">
                Visual thinking
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(" ", "-"))
                }
                className="flex items-center gap-1.5 text-[12px] text-[#B39A72]/70 transition hover:text-[#F0E6D2]"
              >
                {item}

                {item !== "Pricing" && <ChevronIcon />}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 sm:flex">
            <button
              onClick={() => setSearchOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#B39A72]/70 transition hover:bg-[#17130F] hover:text-[#F0E6D2]"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            <Link
              href="/googlelogin"
              className="rounded-lg px-4 py-2 text-[12px] text-[#D6C4A3]/75 transition hover:text-[#F0E6D2]"
            >
              Log in
            </Link>

            <Link
              href="/googlelogin"
              className="group flex items-center gap-2 rounded-lg border border-[#A9854F]/25 bg-[#A9854F]/10 px-4 py-2 text-[12px] font-medium text-[#D6C4A3] transition hover:border-[#A9854F]/40 hover:bg-[#A9854F]/15"
            >
              Start building

              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#A9854F]/15 bg-[#17130F] sm:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>
        </div>

        {searchOpen && (
          <div className="border-t border-[#A9854F]/10 bg-[#17130F]/95">
            <div className="mx-auto max-w-[1280px] px-5 py-4 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3 rounded-xl border border-[#A9854F]/15 bg-[#0F0D0A] px-4 py-3">
                <SearchIcon />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search Sutradhara..."
                  className="w-full bg-transparent text-sm text-[#F0E6D2] outline-none placeholder:text-[#B39A72]/35"
                />

                <button
                  onClick={() => setSearchOpen(false)}
                  className="font-mono text-[9px] uppercase tracking-wider text-[#B39A72]/40 hover:text-[#D6C4A3]"
                >
                  Esc
                </button>
              </div>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="border-t border-[#A9854F]/10 bg-[#17130F] lg:hidden">
            <div className="mx-auto flex max-w-[1280px] flex-col px-5 py-5 sm:px-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" ", "-"))
                  }
                  className="border-b border-[#A9854F]/10 py-4 text-left text-sm text-[#D6C4A3]/75"
                >
                  {item}
                </button>
              ))}

              <Link
                href="/googlelogin"
                className="mt-5 flex items-center justify-center rounded-lg border border-[#A9854F]/25 bg-[#A9854F]/10 py-3 text-sm text-[#D6C4A3]"
              >
                Start building
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section
        id="top"
        className="relative z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,13,10,0.70), rgba(15,13,10,0.88)), url('/rachana-hero.png')",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
          <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#A9854F]/15 bg-[#17130F]/70 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A9854F]" />

                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#B39A72]/70">
                  A workspace for visual thinking
                </span>
              </div>

              <h1 className="max-w-[650px] font-serif text-[clamp(3.2rem,6vw,6.2rem)] leading-[0.92] tracking-[-0.045em] text-[#F0E6D2]">
                Every idea
                <br />
                has a thread.
              </h1>

              <h2 className="mt-7 max-w-[560px] font-serif text-[clamp(2rem,3.6vw,3.7rem)] leading-[1] tracking-[-0.035em] text-[#A9854F]">
                Sutradhara helps
                <br />
                you follow it.
              </h2>

              <p className="mt-8 max-w-[540px] text-[15px] leading-7 text-[#B39A72]/70 sm:text-base">
                Turn complex ideas, systems and architecture into visual
                structures that are easy to understand, share and build
                together.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/googlelogin"
                  className="group flex items-center justify-center gap-2 rounded-xl border border-[#A9854F]/30 bg-[#A9854F] px-6 py-3.5 text-sm font-medium text-[#17130F] transition hover:bg-[#B9955C]"
                >
                  Start building

                  <span className="transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </Link>

                <button
                  onClick={() => scrollToSection("product")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#A9854F]/15 bg-[#17130F] px-6 py-3.5 text-sm text-[#D6C4A3]/75 transition hover:border-[#A9854F]/25 hover:text-[#F0E6D2]"
                >
                  Explore the workspace
                </button>
              </div>

              <div className="mt-12 border-l border-[#A9854F]/20 pl-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#A9854F]/70">
                  The principle
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#B39A72]/55">
                  विचार को देखो। संरचना को समझो। रचना को साझा करो।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-[#A9854F]/10 bg-[#17130F]/45">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-[#A9854F]/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8 lg:px-10">
            <FeatureIcon type="diagram" />

            <div>
              <p className="text-sm text-[#D6C4A3]">Diagram naturally</p>

              <p className="mt-1 text-xs text-[#B39A72]/45">
                Systems without visual noise
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8 lg:px-10">
            <FeatureIcon type="collab" />

            <div>
              <p className="text-sm text-[#D6C4A3]">Build together</p>

              <p className="mt-1 text-xs text-[#B39A72]/45">
                One workspace, many minds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-7 sm:px-7 sm:py-8 lg:px-10">
            <FeatureIcon type="structure" />

            <div>
              <p className="text-sm text-[#D6C4A3]">Structure ideas</p>

              <p className="mt-1 text-xs text-[#B39A72]/45">
                From thought to architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="relative z-10">
        <div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 lg:px-10 lg:py-36">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#A9854F]">
                The workspace
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-[#F0E6D2] sm:text-5xl lg:text-6xl">
                Where structure
                <br />
                becomes visible.
              </h2>
            </div>

            <div className="flex items-end">
              <p className="max-w-lg text-sm leading-7 text-[#B39A72]/60 sm:text-base">
                Sutradhara gives you a visual environment for turning
                architecture, workflows and abstract ideas into connected
                structures. No unnecessary panels. No visual clutter. Just the
                work.
              </p>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section
        id="solutions"
        className="relative z-10 border-t border-[#A9854F]/10"
      >
        <div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 lg:px-10 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#A9854F]">
                One thread
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-[#F0E6D2] sm:text-5xl">
                From thought
                <br />
                to structure.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#B39A72]/55">
                Every project begins as an idea. Sutradhara gives that idea a
                place to grow into something understandable and useful.
              </p>
            </div>

            <div className="space-y-0">
              <div className="group flex gap-6 border-t border-[#A9854F]/10 py-8">
                <StepIcon number="01" />

                <div>
                  <h3 className="font-serif text-2xl text-[#F0E6D2]">
                    Vichar · विचार
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#B39A72]/55">
                    Capture the raw thought before worrying about perfect
                    structure. Explore ideas freely and see how they connect.
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 border-t border-[#A9854F]/10 py-8">
                <StepIcon number="02" />

                <div>
                  <h3 className="font-serif text-2xl text-[#F0E6D2]">
                    Yojana · योजना
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#B39A72]/55">
                    Turn disconnected thoughts into flows, systems and
                    relationships that communicate the underlying plan.
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 border-t border-[#A9854F]/10 py-8">
                <StepIcon number="03" />

                <div>
                  <h3 className="font-serif text-2xl text-[#F0E6D2]">
                    Rachana · रचना
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#B39A72]/55">
                    Shape the structure into a clear visual system that your
                    team can understand, edit and build upon.
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 border-t border-[#A9854F]/10 py-8">
                <StepIcon number="04" />

                <div>
                  <h3 className="font-serif text-2xl text-[#F0E6D2]">
                    Sampurnata · संपूर्णता
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#B39A72]/55">
                    Share the finished architecture, preserve its history and
                    keep evolving it as the project grows.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#A9854F]/10" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="resources"
        className="relative z-10 overflow-hidden border-t border-[#A9854F]/10 bg-[#17130F]/35"
      >
        <div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 lg:px-10 lg:py-36">
          <div className="relative">
            <div className="pointer-events-none absolute -right-10 -top-10">
              <DecorativeTemple />
            </div>

            <div className="relative max-w-2xl">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#A9854F]">
                Built for builders
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-[#F0E6D2] sm:text-5xl lg:text-6xl">
                Your architecture
                <br />
                deserves clarity.
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-[#B39A72]/60 sm:text-base">
                Whether you are designing a distributed system, explaining a
                workflow, documenting an API or simply trying to understand a
                complex idea, Sutradhara gives it a visual language.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#A9854F]/10 bg-[#A9854F]/10 sm:grid-cols-3">
              <div className="bg-[#17130F] p-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Architecture
                </p>

                <h3 className="mt-4 font-serif text-xl text-[#D6C4A3]">
                  Think in systems
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#B39A72]/45">
                  Map services, dependencies, data flows and infrastructure
                  without drowning in complexity.
                </p>
              </div>

              <div className="bg-[#17130F] p-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Collaboration
                </p>

                <h3 className="mt-4 font-serif text-xl text-[#D6C4A3]">
                  Think together
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#B39A72]/45">
                  Invite teammates, work on the same project and keep every
                  important decision connected to the visual structure.
                </p>
              </div>

              <div className="bg-[#17130F] p-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Evolution
                </p>

                <h3 className="mt-4 font-serif text-xl text-[#D6C4A3]">
                  Think over time
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#B39A72]/45">
                  Preserve versions and let diagrams evolve with the systems
                  they describe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative z-10 border-t border-[#A9854F]/10"
      >
        <div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 lg:px-10 lg:py-36">
          <div className="relative overflow-hidden rounded-[28px] border border-[#A9854F]/20 bg-[#17130F] px-6 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9854F]/5 blur-[100px]" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A9854F]/25 bg-[#0F0D0A]">
                <LogoMark size={38} />
              </div>

              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#A9854F]">
                Begin the thread
              </p>

              <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-[#F0E6D2] sm:text-5xl lg:text-6xl">
                Give your ideas
                <br />
                somewhere to go.
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#B39A72]/55 sm:text-base">
                Create your first workspace and start turning thoughts into
                structures your team can actually understand.
              </p>

              <div className="mt-9">
                <Link
                  href="/googlelogin"
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#A9854F]/30 bg-[#A9854F] px-7 py-3.5 text-sm font-medium text-[#17130F] transition hover:bg-[#B9955C]"
                >
                  Start building

                  <span className="transition-transform group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#A9854F]/10">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark size={34} />

                <div>
                  <p className="text-sm font-semibold text-[#D6C4A3]">
                    Sutradhara
                  </p>

                  <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-[#B39A72]/40">
                    Visual thinking workspace
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-xs text-xs leading-6 text-[#B39A72]/40">
                A modern workspace for making complex ideas visible,
                understandable and collaborative.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
              <div>
                <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Product
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection("product")}
                    className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]"
                  >
                    Workspace
                  </button>

                  <button
                    onClick={() => scrollToSection("solutions")}
                    className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]"
                  >
                    Solutions
                  </button>

                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]"
                  >
                    Pricing
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Resources
                </p>

                <div className="space-y-3">
                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    Documentation
                  </button>

                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    Guides
                  </button>

                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    Changelog
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.2em] text-[#A9854F]/70">
                  Company
                </p>

                <div className="space-y-3">
                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    About
                  </button>

                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    Contact
                  </button>

                  <button className="block text-xs text-[#B39A72]/50 transition hover:text-[#D6C4A3]">
                    Privacy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[#A9854F]/10 pt-6 sm:flex-row">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#B39A72]/30">
              © 2026 Sutradhara
            </p>

            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#B39A72]/30">
              विचार · योजना · रचना · संपूर्णता
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes nodeFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes dashMove {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -120;
          }
        }
      `}</style>
    </main>
  );
}