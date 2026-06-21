import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PricePoint {
  label: string;   // e.g. "30 sec", "60 sec", "Starting at"
  amount: string;  // e.g. "â‚¹2,000", "â‚¹3,500", "Custom"
}

export interface PricingTier {
  name: string;
  icon: ReactNode;
  iconColor: string;
  pricePoints: PricePoint[];
  priceNote?: string;       // small text under price, e.g. "per video"
  description: string;
  features: string[];
  popular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-2'] as const;
const SHADOW_BASE  = '4px 4px 0px 0px #0D0D2B';
const SHADOW_HOVER = '8px 8px 0px 0px #0D0D2B';
const SHADOW_CTA   = '3px 3px 0px 0px #0D0D2B';
const SHADOW_CTA_H = '5px 5px 0px 0px #0D0D2B';

export function CreativePricing({
  tag = 'PRICING',
  title = 'Transparent pricing.\nNo surprises.',
  description = 'Choose the engagement model that fits your growth stage.',
  tiers,
}: {
  tag?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="text-center mb-16 space-y-4">
        <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-[0.2em]">
          {tag}
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0D0D2B] leading-[1.1] tracking-tight whitespace-pre-line">
          {title}
        </h2>
        <p className="text-base text-[var(--body)] max-w-sm mx-auto">{description}</p>
      </div>

      {/* â”€â”€ Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              'relative group transition-all duration-300',
              ROTATIONS[index % ROTATIONS.length]
            )}
          >
            {/* Card shell */}
            <div
              className="absolute inset-0 bg-white rounded-2xl border-2 border-[#0D0D2B] transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
              style={{ boxShadow: SHADOW_BASE }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_HOVER; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_BASE; }}
            />

            {/* Content */}
            <div className="relative p-6 flex flex-col h-full">
              {/* Popular badge */}
              {tier.popular && (
                <div
                  className="absolute -top-3 -right-3 text-[11px] font-heading font-bold text-white
                    px-3 py-1 rounded-full rotate-12 border-2 border-[#0D0D2B] select-none z-10"
                  style={{ background: 'linear-gradient(135deg, #0099FF, #7B3CE8)' }}
                >
                  Popular!
                </div>
              )}

              {/* Icon + name */}
              <div className="mb-5">
                <div
                  className="w-10 h-10 rounded-full mb-4 flex items-center justify-center border-2 border-[#0D0D2B]"
                  style={{ color: tier.iconColor }}
                >
                  {tier.icon}
                </div>
                <h3 className="font-heading text-[19px] font-bold text-[#0D0D2B] leading-tight">
                  {tier.name}
                </h3>
                <p className="text-sm text-[var(--body)] mt-1">{tier.description}</p>
              </div>

              {/* â”€â”€ Price block â”€â”€ */}
              <div className="mb-5">
                {tier.pricePoints.length === 1 ? (
                  /* Single price: big display */
                  <div>
                    <span className="text-[2.4rem] font-mondwest leading-none text-[#0D0D2B]">
                      {tier.pricePoints[0].amount}
                    </span>
                    {tier.pricePoints[0].label && (
                      <p className="text-sm text-[var(--muted)] mt-1">{tier.pricePoints[0].label}</p>
                    )}
                  </div>
                ) : (
                  /* Multi price: two-column grid */
                  <div className="grid grid-cols-2 gap-2">
                    {tier.pricePoints.map(pt => (
                      <div
                        key={pt.label}
                        className="rounded-xl border border-[#0D0D2B]/15 bg-[#F0F0FF]/60 px-3 py-2.5"
                      >
                        <p className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.12em] mb-0.5">
                          {pt.label}
                        </p>
                        <p className="text-xl font-mondwest text-[#0D0D2B] leading-tight">
                          {pt.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {tier.priceNote && (
                  <p className="text-[11px] text-[var(--muted)] mt-2">{tier.priceNote}</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-[#0D0D2B] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-[#0D0D2B]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaHref ?? 'mailto:webapexdigital@gmail.com'}
                className={cn(
                  'flex w-full items-center justify-center py-2.5 px-4 rounded-xl',
                  'text-sm font-medium font-heading border-2 border-[#0D0D2B]',
                  'transition-all duration-200 select-none min-h-[44px] cursor-pointer',
                  tier.popular
                    ? 'bg-[#0D0D2B] text-white hover:opacity-90'
                    : 'bg-white text-[#0D0D2B] hover:bg-gray-50'
                )}
                style={{ boxShadow: SHADOW_CTA }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = SHADOW_CTA_H;
                  el.style.transform = 'translate(-1px,-1px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = SHADOW_CTA;
                  el.style.transform = '';
                }}
              >
                {tier.ctaLabel ?? 'Get a quote'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
