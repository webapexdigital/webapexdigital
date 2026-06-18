import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { LiquidButton } from '../ui/liquid-glass-button';

const NAV_LINKS = ['Services', 'Work', 'Process', 'Contact'];
const SCROLL_MULT = 4;
const WRAPPER_HEIGHT = `${(SCROLL_MULT + 1) * 100}dvh`;

// Synchronous check — runs during render, prevents opacity flash
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function Hero() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile: autoplay loop ─────────────────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const video = videoRef.current;
    if (!video) return;
    video.autoplay = true;
    video.loop = true;
    video.play().catch(() => {});
  }, []);

  // Desktop: CSS sticky + ScrollTrigger scrub ──────────────────────────────────
  useGSAP(() => {
    const video   = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    // Mobile / reduced-motion: collapse wrapper, show everything immediately
    const skip = window.innerWidth < 768 ||
                 window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (skip) {
      wrapper.style.height = '100dvh';
      if (ctaRef.current) {
        ctaRef.current.style.opacity   = '1';
        ctaRef.current.style.transform = 'none';
      }
      return;
    }

    const setup = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        // scrub:1 — GSAP smoothly chases scroll over 1 s, giving the
        // browser a full animation frame to decode each keyframe before
        // the next seek lands. Tighter values compound with decode time
        // and produce visible jitter.
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // One seek per frame (0.033 = 30 fps threshold).
          // Modern browsers discard in-flight seeks automatically —
          // no guard state needed.
          const target = p * duration;
          if (Math.abs(video.currentTime - target) > 0.033) {
            video.currentTime = target;
          }

          // Progress bar
          if (progressRef.current)
            progressRef.current.style.transform = `scaleX(${p})`;

          // Headline fades out over first 12%
          if (headlineRef.current) {
            const hp = Math.min(p / 0.12, 1);
            headlineRef.current.style.opacity  = String(1 - hp);
            headlineRef.current.style.transform = `translateY(${hp * -28}px)`;
          }

          // CTAs fade in over last 18%
          if (ctaRef.current) {
            const cp = Math.max(0, (p - 0.82) / 0.18);
            ctaRef.current.style.opacity  = String(cp);
            ctaRef.current.style.transform = `translateY(${(1 - cp) * 18}px)`;
          }
        },
      });
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener('loadedmetadata', setup, { once: true });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  void gsap;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Floating Pill Navbar ──────────────────────────────────────────────── */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-[200] flex justify-center px-3 sm:px-6 pointer-events-none">
        <div
          className="flex items-center w-full max-w-5xl px-3 sm:px-5 py-1.5 sm:py-2 rounded-full pointer-events-auto"
          style={{
            background: 'linear-gradient(100deg, rgba(255,255,255,0.88) 0%, rgba(220,210,255,0.60) 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.60)',
            boxShadow: '0 4px 28px rgba(13,13,43,0.09)',
          }}
        >
          {/* Logo — smaller on mobile so the pill stays compact */}
          <img
            src="/apex-logo.png"
            alt="Apex Digital"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain select-none shrink-0"
          />

          {/* Desktop nav links — centered */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(label => (
              <button
                key={label}
                onClick={() => scrollTo(`#${label.toLowerCase()}`)}
                className="text-[15px] font-medium text-[#1a1a3e]/70 hover:text-[#1a1a3e] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => scrollTo('#contact')}
              className="text-[15px] font-medium text-[#1a1a3e]/70 hover:text-[#1a1a3e] transition-colors duration-200 cursor-pointer"
            >
              Get in touch
            </button>
            <button
              onClick={() => scrollTo('#work')}
              className="text-[14px] font-medium bg-[#0D0D2B] text-white px-5 py-2.5 rounded-full hover:opacity-85 active:scale-[0.97] transition-all duration-200 cursor-pointer select-none min-h-[40px]"
            >
              See our work
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto flex items-center justify-center p-2 cursor-pointer min-w-[44px] min-h-[44px] text-[#0D0D2B] focus:outline-none rounded-full"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5" strokeWidth={2} />
              : <Menu className="w-5 h-5" strokeWidth={2} />
            }
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu — z-[150] beats sticky/will-change stacking contexts in hero */}
      <div
        className={`md:hidden fixed inset-0 z-[150] bg-white flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map(label => (
          <button
            key={label}
            onClick={() => scrollTo(`#${label.toLowerCase()}`)}
            className="text-3xl font-medium text-[#0D0D2B] cursor-pointer hover:opacity-60 transition-opacity min-h-[44px] flex items-center"
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('#contact')}
          className="mt-4 text-[15px] font-medium bg-[#0D0D2B] text-white px-8 py-3 rounded-full cursor-pointer hover:opacity-85 transition-opacity min-h-[44px]"
        >
          Get in touch
        </button>
      </div>

      {/* ── Scroll wrapper ────────────────────────────────────────────────────── */}
      {/*   max-h-[100dvh] on mobile prevents the 500dvh FOUC before JS runs     */}
      <div
        ref={wrapperRef}
        className="relative bg-black max-h-[100dvh] md:max-h-none"
        style={{ height: WRAPPER_HEIGHT }}
      >
        <section
          ref={sectionRef}
          className="sticky top-0 w-full overflow-hidden bg-black"
          style={{ height: '100dvh' }}
        >
          {/* Video — opacity set synchronously to avoid flash */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            autoPlay={isMobile}
            loop={isMobile}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 1 }}
          >
            <source src={isMobile ? '/herovid-mob.mp4' : '/herovid.mp4'} type="video/mp4" />
            {!isMobile && <source src="/herovid.webm" type="video/webm" />}
          </video>

          {/* Scrims */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.75) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none hidden sm:block"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.24) 0%, transparent 55%)' }}
          />

          {/* ── Headline ─────────────────────────────────────────────────────── */}
          <div
            ref={headlineRef}
            className="absolute inset-0 flex flex-col justify-center px-5 sm:px-10 max-w-7xl mx-auto pb-28 sm:pb-0 pt-20 sm:pt-0"
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Eyebrow */}
            <p className="text-[10px] sm:text-[11px] font-medium text-white/55 uppercase tracking-[0.2em] mb-5 sm:mb-8 select-none">
              AI · 3D · AUTOMATION
            </p>

            {/* Headline — Syne 700 from index.css base rule */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-7 select-none">
              Creating AI
              <br />
              <span className="font-mondwest font-normal">experiences</span>
              <br />
              that convert.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xs sm:max-w-[420px]">
              Premium video ads, immersive 3D websites, and automation systems for founders who demand results.
            </p>
          </div>

          {/* ── CTAs ─────────────────────────────────────────────────────────── */}
          {/* On mobile: visible immediately (isMobile opacity) + stacked vertically */}
          {/* On desktop: fades in at scroll end via GSAP                          */}
          <div
            ref={ctaRef}
            className="absolute bottom-8 sm:bottom-16 left-0 right-0 flex flex-col sm:flex-row justify-center items-center gap-3 px-5 sm:px-6"
            style={{ opacity: isMobile ? 1 : 0, willChange: 'opacity, transform' }}
          >
            <LiquidButton
              onClick={() => scrollTo('#work')}
              size="xl"
              className="w-full sm:w-auto text-[15px] font-semibold text-white min-h-[48px]"
            >
              See our work
            </LiquidButton>
            <LiquidButton
              onClick={() => scrollTo('#contact')}
              size="xl"
              className="w-full sm:w-auto text-[15px] font-semibold text-white/90 min-h-[48px]"
            >
              Get in touch
            </LiquidButton>
          </div>

          {/* Progress bar — desktop only */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/12 hidden sm:block">
            <div
              ref={progressRef}
              className="h-full bg-white/50 origin-left"
              style={{ transform: 'scaleX(0)', willChange: 'transform' }}
            />
          </div>
        </section>
      </div>
    </>
  );
}
