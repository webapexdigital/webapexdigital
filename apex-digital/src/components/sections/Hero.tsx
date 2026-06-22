import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { LiquidButton } from '../ui/liquid-glass-button';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
];
const TOTAL_FRAMES = 192;
const FRAME_SPEED  = 1.0;   // animation completes at 100% scroll
const SCROLL_MULT  = 4;
const WRAPPER_HEIGHT = `${(SCROLL_MULT + 1) * 100}dvh`;

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Returns 0→1→0 opacity for a scroll window with 28% fade-in/out each side
function overlayAlpha(p: number, enter: number, leave: number): number {
  const fade = (leave - enter) * 0.28;
  if (p <= enter) return 0;
  if (p < enter + fade) return (p - enter) / fade;
  if (p < leave - fade) return 1;
  if (p < leave) return (leave - p) / fade;
  return 0;
}

// Object-cover math for HTMLImageElement → canvas
function drawFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cW: number,
  cH: number,
) {
  const iW = img.naturalWidth, iH = img.naturalHeight;
  const iAR = iW / iH, cAR = cW / cH;
  let sx = 0, sy = 0, sw = iW, sh = iH;
  if (iAR > cAR) { sw = iH * cAR; sx = (iW - sw) / 2; }
  else            { sh = iW / cAR; sy = (iH - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cW, cH);
}

export default function Hero() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const framesRef   = useRef<HTMLImageElement[]>([]);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadProgress,   setLoadProgress]   = useState(0);
  const [loaderDone,     setLoaderDone]      = useState(isMobile); // mobile skips loader

  // Mobile: kick off video playback
  useEffect(() => {
    if (!isMobile) return;
    videoRef.current?.play().catch(() => {});
  }, []);

  // Desktop: preload all 192 frames as Image objects
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    // Size canvas at device pixel ratio (crisp on retina)
    const { width, height } = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(width  * dpr);
    canvas.height = Math.round(height * dpr);

    // Block scroll while frames are loading
    document.body.style.overflow = 'hidden';

    const frames = new Array<HTMLImageElement>(TOTAL_FRAMES);
    framesRef.current = frames;
    let loaded = 0;

    const onLoad = (i: number, img: HTMLImageElement) => {
      frames[i] = img;
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));

      if (loaded === TOTAL_FRAMES) {
        document.body.style.overflow = '';
        setLoaderDone(true);
        // Immediately render frame 0 on canvas
        const ctx = canvas.getContext('2d');
        if (ctx && frames[0]) drawFrame(ctx, frames[0], canvas.width, canvas.height);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => onLoad(i, img);
      img.src = `/frames/hero/frame_${String(i + 1).padStart(4, '0')}.webp`;
    }

    return () => {
      document.body.style.overflow = '';
      framesRef.current = [];
    };
  }, []);

  // Desktop: bind scroll progress → frame index
  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrapper.style.height = '100dvh';
      if (ctaRef.current) {
        ctaRef.current.style.opacity   = '1';
        ctaRef.current.style.transform = 'none';
      }
      return;
    }

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,            // zero GSAP lag — tied directly to scrollbar
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p      = self.progress;
        const frames = framesRef.current;
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d');

        // ── Frame lookup ───────────────────────────────────────────────────
        if (canvas && ctx && frames.length > 0) {
          const frameIdx = Math.min(
            Math.floor(p * (TOTAL_FRAMES - 1) * FRAME_SPEED),
            TOTAL_FRAMES - 1,
          );
          const img = frames[frameIdx];
          if (img?.complete && img.naturalWidth > 0)
            drawFrame(ctx, img, canvas.width, canvas.height);
        }

        // ── Scroll progress bar ───────────────────────────────────────────
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${p})`;

        // ── Headline: fades out by p=0.20 ────────────────────────────────
        if (headlineRef.current) {
          const hp = Math.min(p / 0.20, 1);
          headlineRef.current.style.opacity   = String(1 - hp);
          headlineRef.current.style.transform = `translateY(${hp * -36}px)`;
        }

        // ── Cinematic overlays ────────────────────────────────────────────
        // Overlay 1: AI Video Ads  p=0.22→0.42  slides from left
        const a1 = overlayAlpha(p, 0.22, 0.42);
        if (overlay1Ref.current) {
          overlay1Ref.current.style.opacity   = String(a1);
          overlay1Ref.current.style.transform = `translateX(${(1 - a1) * -28}px)`;
        }
        // Overlay 2: AI Automation  p=0.46→0.63  slides from right
        const a2 = overlayAlpha(p, 0.46, 0.63);
        if (overlay2Ref.current) {
          overlay2Ref.current.style.opacity   = String(a2);
          overlay2Ref.current.style.transform = `translateX(${(1 - a2) * 28}px)`;
        }
        // Overlay 3: 3D Websites  p=0.66→0.80  slides up
        const a3 = overlayAlpha(p, 0.66, 0.80);
        if (overlay3Ref.current) {
          overlay3Ref.current.style.opacity   = String(a3);
          overlay3Ref.current.style.transform = `translateY(${(1 - a3) * 20}px)`;
        }

        // ── CTAs: appear at p=0.78→0.94 (near end of animation) ──────────
        if (ctaRef.current) {
          const cp = Math.max(0, (p - 0.78) / 0.16);
          ctaRef.current.style.opacity   = String(cp);
          ctaRef.current.style.transform = `translateY(${(1 - cp) * 18}px)`;
        }
      },
    });

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
          <img
            src="/apex-logo.png"
            alt="Apex Digital"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain select-none shrink-0"
          />

          <nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-[15px] font-medium text-[#1a1a3e]/70 hover:text-[#1a1a3e] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </nav>

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

      {/* Mobile full-screen menu */}
      <div
        className={`md:hidden fixed inset-0 z-[150] bg-white flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={label}
            onClick={() => scrollTo(href)}
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

      {/* ── Frame loader (desktop only) ───────────────────────────────────────── */}
      {!isMobile && (
        <div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black"
          style={{
            opacity: loaderDone ? 0 : 1,
            pointerEvents: loaderDone ? 'none' : 'auto',
            transition: 'opacity 0.7s ease',
          }}
        >
          <img
            src="/apex-logo.png"
            alt="Apex Digital"
            className="h-12 w-auto mb-10 opacity-80 select-none"
          />
          {/* Progress bar */}
          <div className="w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full origin-left rounded-full"
              style={{
                background: 'linear-gradient(90deg, #0099FF, #7B3CE8)',
                transform: `scaleX(${loadProgress / 100})`,
                transition: 'transform 0.12s linear',
              }}
            />
          </div>
          <p className="mt-4 text-[11px] font-medium text-white/30 uppercase tracking-[0.22em]">
            {loadProgress}%
          </p>
        </div>
      )}

      {/* ── Scroll wrapper ────────────────────────────────────────────────────── */}
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
          {/* Mobile: autoplay video loop */}
          {isMobile && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/herovid.webm" type="video/webm" />
              <source src="/herovid-mob.mp4" type="video/mp4" />
            </video>
          )}

          {/* Desktop: frame canvas */}
          {!isMobile && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />
          )}

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
            <p className="text-[10px] sm:text-[11px] font-medium text-white/55 uppercase tracking-[0.2em] mb-5 sm:mb-8 select-none">
              AI · 3D · AUTOMATION
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-7 select-none">
              Creating AI
              <br />
              <span className="font-mondwest font-normal">experiences</span>
              <br />
              that convert.
            </h1>

            <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xs sm:max-w-[420px]">
              Premium video ads, immersive 3D websites, and automation systems for founders who demand results.
            </p>
          </div>

          {/* ── CTAs ─────────────────────────────────────────────────────────── */}
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

          {/* ── Cinematic overlays (desktop) ─────────────────────────────── */}

          {/* Overlay 1 — AI Video Ads */}
          <div
            ref={overlay1Ref}
            className="absolute bottom-20 left-8 sm:left-14 hidden sm:block pointer-events-none select-none"
            style={{ opacity: 0, willChange: 'opacity, transform' }}
          >
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.22em] mb-2">
              AI Video Ads
            </p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white leading-[1.1]">
              Ads that stop<br />the scroll.
            </h3>
            <div className="mt-3 h-px w-12" style={{ background: 'linear-gradient(90deg,#0099FF,#7B3CE8)' }} />
          </div>

          {/* Overlay 2 — AI Automation */}
          <div
            ref={overlay2Ref}
            className="absolute bottom-20 right-8 sm:right-14 text-right hidden sm:block pointer-events-none select-none"
            style={{ opacity: 0, willChange: 'opacity, transform' }}
          >
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.22em] mb-2">
              AI Automation
            </p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white leading-[1.1]">
              Scale your business<br />while you sleep.
            </h3>
            <div className="mt-3 h-px w-12 ml-auto" style={{ background: 'linear-gradient(90deg,#7B3CE8,#0099FF)' }} />
          </div>

          {/* Overlay 3 — 3D Websites */}
          <div
            ref={overlay3Ref}
            className="absolute bottom-20 left-0 right-0 flex flex-col items-center hidden sm:flex pointer-events-none select-none"
            style={{ opacity: 0, willChange: 'opacity, transform' }}
          >
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.22em] mb-2">
              3D Websites
            </p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white text-center leading-[1.1]">
              Immersive experiences<br />that convert.
            </h3>
            <div className="mt-3 h-px w-12" style={{ background: 'linear-gradient(90deg,#0099FF,#7B3CE8)' }} />
          </div>

          {/* Scroll progress bar (desktop) */}
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
