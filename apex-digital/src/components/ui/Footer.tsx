import { GrainGradient, grainGradientPresets } from '@paper-design/shaders-react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── Grain gradient CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        {/* Shader background */}
        <GrainGradient
          {...grainGradientPresets[0]}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />

        {/* Overlay for contrast */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'rgba(0,0,0,0.18)' }}
        />

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 max-w-4xl mx-auto h-full">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55 mb-6">
            LET'S BUILD TOGETHER
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight mb-6">
            Ready to build
            <br />
            <span className="font-mondwest font-normal">the future?</span>
          </h2>

          <p className="text-base sm:text-lg text-white/65 max-w-lg leading-relaxed mb-10">
            AI video ads, intelligent automation, and 3D web experiences — all under one roof. Let's talk about what we can build for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@apexdigital.in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0D0D2B] text-[15px] font-semibold hover:bg-white/90 active:scale-[0.97] transition-all duration-200 select-none"
            >
              Start a conversation
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </a>
            <a
              href="https://instagram.com/webapexdigital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white text-[15px] font-semibold hover:bg-white/10 active:scale-[0.97] transition-all duration-200 select-none"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Slim copyright bar ─────────────────────────────────────────────── */}
      <div className="bg-[#0D0D2B] px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[13px] text-white/40">Apex Digital © 2026</span>

          <nav className="flex items-center gap-6">
            {['#pricing', '#work', '#contact'].map((href, i) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-[13px] text-white/40 hover:text-white/70 transition-colors cursor-pointer"
              >
                {['Services', 'Work', 'Contact'][i]}
              </button>
            ))}
          </nav>

          <span className="text-[13px] text-white/40">India & Global</span>
        </div>
      </div>
    </>
  );
}
