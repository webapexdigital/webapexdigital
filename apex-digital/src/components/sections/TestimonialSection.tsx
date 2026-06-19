import { useRef } from 'react';
import { Mail, Send, MapPin, Home, Search, Zap } from 'lucide-react';
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

export default function AutomationSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLUListElement>(null);
  const logoCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Suppress registration warning
    void ScrollTrigger;

    gsap.from(headRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });

    gsap.from(logoCardRef.current, {
      scale: 0.88, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });

    if (listRef.current) {
      gsap.from(Array.from(listRef.current.children), {
        y: 20, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.07,
        scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

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

          {/* ── Right: floating image ────────────────────────────── */}
          <div ref={logoCardRef} className="flex items-center justify-center">
            <img
              src="/transp-logo-apex.png"
              alt="Apex Digital"
              className="w-full max-w-[560px] select-none animate-float"
              style={{ willChange: 'transform' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
