import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface Testimonial {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

interface CardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<CardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-[#0D0D2B] text-white border-[#0D0D2B]'
          : 'z-0 bg-white text-[#0D0D2B] border-[#E5E7EB] hover:border-[#0D0D2B]/40'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px #E5E7EB'
          : '0px 0px 0px 0px transparent',
      }}
    >
      {/* Folded corner diagonal */}
      <span
        className="absolute block origin-top-right rotate-45 bg-[#E5E7EB]"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />

      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{ boxShadow: '3px 3px 0px #FFFFFF' }}
      />

      <h3 className={cn(
        'text-base sm:text-lg font-medium leading-snug',
        isCenter ? 'text-white' : 'text-[#0D0D2B]',
      )}>
        "{testimonial.testimonial}"
      </h3>

      <p className={cn(
        'absolute bottom-8 left-8 right-8 text-sm italic',
        isCenter ? 'text-white/70' : 'text-[#9CA3AF]',
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

interface StaggerTestimonialsProps {
  testimonials: Testimonial[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ testimonials: initial }) => {
  const [cardSize, setCardSize]   = useState(365);
  const [list, setList]           = useState(initial);

  const handleMove = (steps: number) => {
    const next = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(next);
  };

  useEffect(() => {
    const update = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#F0F0FF]/30" style={{ height: 600 }}>
      {list.map((t, index) => {
        const position = list.length % 2
          ? index - (list.length + 1) / 2
          : index - list.length / 2;
        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Nav buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          aria-label="Previous"
          className="flex h-14 w-14 items-center justify-center border-2 border-[#E5E7EB] bg-white text-[#0D0D2B] transition-colors hover:bg-[#0D0D2B] hover:text-white hover:border-[#0D0D2B] cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          aria-label="Next"
          className="flex h-14 w-14 items-center justify-center border-2 border-[#E5E7EB] bg-white text-[#0D0D2B] transition-colors hover:bg-[#0D0D2B] hover:text-white hover:border-[#0D0D2B] cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
