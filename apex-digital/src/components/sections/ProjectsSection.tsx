import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { SpeedLinesBackground } from '../ui/speed-lines-shader';
import { ArrowUpRight } from 'lucide-react';
import GlowRevealCard from '../ui/GlowRevealCard';
import InteractivePortrait from '../ui/InteractivePortrait';
import { DynamicFrameLayout } from '../ui/dynamic-frame-layout';

const DEMO_FRAMES = [
  { id:1, video:"/videos-created/GOOD DAY COFFEE REVISED.webm",              defaultPos:{x:0,y:0,w:4,h:4}, mediaSize:1, isHovered:false },
  { id:2, video:"/videos-created/FIESTA REEL-1.webm",                        defaultPos:{x:4,y:0,w:4,h:4}, mediaSize:1, isHovered:false, portrait:true },
  { id:3, video:"/videos-created/Revised hd.webm",                           defaultPos:{x:8,y:0,w:4,h:4}, mediaSize:1, isHovered:false, portrait:true },
  { id:4, video:"/videos-created/mango-splash-web.webm",                    defaultPos:{x:0,y:4,w:4,h:4}, mediaSize:1, isHovered:false },
  { id:5, video:"/videos-created/web-video.webm",                           defaultPos:{x:4,y:4,w:4,h:4}, mediaSize:1, isHovered:false },
  { id:6, video:"/videos-created/belor ad vid.webm",                         defaultPos:{x:8,y:4,w:4,h:4}, mediaSize:1, isHovered:false, portrait:true },
  { id:7, video:"/videos-created/cookie cute vid.webm",                      defaultPos:{x:0,y:8,w:4,h:4}, mediaSize:1, isHovered:false },
  { id:8, video:"/videos-created/Revised and Final Version Video - With Logo.webm", defaultPos:{x:4,y:8,w:4,h:4}, mediaSize:1, isHovered:false },
  { id:9, video:"/videos-created/redmax ad.webm",                            defaultPos:{x:8,y:8,w:4,h:4}, mediaSize:1, isHovered:false, portrait:true },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const featRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    gsap.from(featRef.current, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: featRef.current, start: 'top 82%' },
    });
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden py-24 md:py-32">

      {/* Shader background */}
      <div className="absolute inset-0 z-0">
        <SpeedLinesBackground className="w-full h-full" />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      <div className="relative z-[2] max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="mb-12 md:mb-16">
          <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.22em] mb-4">
            OUR WORK
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.08] tracking-tight">
            Results that
            <br />
            <span className="font-mondwest font-normal">speak for themselves.</span>
          </h2>
        </div>

        {/* ── Featured card: Orion AI — tilt + glow reveal ────────── */}
        <div ref={featRef} className="mb-5">
          <InteractivePortrait className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 60px rgba(123,60,232,0.18)',
            }}
          >
            <GlowRevealCard
              baseImg="/apexpic.png"
              glowImg="/apexpic-glow.png"
              alt="Orion AI project"
              className="w-full h-[320px] sm:h-[420px] md:h-[540px]"
            >
              {/* Content bar at bottom */}
              <div
                className="p-6 md:p-8"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                }}
              >
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0099FF] mb-3">
                  Interactive 3D Experience
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-mondwest text-2xl md:text-3xl lg:text-4xl text-white mb-2 leading-snug">
                      Your brand,<br className="hidden sm:block" /> built to be felt.
                    </h3>
                    <p className="text-sm md:text-base text-white/55 max-w-lg leading-relaxed">
                      What you're doing right now — tilting, painting, exploring — is exactly what your customers experience. We build websites that people can't stop touching.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full hidden sm:inline-block"
                      style={{
                        background: 'rgba(123,60,232,0.18)',
                        border: '1px solid rgba(123,60,232,0.35)',
                        color: '#b57bff',
                      }}
                    >
                      3D · AI · Motion
                    </span>
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.18)',
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              </div>
            </GlowRevealCard>

            {/* Hint pill */}
            <div
              className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-white/70 font-medium z-10"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B3CE8] animate-pulse-glow inline-block" />
              Paint to reveal
            </div>
          </InteractivePortrait>
        </div>

        {/* ── Dynamic video grid ───────────────────────────────── */}
        <div className="mt-5 rounded-2xl overflow-hidden" style={{ height: 560 }}>
          <DynamicFrameLayout
            frames={DEMO_FRAMES}
            className="w-full h-full"
            hoverSize={6}
            gapSize={4}
          />
        </div>

      </div>
    </section>
  );
}
