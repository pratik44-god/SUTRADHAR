
"use client";

import { useEffect, useState } from "react";

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"

        
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3V13M3 8H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2H5M10 2H13M2 7.5H5M10 7.5H13M2 13H5M10 13H13M2 2V5M7.5 2V5M13 2V5M2 10V13M7.5 10V13M13 10V13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-[9px] border border-white/15 bg-white/[0.06] shadow-[0_0_30px_rgba(139,92,246,0.15)]">
      <div className="absolute h-3 w-3 rounded-[3px] border border-violet-300/80 rotate-45" />
      <div className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.9)]" />
    </div>
  );
}

function ProductNode({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string;
  subtitle: string;
  icon: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute w-[150px] rounded-xl border border-white/[0.10] bg-zinc-950/90 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10 text-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[11px] font-medium text-white">
            {title}
          </div>
          <div className="mt-0.5 text-[9px] text-zinc-500">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function Connector({
  className,
  dashed = false,
}: {
  className?: string;
  dashed?: boolean;
}) {
  return (
    <div
      className={`absolute h-px origin-left ${
        dashed
          ? "bg-[repeating-linear-gradient(to_right,rgba(167,139,250,0.65)_0,rgba(167,139,250,0.65)_5px,transparent_5px,transparent_10px)]"
          : "bg-gradient-to-r from-violet-400/60 to-transparent"
      } ${className}`}
    >
      <div className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full border border-violet-300/60 bg-zinc-950" />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070709] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[600px] w-[600px] rounded-full bg-indigo-600/[0.05] blur-[140px]" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#070709]/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <LogoMark />

            <div>
              <div className="text-[14px] font-semibold tracking-[0.22em] text-white">
                SUTRADHAR
              </div>
              <div className="hidden text-[8px] tracking-[0.3em] text-zinc-600 sm:block">
                SYSTEMS WORKSPACE
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#product"
              className="text-[13px] text-zinc-400 transition hover:text-white"
            >
              Product
            </a>

            <a
              href="#workflow"
              className="text-[13px] text-zinc-400 transition hover:text-white"
            >
              Workflow
            </a>

            <a
              href="#use-cases"
              className="text-[13px] text-zinc-400 transition hover:text-white"
            >
              Use cases
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToLogin}
              className="hidden text-[13px] text-zinc-400 transition hover:text-white sm:block"
            >
              Sign in
            </button>

            <button
              onClick={goToLogin}
              className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white px-3.5 py-2 text-[12px] font-medium text-black transition hover:bg-violet-100"
            >
              Start building
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-36 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3.5 py-1.5 text-[11px] text-violet-200/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />
              A workspace for thinking in systems
            </div>

            <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[82px]">
              Turn ideas into
              <br />
              <span className="bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
                systems.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
              Sutradhar is a modern visual workspace for designing
              architectures, workflows, diagrams and the systems behind your
              ideas.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={goToLogin}
                className="group flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-black transition hover:bg-violet-100"
              >
                Start diagramming
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#product"
                className="flex h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] px-5 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                Explore Sutradhar
              </a>
            </div>
          </div>

          {/* Hero diagram */}
          <div className="relative mx-auto mt-20 max-w-6xl lg:mt-28">
            <div className="absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.08] blur-[100px]" />

            <div className="relative h-[390px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b0b0e] shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:h-[500px]">
              {/* editor chrome */}
              <div className="flex h-11 items-center justify-between border-b border-white/[0.07] bg-white/[0.015] px-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/10" />
                    <span className="h-2 w-2 rounded-full bg-white/10" />
                    <span className="h-2 w-2 rounded-full bg-white/10" />
                  </div>

                  <div className="hidden h-5 w-px bg-white/[0.08] sm:block" />

                  <span className="text-[10px] text-zinc-500">
                    payment-architecture.sutradhar
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden text-[9px] text-emerald-400/70 sm:block">
                    ● Saved
                  </span>

                  <button className="rounded-md border border-white/10 px-2.5 py-1 text-[9px] text-zinc-400">
                    Share
                  </button>
                </div>
              </div>

              {/* toolbar */}
              <div className="absolute left-4 top-[60px] z-20 flex flex-col gap-1 rounded-xl border border-white/[0.08] bg-zinc-950/90 p-1.5 shadow-xl backdrop-blur-xl">
                {["↖", "⌁", "□", "◇", "T", "→"].map((item, index) => (
                  <button
                    key={item}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] transition ${
                      index === 0
                        ? "bg-violet-500/15 text-violet-200"
                        : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* canvas grid */}
              <div
                className="absolute inset-11 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* diagram */}
              <div className="absolute inset-0">
                <ProductNode
                  title="Web Client"
                  subtitle="Next.js"
                  icon="◈"
                  className="left-[18%] top-[28%] animate-[floatA_6s_ease-in-out_infinite]"
                />

                <ProductNode
                  title="API Gateway"
                  subtitle="tRPC / REST"
                  icon="◇"
                  className="left-[43%] top-[42%] animate-[floatB_7s_ease-in-out_infinite]"
                />

                <ProductNode
                  title="PostgreSQL"
                  subtitle="Primary database"
                  icon="▣"
                  className="left-[68%] top-[28%] animate-[floatC_6.5s_ease-in-out_infinite]"
                />

                <ProductNode
                  title="Redis"
                  subtitle="Cache layer"
                  icon="◆"
                  className="left-[68%] top-[60%] animate-[floatA_7s_ease-in-out_infinite]"
                />

                <ProductNode
                  title="Workers"
                  subtitle="Background jobs"
                  icon="✦"
                  className="left-[19%] top-[63%] animate-[floatB_6.5s_ease-in-out_infinite]"
                />

                <Connector className="left-[34%] top-[38%] w-[10%] rotate-[18deg]" />

                <Connector className="left-[57%] top-[48%] w-[13%] -rotate-[18deg]" />

                <Connector
                  dashed
                  className="left-[57%] top-[54%] w-[14%] rotate-[28deg]"
                />

                <Connector
                  dashed
                  className="left-[34%] top-[59%] w-[13%] rotate-[160deg]"
                />
              </div>

              {/* bottom status */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] text-zinc-600">
                <div className="flex items-center gap-4">
                  <span>● Select</span>
                  <span className="hidden sm:inline">Space + drag to pan</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>−</span>
                  <span className="text-zinc-400">100%</span>
                  <span>+</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center text-[10px] tracking-wide text-zinc-600">
              Architecture designed in Sutradhar
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section
        id="product"
        className="border-t border-white/[0.06] px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/70">
              The workspace
            </div>

            <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-5xl">
              Think visually.
              <br />
              <span className="text-zinc-500">Build deliberately.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Every part of Sutradhar is designed around the way engineers
              actually reason about complex systems.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Visual systems",
                description:
                  "Build architectures and workflows on a canvas where relationships are as important as the components themselves.",
              },
              {
                number: "02",
                title: "Structured thinking",
                description:
                  "Move from scattered ideas to connected systems using nodes, relationships, grouping and clear visual hierarchy.",
              },
              {
                number: "03",
                title: "Persistent workspace",
                description:
                  "Your diagrams are not disposable drawings. Projects, versions and collaboration keep the system alive.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group bg-[#0b0b0e] p-7 transition hover:bg-[#0e0e12] lg:p-9"
              >
                <div className="mb-14 text-[10px] tracking-[0.2em] text-violet-300/50">
                  {item.number}
                </div>

                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {item.description}
                </p>

                <div className="mt-8 h-px w-8 bg-violet-400/50 transition-all duration-500 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative border-t border-white/[0.06] px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/70">
                Your workflow
              </div>

              <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-5xl">
                From thought
                <br />
                <span className="text-zinc-500">to structure.</span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
                Start with an empty canvas. Shape your idea. Connect the
                pieces. Then keep evolving the system as your understanding
                grows.
              </p>

              <button
                onClick={goToLogin}
                className="group mt-8 flex items-center gap-2 text-sm text-violet-300 transition hover:text-violet-200"
              >
                Create your first diagram
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-violet-500/[0.04] blur-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0e]">
                {[
                  {
                    num: "01",
                    title: "Create",
                    text: "Start with a blank canvas or a system you already understand.",
                  },
                  {
                    num: "02",
                    title: "Connect",
                    text: "Represent relationships with precise lines, arrows and visual hierarchy.",
                  },
                  {
                    num: "03",
                    title: "Refine",
                    text: "Move, group, align and reshape your system until the idea becomes clear.",
                  },
                  {
                    num: "04",
                    title: "Collaborate",
                    text: "Share the workspace with teammates and continue from the same source of truth.",
                  },
                ].map((step, index) => (
                  <div
                    key={step.num}
                    className={`flex gap-6 p-6 sm:p-8 ${
                      index !== 3 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <div className="shrink-0 pt-0.5 text-[10px] tracking-[0.18em] text-violet-300/50">
                      {step.num}
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section
        id="use-cases"
        className="border-t border-white/[0.06] px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/70">
                What you can build
              </div>

              <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-5xl">
                One canvas.
                <br />
                <span className="text-zinc-500">Many systems.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-zinc-500">
              From software architecture to database relationships, Sutradhar
              gives you the visual primitives to model whatever you are
              building.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⌘",
                title: "System Design",
                text: "Services, APIs, databases and infrastructure.",
              },
              {
                icon: "◇",
                title: "Flowcharts",
                text: "Processes, decisions and operational workflows.",
              },
              {
                icon: "▣",
                title: "ER Diagrams",
                text: "Entities, relationships and data models.",
              },
              {
                icon: "∞",
                title: "Architecture",
                text: "Cloud systems and distributed components.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group min-h-[190px] rounded-xl border border-white/[0.07] bg-white/[0.015] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-violet-500/[0.025]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-violet-300">
                  {item.icon}
                </div>

                <h3 className="mt-8 text-sm font-medium">{item.title}</h3>

                <p className="mt-2 text-xs leading-5 text-zinc-600 transition group-hover:text-zinc-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-white/[0.06] bg-white/[0.012] px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-5 text-[11px] text-zinc-600">
          <span className="flex items-center gap-2">
            <GridIcon />
            Infinite canvas
          </span>

          <span>⌘ Undo / Redo</span>
          <span>↗ Smart connections</span>
          <span>◌ Autosave</span>
          <span>◈ Version history</span>
          <span>⇄ Collaboration</span>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-32 lg:px-8 lg:py-44">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08]">
            <LogoMark />
          </div>

          <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-6xl">
            Your ideas deserve
            <br />
            <span className="text-zinc-500">a system.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-zinc-500 sm:text-base">
            Open a canvas. Start connecting things. Build something that makes
            sense.
          </p>

          <button
            onClick={goToLogin}
            className="group mx-auto mt-9 flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-violet-100"
          >
            Start building with Sutradhar
            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <LogoMark />

            <span className="text-[11px] font-medium tracking-[0.2em] text-zinc-500">
              SUTRADHAR
            </span>
          </div>

          <div className="text-[10px] text-zinc-700">
            Build clearly. Think deeply.
          </div>

          <div className="text-[10px] text-zinc-700">
            © {new Date().getFullYear()} Sutradhar
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes floatA {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes floatB {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(8px);
          }
        }

        @keyframes floatC {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </main>
  );
}