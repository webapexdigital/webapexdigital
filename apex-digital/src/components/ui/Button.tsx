import { type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

const SHADOW_PRIMARY =
  '0 1px 2px 0 rgba(13,13,43,0.1),0 4px 4px 0 rgba(13,13,43,0.09),0 9px 6px 0 rgba(13,13,43,0.05),0 17px 7px 0 rgba(13,13,43,0.01),0 26px 7px 0 rgba(13,13,43,0),inset 0 2px 8px 0 rgba(255,255,255,0.15)';
const SHADOW_SECONDARY = '0 0 0 0.5px rgba(0,0,0,0.05),0 4px 30px rgba(0,0,0,0.08)';

const styles: Record<Variant, { cls: string; shadow: string }> = {
  primary:   { cls: 'bg-[#0D0D2B] text-white hover:opacity-90',   shadow: SHADOW_PRIMARY },
  secondary: { cls: 'bg-white text-[#0D0D2B] hover:opacity-80',   shadow: SHADOW_SECONDARY },
  tertiary:  { cls: 'bg-white text-[#0D0D2B] hover:opacity-80',   shadow: SHADOW_SECONDARY },
};

export default function Button({
  variant = 'primary',
  children,
  onClick,
  href,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-opacity duration-200 cursor-pointer select-none whitespace-nowrap';
  const { cls, shadow } = styles[variant];
  const fullCls = `${base} ${cls} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={fullCls} style={{ boxShadow: shadow }}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={fullCls} style={{ boxShadow: shadow }}>
      {children}
    </button>
  );
}
