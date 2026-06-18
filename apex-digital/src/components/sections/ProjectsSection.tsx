import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { SpeedLinesBackground } from '../ui/speed-lines-shader';
import { ArrowUpRight } from 'lucide-react';
import GlowRevealCard from '../ui/GlowRevealCard';
import InteractivePortrait from '../ui/InteractivePortrait';

const SECONDARY_PROJECTS = [
  {
    tag: 'Automation',
    name: 'AutoFlow',
    description: 'End-to-end business automation cutting operational overhead by 60%',
    result: '60% cost reduction',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    tag: '3D Website',
    name: 'Cosmos 3D',
    description: 'Immersive 3D scroll experience that tripled time-on-site for a Web3 protocol',
    result: '3× engagement',
    img: 'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=800&q=80',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const featRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    gsap.from(featRef.current, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: featRef.current, start: 'top 82%' },
    });
    if (cardsRef.current) {
      gsap.from(Array.from(cardsRef.current.children), {
        y: 50, opacity: 0, duration: 0.75, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      });
    }
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

        {/* ── Secondary cards ───────────────────────────────────── */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SECONDARY_PROJECTS.map((p) => (
            <div
              key={p.name}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="relative overflow-hidden h-52 md:h-60">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5 md:p-6">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0099FF] mb-3">
                  {p.tag}
                </span>
                <h3 className="font-mondwest text-xl md:text-2xl text-white mb-2 leading-snug">
                  {p.name}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">
                  {p.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(0,153,255,0.15)',
                      border: '1px solid rgba(0,153,255,0.30)',
                      color: '#5bc8ff',
                    }}
                  >
                    {p.result}
                  </span>
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 group-hover:scale-110"
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
          ))}
        </div>

      </div>
    </section>
  );
}
