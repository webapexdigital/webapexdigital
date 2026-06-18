import { Film, Cpu, Globe } from 'lucide-react';
import { CreativePricing } from '../ui/creative-pricing';
import type { PricingTier } from '../ui/creative-pricing';

const TIERS: PricingTier[] = [
  {
    name: 'AI Video Ads',
    icon: <Film className="w-5 h-5" />,
    iconColor: '#0099FF',
    pricePoints: [
      { label: '30 sec', amount: '₹2,000' },
      { label: '60 sec', amount: '₹3,500' },
    ],
    priceNote: 'per video · no monthly commitment',
    description: 'Scroll-stopping ads crafted by AI.',
    features: [
      'Script & storyboard included',
      'Voiceover + captions',
      '1 revision round',
      'Social-ready exports (9:16, 16:9, 1:1)',
    ],
    ctaLabel: 'Order a video',
    ctaHref: 'mailto:hello@apexdigital.in',
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
      'Integrations (CRM, WhatsApp, Sheets…)',
      'Handoff + documentation',
    ],
    ctaLabel: 'Discuss your project',
    ctaHref: 'mailto:hello@apexdigital.in',
  },
  {
    name: '3D Websites',
    icon: <Globe className="w-5 h-5" />,
    iconColor: '#0099FF',
    pricePoints: [
      { label: 'Starting at', amount: '₹15,000' },
    ],
    priceNote: 'custom scope for complex builds',
    description: 'Websites that are the product demo.',
    features: [
      'Scroll-driven 3D experience',
      'Mobile optimised',
      'GSAP + Spline animations',
      'Full source handoff',
    ],
    ctaLabel: 'Get a quote',
    ctaHref: 'mailto:hello@apexdigital.in',
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 md:py-32 px-6" id="pricing">
      <CreativePricing
        tag="PRICING"
        title={'Simple pricing.\nNo retainers.'}
        description="Pay per project. No lock-ins, no surprises."
        tiers={TIERS}
      />
    </section>
  );
}
