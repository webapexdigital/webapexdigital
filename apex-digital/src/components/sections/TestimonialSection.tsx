import { useRef } from 'react';
import { Mail, Send, MapPin, Home, Search, Zap, ImageOff } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const PROJECTS = [
  {
    icon: <Mail className="w-4 h-4" />,
    name: 'AI Newsletter Automation',
    description: 'Auto-generates and dispatches personalised newsletters weekly',
  },
  {
    icon: <Send className="w-4 h-4" />,
    name: 'Cold Email Outreach',
    description: 'AI-written sequences with CRM sync and reply detection',
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    name: 'Google Maps Lead Gen',
    description: 'Scrapes, enriches, and qualifies leads from Google Maps',
  },
  {
    icon: <Home className="w-4 h-4" />,
    name: 'House Expense Splitter',
    description: 'Tracks shared property costs and auto-splits between owners',
  },
  {
    icon: <Search className="w-4 h-4" />,
    name: 'Sales Cold Emailing',
    description: 'End-to-end outreach pipeline from prospect list to booked call',
  },
  {
    icon: <Zap className="w-4 h-4" />,
    name: 'Painpoint Generator',
    description: 'AI research agent that surfaces customer pain points on demand',
  },
];

// ── Add your screenshot paths here when ready ──────────────────────────
// e.g. src: '/screenshots/newsletter-automation.png'
const SCREENSHOTS = [
  { src: '', label: 'Newsletter Automation' },
  { src: '', label: 'Cold Email Outreach' },
  { src: '', label: 'Lead Gen Pipeline' },
  { src: '', label: 'Painpoint Generator' },
];

function ScreenshotCard({ src, label, index }: { src: string; label: string; index: number }) {
  const colors = [
    'from-[#e8f0ff] to-[#f0e8ff]',
    'from-[#e8fff4] to-[#e8f0ff]',
    'from-[#fff8e8] to-[#ffe8f0]',
    'from-[#f0e8ff] to-[#e8f8ff]',
  ];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Screenshot or placeholder */}
      <div className="aspect-video w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} flex flex-col items-center justify-center gap-2`}>
            {/* Fake browser bar */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-white/60 backdrop-blur-sm flex items-center gap-1.5 px-3">
              <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#28C840]" />
              <div className="ml-2 h-3 w-28 rounded-sm bg-white/70" />
            </div>
            <ImageOff className="w-6 h-6 text-[#9CA3AF] mt-4" strokeWidth={1.5} />
            <span className="text-[11px] text-[#9CA3AF] font-medium">Screenshot coming soon</span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="px-3 py-2.5 border-t border-[#F3F4F6]">
        <p className="text-[12px] font-semibold text-[#0D0D2B] truncate">{label}</p>
      </div>
    </div>
  );
}

export default function AutomationSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const headRef         = useRef<HTMLDivElement>(null);
  const listRef         = useRef<HTMLUListElement>(null);
  const screenshotsRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    void ScrollTrigger;

    gsap.from(headRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });

    if (screenshotsRef.current) {
      gsap.from(Array.from(screenshotsRef.current.children), {
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: screenshotsRef.current, start: 'top 80%' },
      });
    }

    if (listRef.current) {
      gsap.from(Array.from(listRef.current.children), {
        y: 20, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.07,
        scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: copy + project list ────────────────────────── */}
          <div>
            <div ref={headRef}>
              <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-[0.2em] mb-5">
                AI AUTOMATION
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0D0D2B] leading-[1.1] tracking-tight mb-4">
                We automate the<br />
                <span className="font-mondwest font-normal">work you hate.</span>
              </h2>
              <p className="text-base text-[var(--body)] leading-relaxed max-w-md mb-10">
                From lead generation to email outreach — if it's repetitive,
                we build a system that handles it while you sleep.
              </p>
            </div>

            <ul ref={listRef} className="divide-y divide-[#E5E7EB]">
              {PROJECTS.map(p => (
                <li key={p.name} className="flex items-start gap-4 py-4 group">
                  <span
                    className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full shrink-0
                      bg-[#F0F0FF] text-[#7B3CE8]
                      group-hover:bg-[#7B3CE8] group-hover:text-white
                      transition-colors duration-200"
                  >
                    {p.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0D0D2B] leading-snug">{p.name}</p>
                    <p className="text-sm text-[var(--body)] mt-0.5">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: screenshot grid ───────────────────────────── */}
          <div className="lg:pt-8">
            <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-[0.2em] mb-5">
              OUR WORK
            </p>
            <div ref={screenshotsRef} className="grid grid-cols-2 gap-3">
              {SCREENSHOTS.map((shot, i) => (
                <ScreenshotCard key={shot.label} src={shot.src} label={shot.label} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
