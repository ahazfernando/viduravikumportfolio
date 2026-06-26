"use client";

import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isLight = saved === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-7 w-12 items-center rounded-full border border-foreground/30 bg-foreground/5 transition-colors"
    >
      <span
        className={`absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] transition-transform ${
          light ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {light ? "☀" : "☾"}
      </span>
    </button>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <Reveal>
      <p className="section-label">
        ({num}) <span className="opacity-60">—</span> {label}
      </p>
    </Reveal>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-start justify-between gap-6 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="text-xs tracking-widest text-muted-foreground">
        <p className="opacity-60">BASED IN:</p>
        <p className="mt-1 text-foreground">KANDY, SRI LANKA</p>
      </div>
      <ul className="hidden md:flex flex-row items-center gap-6 text-xs tracking-widest text-foreground/80">
        {[
          { label: "HOME", href: "#" },
          { label: "ABOUT", href: "#about" },
          { label: "SERVICE", href: "#service" },
          { label: "PROJECTS", href: "#about" },
          { label: "EXPERIENCE", href: "#experience" },
          { label: "CONTACT", href: "#contact" },
        ].map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 text-xs tracking-widest">
        <ThemeToggle />
        <a
          href="#contact"
          className="bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          LET'S TALK
        </a>
        <span className="flex flex-col gap-1">
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
        </span>
      </div>
    </motion.header>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <StickyNav />
      <Hero />
      <WhatIBuild />
      <Capabilities />
      {/* <Growth /> */}
      <Toolkit />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = [
    "Web Development",
    "Digital Marketing",
    "Business Consultation",
    "Tech Tutoring",
    "Brand Strategy",
    "UI/UX Design",
    "SEO & Analytics",
    "Full-Stack Systems",
    "Software Engineering",
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden px-6 md:px-12 pt-28 pb-16">
      <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
        >
          <source src="/home/HomeHeroVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/30 to-background/85" />
      </motion.div>

      <div className="relative z-10">
      {/* Giant name */}
      <motion.div style={{ y, opacity }} className="relative mt-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[18vw] md:text-[15vw] leading-[0.9] uppercase break-words"
        >
          JORDAN
          <sup className="text-xs md:text-sm align-super opacity-60 ml-2">®</sup>
        </motion.h1>
        <p className="text-right text-xs tracking-widest text-muted-foreground -mt-2">©2026</p>
      </motion.div>

      {/* Services list */}
      <div className="mt-10 md:mt-20 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-end gap-6">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            className="self-start rounded-full border border-foreground/40 px-6 py-3 text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            GET IN TOUCH
          </motion.a>
          <p className="max-w-md text-sm text-muted-foreground">
            Building scalable digital products through{" "}
            <span className="font-serif-italic text-foreground">
              clean architecture and modern engineering.
            </span>
          </p>
        </div>
        <ul className="flex flex-col items-end gap-2 md:gap-3 text-lg md:text-2xl font-light">
          {services.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.6 }}
              className="text-right text-foreground/85"
            >
              <span className="font-serif-italic text-accent mr-2">
                {String.fromCharCode(9312 + i)}
              </span>
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}

/* ───────────────────────── WHAT I BUILD ───────────────────────── */

function WhatIBuild() {
  const tabs = ["All", "Web Apps", "Marketing Sites", "SaaS Platforms", "Branding"];

  const projects = [
    {
      title: "Equalizer RV",
      tag: "Premium Caravans · AU",
      url: "https://equalizerrv.com.au",
      img: "/images/project-equalizer.png",
      desc: "Marketing site for an Australian premium caravan brand — bold typography, immersive hero, and conversion-led product journeys.",
    },
    {
      title: "Australiana RV Repair",
      tag: "Mobile Repair · AU",
      url: "https://www.australianarv.com.au/mobile-repair-team",
      img: "/images/project-australiana.png",
      desc: "Service platform for a mobile RV repair team — booking flows, service pages and trust-driven storytelling across the site.",
    },
    {
      title: "Ignite Labs",
      tag: "Tech · Marketing · Design",
      url: "https://www.ignitelabs.global",
      img: "/images/project-ignite.png",
      desc: "Brand and web experience for a creative tech studio — fluid type, gradient atmospheres and a kinetic landing page.",
    },
    {
      title: "Skill City Facility Solutions",
      tag: "Commercial Cleaning · AU",
      url: "https://www.skillcityfs.com.au",
      img: "/images/project-skillcity.png",
      desc: "Marketing site for a professional commercial cleaning company across Australia — service pages, certifications and a clear consultation funnel.",
    },
    {
      title: "S&R Estate Agents",
      tag: "Luxury Real Estate · AU",
      url: "https://sandrestateagents.com.au",
      img: "/images/project-sandr.png",
      desc: "Brand-led web experience for Australia's most followed luxury real estate brand — cinematic hero, residential listings and consultation booking.",
    },
  ];

  return (
    <section id="about" className="relative px-6 md:px-12 py-32">
      <SectionLabel num="02" label="WHAT I BUILD" />
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-display uppercase text-5xl md:text-8xl max-w-5xl">
          INTO THE <span className="font-serif-italic text-accent normal-case">core</span> OF
          <br />
          MODERN SYSTEMS.
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-muted-foreground text-lg leading-relaxed">
          I design and ship full-stack products — blending frontend craft, backend architecture and
          scalable systems into experiences that perform.
        </p>
      </Reveal>

      {/* Flagship card */}
      <Reveal delay={0.3}>
        <div
          className="mt-20 rounded-[2rem] overflow-hidden"
          style={{ background: "linear-gradient(180deg, #1e1e2e 0%, #16161f 100%)" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent shrink-0"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="section-label">SELECTED WORK</span>
            </div>

            {/* Nav tabs */}
            <div className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  className={`px-4 py-2 text-xs tracking-wide rounded-full whitespace-nowrap ${
                    tab === "All"
                      ? "bg-accent text-white"
                      : "text-white/50 hover:text-white/80 cursor-pointer"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* SLIIT badge */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center border"
                style={{ background: "#2a2a3a", borderColor: "#3a3a4a" }}
              >
                <span className="text-[9px] font-bold text-white/90 leading-tight text-center">
                  SLIIT
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative py-10 md:py-14 overflow-hidden">
            {/* Ambient glow + grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40"
              style={{ background: "radial-gradient(circle, var(--glow-blue), transparent 60%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative px-6 md:px-10">
              {/* Meta row */}
              <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-white/40">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Live Index
                  </span>
                  <span className="hidden md:inline h-px w-10 bg-white/15" />
                  <span>2021 — 2026</span>
                  <span className="hidden md:inline h-px w-10 bg-white/15" />
                  <span>{projects.length.toString().padStart(2, "0")} Projects</span>
                </div>
                <div className="font-display text-white/30 text-xs tracking-[0.4em]">
                  SCROLL · DRAG · CLICK
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
                <div>
                  <h3 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight">
                    FEAT<span className="accent-letter">U</span>RED
                    <br />
                    <span className="inline-flex items-baseline gap-4">
                      PROJECTS
                      <span className="hidden md:inline-block font-serif-italic text-accent text-3xl md:text-4xl translate-y-[-0.5em] opacity-80">
                        / vol.01
                      </span>
                    </span>
                  </h3>
                  <p className="mt-5 max-w-lg text-white/55 text-base md:text-lg leading-relaxed">
                    A selection of recent client work — from marketing sites to service platforms
                    and brand experiences.
                  </p>
                </div>

                {/* Dossier counter */}
                <div className="hidden lg:flex flex-col items-end gap-2 text-right">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Now Showing
                  </div>
                  <div className="font-display text-6xl text-white leading-none tabular-nums">
                    <span className="text-accent">01</span>
                    <span className="text-white/30 text-3xl align-top ml-1">
                      / {projects.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {projects.map((_, i) => (
                      <span
                        key={i}
                        className={`h-0.5 w-6 ${i === 0 ? "bg-accent" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Ticker strip */}
              <div className="mt-10 -mx-6 md:-mx-10 border-y border-white/10 py-3 overflow-hidden">
                <div className="flex gap-10 whitespace-nowrap font-display uppercase text-white/30 text-sm tracking-[0.25em] [animation:ticker_30s_linear_infinite]">
                  {[...projects, ...projects, ...projects].map((p, i) => (
                    <span key={i} className="inline-flex items-center gap-10 shrink-0">
                      <span className="hover:text-accent transition-colors">{p.title}</span>
                      <span className="text-accent">✦</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel — one project at a time */}
            <div className="mt-2 md:mt-4">
              <ProjectCarousel projects={projects} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

type Project = { title: string; tag: string; url: string; img: string; desc: string };

function ProjectCarousel({ projects }: { projects: Project[] }) {
  const perPage = 1;
  const totalPages = Math.ceil(projects.length / perPage);
  const [[page, direction], setState] = useState<[number, number]>([0, 0]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const paginate = (dir: number) => {
    const next = (page + dir + totalPages) % totalPages;
    setState([next, dir]);
  };

  const startIdx = page * perPage;
  const visible = projects.slice(startIdx, startIdx + perPage);

  const openPreview = (img: string, title: string) => {
    setPreviewImg(img);
    setPreviewTitle(title);
    setPreviewOpen(true);
  };

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-white/10">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div>
              {visible.map((project) => (
                <div
                  key={project.title}
                  className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] min-h-[28rem] md:min-h-[36rem]"
                >
                  {/* Left: Content */}
                  <div className="p-6 md:p-10 flex flex-col justify-center order-2 lg:order-1">
                    <div className="text-xs uppercase tracking-widest text-white/40">
                      {project.tag}
                    </div>
                    <h4 className="mt-3 font-display text-3xl md:text-4xl text-white leading-tight">
                      {project.title}
                    </h4>
                    <p className="mt-4 text-white/60 text-base leading-relaxed max-w-md">
                      {project.desc}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs tracking-widest text-white/80 hover:bg-white hover:text-black transition-colors"
                      >
                        Visit Site →
                      </a>
                      <button
                        onClick={() => openPreview(project.img, project.title)}
                        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs tracking-widest text-white/80 hover:bg-white/20 transition-colors"
                      >
                        View Preview
                      </button>
                    </div>
                  </div>

                  {/* Right: Image */}
                  <button
                    onClick={() => openPreview(project.img, project.title)}
                    className="relative h-[20rem] lg:h-auto overflow-hidden group cursor-zoom-in order-1 lg:order-2 bg-black"
                    aria-label={`View full preview of ${project.title}`}
                  >
                    <img
                      src={project.img}
                      alt={`Preview of ${project.title}`}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                        View Full Preview
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => paginate(-1)}
          aria-label="Previous projects"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/15 text-white hover:bg-black/70 transition"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next projects"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/15 text-white hover:bg-black/70 transition"
        >
          →
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setState([i, i > page ? 1 : -1])}
            aria-label={`Go to page ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === page ? "bg-accent w-8" : "bg-white/20 w-2.5 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Full preview modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-md overflow-y-auto p-4 md:p-10"
            onClick={() => setPreviewOpen(false)}
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Close preview"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={previewImg}
              alt={`Full preview of ${previewTitle}`}
              className="max-w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── CAPABILITIES ───────────────────────── */

function Capabilities() {
  const items = [
    {
      tag: "WEB",
      title: "WEB DEVELOPMENT",
      body: "Responsive, performant websites and full-stack applications — from landing pages to complex SaaS platforms using React, Next.js and modern tooling.",
    },
    {
      tag: "MARKETING",
      title: "MARKETING",
      body: "Digital growth strategies, brand positioning, content marketing and SEO that turn visitors into customers and build lasting online presence.",
    },
    {
      tag: "CONSULTATION",
      title: "CONSULTATION",
      body: "Strategic tech and business guidance — helping startups and businesses choose the right stack, optimise workflows and scale with confidence.",
    },
    {
      tag: "TUTORING",
      title: "TUTORING",
      body: "One-to-one and group tech education — teaching web development, programming fundamentals and modern tools to students and career switchers.",
    },
  ];

  return (
    <section id="service" className="relative px-6 md:px-12 py-20">
      <SectionLabel num="03" label="CAPABILITIES" />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.tag} delay={i * 0.08}>
            <article className="card-surface rounded-3xl p-8 md:p-10 min-h-[360px] relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-64 h-64 glow-bg opacity-40 group-hover:opacity-70 transition-opacity" />
              <p className="section-label relative">{it.tag}</p>
              <h3 className="mt-3 font-display uppercase text-5xl md:text-6xl relative">
                {it.title}
              </h3>
              <p className="mt-5 max-w-sm text-muted-foreground relative">{it.body}</p>
              <button className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/30 px-5 py-2 text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors relative">
                ◂ EXPLORE
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── GROWTH ───────────────────────── */

/*
function Growth() {
  return (
    <section className="relative px-6 md:px-12 py-32">
      <SectionLabel num="05" label="PROFESSIONAL DEVELOPMENT" />
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-display uppercase text-5xl md:text-8xl max-w-3xl">
          PROFE<span className="accent-letter">S</span>SIONAL
          <br />
          GR<span className="accent-letter">O</span>WTH
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
          I continuously improve my technical and professional skills through practical learning and
          industry-focused training programs. Every certification represents a commitment to
          mastering modern engineering.
        </p>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div className="card-surface rounded-2xl aspect-video w-full" />
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <p className="section-label">CERTIFICATION</p>
            <h3 className="mt-3 font-display uppercase text-4xl md:text-5xl">
              TOP 1% WEB
              <br />
              DEVEL<span className="accent-letter">O</span>PMENT
            </h3>
            <p className="mt-4 font-serif-italic text-foreground/90">CODEPLUS Academy</p>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Completed an intensive full-stack training program covering modern frontend, backend,
              and deployment workflows — strengthening problem-solving and responsive application
              design.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
*/

/* ───────────────────────── TOOLKIT ───────────────────────── */

function Toolkit() {
  const stacks = [
    {
      tag: "FRONTEND",
      num: "01",
      items: ["REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "FRAMER MOTION", "GSAP"],
    },
    {
      tag: "BACKEND",
      num: "02",
      items: ["NODE", "PYTHON", "FLASK", "SPRING BOOT", "POSTGRESQL", "FIREBASE"],
    },
    {
      tag: "MARKETING",
      num: "03",
      items: ["SEO", "GOOGLE ADS", "META ADS", "CONTENT STRATEGY", "BRAND DESIGN"],
    },
    { tag: "TOOLS", num: "04", items: ["FIGMA", "VS CODE", "DOCKER", "GITHUB", "VERCEL", "AWS"] },
    {
      tag: "TEACH",
      num: "05",
      items: ["JAVASCRIPT", "REACT", "PYTHON", "WEB FUNDAMENTALS", "CAREER COACHING"],
      bright: true,
    },
  ];

  return (
    <section className="relative px-6 md:px-12 py-32">
      <SectionLabel num="08" label="TOOLS & TECHNOLOGIES" />
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-display uppercase text-5xl md:text-8xl max-w-5xl">
          THE T<span className="accent-letter">O</span>OLKIT
          <br />
          BEHIND TH<span className="accent-letter">E</span> CRAFT
        </h2>
      </Reveal>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4">
        {stacks.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.08}>
            <div
              className={`${s.bright ? "card-bright" : "card-surface"} rounded-2xl p-6 min-h-[460px] relative overflow-hidden flex flex-col`}
            >
              <div className="flex justify-between text-xs tracking-widest opacity-70">
                <span>{s.tag}</span>
                <span>{s.num}</span>
              </div>
              <div
                className={`absolute inset-x-0 top-1/3 h-32 ${s.bright ? "" : "glow-bg opacity-50"}`}
              />
              <ul className="mt-auto space-y-3 font-display uppercase text-xl relative">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── JOURNEY ───────────────────────── */

function Journey() {
  const jobs = [
    {
      num: "01",
      when: "2025 Sep — now",
      title: "WE WILL AUSTRALIA",
      role: "Technical Lead · Full-time · Remote · Promoted from UI/UX Engineer",
      bullets: [
        "Promoted from UI/UX Engineer to Technical Lead, now leading technical delivery across client web platforms",
        "Shipped Equalizer caravan site and S&R Estate Agents",
        "Led a cross-functional team of designers and interns, delivered user-centered designs across 10+ products",
        "Driving architecture, code quality and team direction",
      ],
    },
    {
      num: "02",
      when: "2025 Jun — now",
      title: "SKILL CITY FACILITY SOLUTIONS",
      role: "Digital Operations Manager · Promoted from Social Media Marketing Intern",
      bullets: [
        "Promoted from intern to lead digital operations within 5 months",
        "Own social media strategy, content execution and IT coordination",
        "Drive business development and marketing fulfillment end-to-end",
      ],
    },
    {
      num: "03",
      when: "2025 Mar — 2025 Sep",
      title: "XEYNERGY™",
      role: "UI/UX Engineer · Internship",
      bullets: [
        "Built complete frontend for Xeynergy's latest systems",
        "Stack: React, TypeScript, Next.js, Tailwind",
        "Design in Figma, shipped to production",
      ],
    },
    {
      num: "04",
      when: "2024 Jan — 2025 Mar",
      title: "BITMO",
      role: "UX Designer · Full-time · Sri Lanka",
      bullets: [
        "Crafted creatives fueling marketing campaigns",
        "Designed announcements across social media",
        "Graphic design with focus on customer satisfaction",
      ],
    },
  ];

  return (
    <section id="experience" className="relative px-6 md:px-12 py-32">
      <SectionLabel num="07" label="JOURNEY" />
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-display uppercase text-6xl md:text-8xl">
          THE P<span className="accent-letter">A</span>TH
          <br />
          SO F<span className="accent-letter">A</span>R
        </h2>
      </Reveal>

      <div className="mt-20 space-y-0">
        {jobs.map((j, i) => (
          <Reveal key={j.num} delay={i * 0.05}>
            <div className="grid md:grid-cols-12 gap-6 py-12 border-t border-border">
              <div className="md:col-span-3">
                <p className="text-xs tracking-widest text-accent">({j.num})</p>
                <p className="mt-3 font-serif-italic text-lg">{j.when}</p>
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display uppercase text-3xl md:text-4xl">{j.title}</h3>
                <p className="mt-3 text-muted-foreground">{j.role}</p>
              </div>
              <ul className="md:col-span-4 space-y-3">
                {j.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */

function AudioWave() {
  return (
    <div className="flex items-end gap-[3px] h-5">
      <span className="w-[3px] h-2 bg-foreground/80 rounded-full" />
      <span className="w-[3px] h-4 bg-foreground/60 rounded-full" />
      <span className="w-[3px] h-3 bg-foreground/80 rounded-full" />
      <span className="w-[3px] h-5 bg-foreground/90 rounded-full" />
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-12 py-32">
      <div className="relative rounded-[2rem] border border-border/60 overflow-hidden p-10 md:p-20 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] glow-bg opacity-60" />
        </div>
        <div className="relative">
          <SectionLabel num="09" label="LET'S TALK" />
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display uppercase text-5xl sm:text-6xl md:text-[6.5rem] lg:text-[8rem] leading-[0.9] tracking-tight">
              LET'S B<span className="accent-letter">U</span>ILD
              <br />
              THE NEW ERA OF
              <br />
              INTELLIG<span className="accent-letter">E</span>NT SOFTWARE.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="mailto:ahazfernando@gmail.com"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-10 py-4 text-sm tracking-[0.15em] font-medium hover:scale-105 transition-transform"
            >
              CONTACT ME
            </a>
          </Reveal>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left max-w-5xl mx-auto">
            {[
              {
                label: "EMAIL",
                value: "ahazfernando@gmail.com",
                href: "mailto:ahazfernando@gmail.com",
              },
              {
                label: "PHONE",
                value: "+94776992735",
                href: "tel:+94776992735",
              },
              { label: "LOCATION", value: "Kandy, Sri Lanka" },
              { label: "AVAILABLE", value: "Open for Web Projects, Marketing & Tutoring" },
            ].map((c) => (
              <Reveal key={c.label}>
                <div>
                  <p className="section-label">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-3 block text-foreground/90 hover:text-accent transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-foreground/90">{c.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <AudioWave />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 flex flex-wrap justify-between gap-4 text-xs tracking-widest text-muted-foreground border-t border-border">
      <span>© 2026 JORDAN</span>
      <span>BUILT WITH INTENT — KANDY, SRI LANKA</span>
    </footer>
  );
}
