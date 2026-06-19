import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { CheckCircle2 } from 'lucide-react';

function IgIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function ClientProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    void ScrollTrigger;
    gsap.from(headRef.current, {
      y: 36, opacity: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
    gsap.from(cardRef.current, {
      y: 48, opacity: 0, scale: 0.96, duration: 1.0, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });
    gsap.from(badgeRef.current, {
      y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.4,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-[#F7F7FF]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headRef} className="mb-14 text-center">
          <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-[0.22em] mb-4">
            REAL CLIENT · REAL MESSAGE
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0D0D2B] leading-[1.1] tracking-tight">
            Don't take our word
            <br />
            <span className="font-mondwest font-normal">for it.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 justify-center">

          {/* ── DM screenshot in phone frame ──────────────────────── */}
          <div ref={cardRef} className="relative w-full max-w-sm shrink-0">
            {/* Phone shell */}
            <div
              className="relative rounded-[2.8rem] overflow-hidden"
              style={{
                background: '#1a1a2e',
                boxShadow:
                  '0 0 0 10px #111126, 0 0 0 12px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.38)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {/* Notch */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-24 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Screenshot */}
              <img
                src="/testimony-1.png"
                alt="Client DM from Binish Benny — abs_n_avocados"
                draggable={false}
                className="w-full block select-none"
                style={{ marginBottom: '-4px' }}
              />

              {/* Home bar */}
              <div className="flex justify-center py-3">
                <div className="w-28 h-1 rounded-full bg-white/25" />
              </div>
            </div>

            {/* Floating verified badge */}
            <div
              ref={badgeRef}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0099FF, #7B3CE8)',
                boxShadow: '0 4px 20px rgba(123,60,232,0.45)',
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Real DM · Verified
            </div>
          </div>

          {/* ── Quote + client info ───────────────────────────────── */}
          <div className="max-w-lg">
            {/* Large quote mark */}
            <div
              className="text-[80px] leading-none font-heading font-bold mb-0 select-none"
              style={{ color: 'rgba(123,60,232,0.15)', lineHeight: 0.8, marginBottom: '16px' }}
              aria-hidden
            >
              "
            </div>

            <blockquote className="text-xl md:text-2xl font-heading font-bold text-[#0D0D2B] leading-[1.35] tracking-tight mb-6">
              The AI video turned out really awesome! It looks professional, engaging, and different from regular content.
            </blockquote>

            <p className="text-base text-[var(--body)] leading-relaxed mb-8">
              "I really liked the concept and the way you brought the idea to life with such creative visuals. Great work! Excited to collaborate on more projects with you."
            </p>

            {/* Client card */}
            <div
              className="inline-flex items-center gap-4 px-5 py-3.5 rounded-2xl"
              style={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 16px rgba(13,13,43,0.07)',
              }}
            >
              {/* Brand avatar circle */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #0099FF, #7B3CE8)' }}
              >
                ANA
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-semibold text-[#0D0D2B]">Binish Benny</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF]" />
                </div>
                <a
                  href="https://instagram.com/abs_n_avocados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[13px] text-[var(--muted)] hover:text-[#7B3CE8] transition-colors"
                >
                  <IgIcon />
                  abs_n_avocados · Abs N Avocados
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
