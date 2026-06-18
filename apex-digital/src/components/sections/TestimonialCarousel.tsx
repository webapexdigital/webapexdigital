import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

const TESTIMONIALS = [
  {
    quote: "The AI video ads Apex delivered boosted our conversion rate by 3x in the first month. The quality was unlike anything we'd seen from traditional agencies.",
    name: 'Marcus Chen',
    role: 'CEO · TechVault',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    quote: "Their 3D website stopped prospects mid-sentence. Before we could even pitch, they were already asking who built our site.",
    name: 'Sarah Kim',
    role: 'Founder · LaunchFlow',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    quote: "The automation system Apex built saves us 40 hours per week. ROI was clear within the first billing cycle.",
    name: 'James Okonkwo',
    role: 'Head of Operations · Circulo',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    quote: "From concept to live AI ad campaign in two weeks. Fast, polished, data-driven — exactly what we needed for our Series A push.",
    name: 'Priya Mehta',
    role: 'CMO · Elevate Labs',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    quote: "Apex is rare — they understand AI at a technical level, not just surface trends. That depth shows in every deliverable.",
    name: 'David Park',
    role: 'Head of Design · Paradigm Labs',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
];

export default function TestimonialCarousel() {
  const { ref, isVisible } = useInViewAnimation();
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  useEffect(() => {
    if (hovered) return;
    intervalRef.current = setInterval(next, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hovered, current]);

  return (
    <section className="w-full py-20 px-6" id="testimonials">
      <div ref={ref} className="max-w-4xl ml-auto">
        {/* Header */}
        <div
          className={`flex items-end justify-between mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D0D2B] tracking-tight">
            What <span className="font-mondwest">builders</span> say
          </h2>
          <div className="flex items-center gap-1 shrink-0 ml-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#0D0D2B] text-[#0D0D2B]" />
            ))}
            <span className="text-sm text-[#273C46] ml-2">5/5</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.15s' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="overflow-hidden rounded-[40px]">
            <div
              className="flex"
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="min-w-full shrink-0 pr-1">
                  <div
                    className="bg-white rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-24 py-8"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  >
                    <svg className="mb-4 w-8 h-8 text-[#0099FF]" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-base text-[#0D0D2B] leading-relaxed mb-6">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm text-[#0D0D2B]">{t.name}</p>
                        <p className="text-sm text-[#273C46]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#0D0D2B]/20 flex items-center justify-center hover:bg-[#0D0D2B]/5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#0D0D2B]" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#0D0D2B]/20 flex items-center justify-center hover:bg-[#0D0D2B]/5 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#0D0D2B]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
