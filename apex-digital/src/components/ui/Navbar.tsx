import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Process',  href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const navRef  = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    let lastY = 0;
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        const y = self.scroll();
        if (y > lastY && y > 80) {
          gsap.to(navRef.current, { yPercent: -110, duration: 0.35, ease: 'power2.inOut', overwrite: true });
        } else {
          gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
        }
        lastY = y;
      },
    });
  }, []);

  const scroll = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 will-change-transform"
      style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(229,231,235,0.7)' }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark />
          <span className="font-heading font-bold text-base tracking-tight text-navy hidden sm:block" style={{ letterSpacing: '-0.03em' }}>
            APEX <span className="gradient-text">DIGITAL</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scroll(l.href)}
              className="text-sm font-medium text-[var(--body)] hover:text-navy transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://instagram.com/webapexdigital" target="_blank" rel="noopener noreferrer"
            className="text-sm text-muted hover:text-navy transition-colors font-medium">
            @webapexdigital
          </a>
          <button onClick={() => scroll('#contact')}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer"
            style={{ background: 'var(--gradient)' }}>
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className="block h-px w-6 bg-navy transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translate(2px,2px)' : undefined }} />
          <span className="block h-px w-6 bg-navy transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
          <span className="block h-px w-6 bg-navy transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translate(2px,-2px)' : undefined }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '300px' : '0' }}>
        <nav className="container flex flex-col gap-1 py-4 border-t border-border">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scroll(l.href)}
              className="text-left text-base font-medium text-navy py-2.5 px-2 rounded-lg hover:bg-bg-alt transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
          <button onClick={() => scroll('#contact')}
            className="mt-2 text-sm font-semibold text-white py-3 rounded-full cursor-pointer"
            style={{ background: 'var(--gradient)' }}>
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="50%" stopColor="#185fa5" />
          <stop offset="100%" stopColor="#7B3CE8" />
        </linearGradient>
      </defs>
      <polygon points="18,3 33,30 3,30" fill="url(#lg1)" />
      <rect x="10" y="22" width="16" height="3" rx="1" fill="white" />
      <polygon points="18,10 23.5,20 12.5,20" fill="white" />
    </svg>
  );
}
