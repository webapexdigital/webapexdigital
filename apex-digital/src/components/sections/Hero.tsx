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

// Object-cover draw: crops the bitmap to fill the canvas exactly
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  cW: number,
  cH: number,
) {
  const fA = img.width / img.height;
  const cA = cW / cH;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (fA > cA) { sw = img.height * cA; sx = (img.width - sw) / 2; }
  else          { sh = img.width  / cA; sy = (img.height - sh) / 2; }
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

  // Frame sequence state — refs so GSAP onUpdate closure can read live values
  const framesRef = useRef<ImageBitmap[]>([]);
  const readyRef  = useRef(false);
  const [videoHidden, setVideoHidden] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile: autoplay loop
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const video = videoRef.current;
    if (!video) return;
    video.autoplay = true;
    video.loop = true;
    video.play().catch(() => {});
  }, []);

  // Desktop: capture every frame via a hidden video that plays at 4×
  // requestVideoFrameCallback (Chrome 83+ / Edge / Safari 15.4+) fires
  // exactly once per decoded frame — no polling, no seek latency.
  // Falls back to a 24 fps setInterval for Firefox.
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    let cancelled = false;

    // Hidden capture video — browser reuses the cached response for /herovid.mp4
    const cap = document.createElement('video');
    cap.src     = '/herovid.mp4';
    cap.muted   = true;
    cap.preload = 'auto';

    const run = () => {
      if (cancelled) return;
      const duration = cap.duration;
      if (!duration || isNaN(duration)) return;

      // Size display canvas to the sticky section at device pixel ratio
      const { width, height } = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(width  * dpr);
      canvas.height = Math.round(height * dpr);

      // Capture at video native resolution (drawCover handles aspect ratio)
      const cc = document.createElement('canvas');
      cc.width  = cap.videoWidth  || 1280;
      cc.height = cap.videoHeight || 720;
      const cctx = cc.getContext('2d')!;

      const frames  = framesRef.current;
      let lastTime  = -1;
      const MIN_GAP = 1 / 24; // store up to 24 fps

      const finish = () => {
        if (cancelled) return;
        cap.pause();
        cap.src = '';
        if (frames.length > 2) {
          readyRef.current = true;
          setVideoHidden(true);
        }
      };

      cap.playbackRate = 4; // 10s video ≈ 2.5s capture time
      cap.currentTime  = 0;
      cap.play().catch(() => {});

      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        const tick = (_: number, meta: { mediaTime: number }) => {
          if (cancelled) return;
          if (meta.mediaTime - lastTime >= MIN_GAP) {
            lastTime = meta.mediaTime;
            cctx.drawImage(cap, 0, 0);
            // createImageBitmap uploads to GPU — drawImage from it is zero-copy
            createImageBitmap(cc).then(bm => {
              if (!cancelled) frames.push(bm);
            });
          }
          if (meta.mediaTime < duration - MIN_GAP) {
            (cap as any).requestVideoFrameCallback(tick);
          } else {
            finish();
          }
        };
        (cap as any).requestVideoFrameCallback(tick);
      } else {
        // Firefox fallback: poll at ~24 fps
        const id = setInterval(() => {
          if (cancelled) { clearInterval(id); return; }
          cctx.drawImage(cap, 0, 0);
          createImageBitmap(cc).then(bm => {
            if (!cancelled) frames.push(bm);
          });
          if (cap.ended || cap.currentTime >= duration - 0.05) {
            clearInterval(id);
            finish();
          }
        }, 42);
        cap.addEventListener('ended', () => { clearInterval(id); finish(); }, { once: true });
      }
    };

    if (cap.readyState >= 1) run();
    else cap.addEventListener('loadedmetadata', run, { once: true });

    return () => {
      cancelled = true;
      cap.src = '';
      framesRef.current.forEach(bm => bm.close());
      framesRef.current = [];
      readyRef.current  = false;
    };
  }, []);

  // Desktop: ScrollTrigger scrub
  useGSAP(() => {
    const video   = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

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
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Frame cache path: O(1) array lookup, no decode, no seek —
          // drawImage(ImageBitmap) is a zero-copy GPU blit.
          const frames = framesRef.current;
          if (readyRef.current && frames.length > 0) {
            const canvas = canvasRef.current;
            const ctx    = canvas?.getContext('2d');
            if (canvas && ctx) {
              const i = Math.min(
                Math.round(p * (frames.length - 1)),
                frames.length - 1,
              );
              if (frames[i]) drawCover(ctx, frames[i], canvas.width, canvas.height);
            }
          } else {
            // While frames are still being captured: fall back to video seek
            const t = p * duration;
            if (Math.abs(video.currentTime - t) > 0.033) video.currentTime = t;
          }

          if (progressRef.current)
            progressRef.current.style.transform = `scaleX(${p})`;

          if (headlineRef.current) {
            const hp = Math.min(p / 0.12, 1);
            headlineRef.current.style.opacity  = String(1 - hp);
            headlineRef.current.style.transform = `translateY(${hp * -28}px)`;
          }

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
          <img
            src="/apex-logo.png"
            alt="Apex Digital"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain select-none shrink-0"
          />

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
          {/* Video — fallback while frames capture, permanent on mobile */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            autoPlay={isMobile}
            loop={isMobile}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: videoHidden && !isMobile ? 0 : 1,
              transition: 'opacity 0.5s',
            }}
          >
            <source src={isMobile ? '/herovid-mob.mp4' : '/herovid.mp4'} type="video/mp4" />
          </video>

          {/* Frame canvas — replaces video on desktop once extraction completes.
              CSS width/height 100% fills the section; canvas.width/height are set
              in physical pixels so drawCover produces a crisp HiDPI result. */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              width: '100%',
              height: '100%',
              opacity: videoHidden && !isMobile ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          />

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
