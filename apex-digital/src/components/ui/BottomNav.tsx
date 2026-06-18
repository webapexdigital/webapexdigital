import Button from './Button';

export default function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-4 bg-white rounded-full px-6 py-2"
        style={{
          boxShadow:
            '0 1px 2px 0 rgba(13,13,43,0.08),0 4px 16px 0 rgba(13,13,43,0.12),0 24px 48px 0 rgba(13,13,43,0.08)',
        }}
      >
        <span className="font-mondwest text-2xl font-semibold text-[#0D0D2B] leading-none select-none">
          A
        </span>
        <Button href="mailto:hello@apexdigital.in" variant="primary">
          Start a chat
        </Button>
      </div>
    </div>
  );
}
