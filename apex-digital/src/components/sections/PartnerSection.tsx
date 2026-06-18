import { useRef, useCallback, useEffect } from 'react';
import Button from '../ui/Button';

const TRAIL_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
];

export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const imgIndexRef = useRef(0);

  useEffect(() => {
    return () => {
      containerRef.current
        ?.querySelectorAll('[data-trail]')
        .forEach(el => el.remove());
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 80) return;
    lastSpawnRef.current = now;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = (Math.random() - 0.5) * 20;

    const img = document.createElement('img');
    img.setAttribute('data-trail', '');
    img.src = TRAIL_IMAGES[imgIndexRef.current % TRAIL_IMAGES.length];
    imgIndexRef.current++;
    img.style.cssText = `
      position:absolute;
      left:${x - 55}px;
      top:${y - 44}px;
      width:110px;
      height:88px;
      object-fit:cover;
      border-radius:14px;
      transform:rotate(${rotation}deg) scale(0.9);
      pointer-events:none;
      z-index:10;
      opacity:0;
      transition:opacity 0.15s ease,transform 1s ease;
    `;

    container.appendChild(img);

    requestAnimationFrame(() => {
      img.style.opacity = '0.88';
      img.style.transform = `rotate(${rotation}deg) scale(1)`;
      setTimeout(() => {
        img.style.opacity = '0';
        img.style.transform = `rotate(${rotation}deg) scale(0.8)`;
        setTimeout(() => img.remove(), 1000);
      }, 600);
    });
  }, []);

  return (
    <section className="py-12 px-6" id="contact">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative bg-white rounded-[40px] py-48 text-center overflow-hidden"
          style={{ boxShadow: '0 2px 40px rgba(13,13,43,0.06)' }}
        >
          <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-mondwest text-[#0D0D2B] mb-12 leading-none pointer-events-none relative z-20">
            Partner with us
          </h2>
          <div className="relative z-20 pointer-events-auto">
            <Button href="mailto:hello@apexdigital.in" variant="primary">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              Start chat with Apex Digital
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
