import { Film, Cpu, Globe } from 'lucide-react';
import { CreativePricing } from '../ui/creative-pricing';
import type { PricingTier } from '../ui/creative-pricing';

const TIERS: PricingTier[] = [
  {
    name: 'AI Video Ads',
    icon: <Film className="w-5 h-5" />,
    iconColor: '#0099FF',
    pricePoints: [
      { label: 'Pricing', amount: 'Custom' },
    ],
    priceNote: 'scoped to your brief & format',
    description: 'Scroll-stopping ads crafted by AI.',
    features: [
      'Script & storyboard included',
      'Voiceover + captions',
      '1 revision round',
      'Social-ready exports (9:16, 16:9, 1:1)',
    ],
    ctaLabel: 'Order a video',
    ctaHref: 'mailto:webapexdigital@gmail.com',
  },
  {
    name: 'AI Automation',
    icon: <Cpu className="w-5 h-5" />,
    iconColor: '#7B3CE8',
    pricePoints: [
      { label: 'Pricing', amount: 'Custom' },
    ],
    priceNote: 'scoped to your workflow & stack',
    description: 'Eliminate repetitive work, permanently.',
    popular: true,
    features: [
      'Discovery call included',
      'End-to-end workflow build',
      'Integrations (CRM, WhatsApp, Sheetsâ€¦)',
      'Handoff + documentation',
    ],
    ctaLabel: 'Discuss your project',
    ctaHref: 'mailto:webapexdigital@gmail.com',
  },
  {
    name: '3D Websites',
    icon: <Globe className="w-5 h-5" />,
    iconColor: '#0099FF',
    pricePoints: [
      { label: 'Pricing', amount: 'Custom' },
    ],
    priceNote: 'scoped to your project scope',
    description: 'Websites that are the product demo.',
    features: [
      'Scroll-driven 3D experience',
      'Mobile optimised',
      'GSAP + Spline animations',
      'Full source handoff',
    ],
    ctaLabel: 'Get a quote',
    ctaHref: 'mailto:webapexdigital@gmail.com',
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 md:py-32 px-6" id="pricing">
      <CreativePricing
        tag="PRICING"
        title={'Simple pricing.\nNo retainers.'}
        description="Every project is scoped to your goals. No lock-ins, no surprises."
        tiers={TIERS}
      />
    </section>
  );
}
