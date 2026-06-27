import { Star } from 'lucide-react';
import { StaggerTestimonials } from '../ui/stagger-testimonials';
import type { Testimonial } from '../ui/stagger-testimonials';

const TESTIMONIALS: Testimonial[] = [
  {
    tempId: 0,
    testimonial: "The AI video ads Apex delivered boosted our conversion rate by 3x in the first month. The quality was unlike anything we'd seen.",
    by: "Marcus Chen, CEO at TechVault",
    imgSrc: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 1,
    testimonial: "Their 3D website stopped prospects mid-sentence. Before we could pitch, they were asking who built our site.",
    by: "Sarah Kim, Founder at LaunchFlow",
    imgSrc: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 2,
    testimonial: "The automation system Apex built saves us 40 hours per week. ROI was clear within the first billing cycle.",
    by: "James Okonkwo, Head of Ops at Circulo",
    imgSrc: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 3,
    testimonial: "From concept to live AI ad campaign in two weeks. Fast, polished, data-driven — exactly what we needed for our Series A.",
    by: "Priya Mehta, CMO at Elevate Labs",
    imgSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 4,
    testimonial: "Apex understands AI at a technical level, not just surface trends. That depth shows in every single deliverable.",
    by: "David Park, Head of Design at Paradigm",
    imgSrc: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 5,
    testimonial: "Our lead gen workflow now runs 24/7. We went from 20 leads a week to 200+ without lifting a finger.",
    by: "Aarav Shah, Founder at GrowthStack",
    imgSrc: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 6,
    testimonial: "The 3D scroll experience Apex built is now our best sales tool. Clients ask about the website before anything else.",
    by: "Neha Kapoor, Co-founder at VibeStudio",
    imgSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    tempId: 7,
    testimonial: "The website looks great! I really liked the content and overall presentation. Thanks for the excellent work and support.",
    by: "Nandoos Garments, Kerala · via Instagram",
    imgSrc: "/nandoos-garments-feedback.png",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="pt-20 pb-0" id="testimonials">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between">
        <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D0D2B] tracking-tight">
          What our <span className="font-mondwest">clients</span> say
        </h2>
        <div className="flex items-center gap-1 shrink-0 ml-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#0D0D2B] text-[#0D0D2B]" />
          ))}
          <span className="text-sm text-[#9CA3AF] ml-2">5/5</span>
        </div>
      </div>

      <StaggerTestimonials testimonials={TESTIMONIALS} />
    </section>
  );
}
