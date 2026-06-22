import { useRef, useEffect, useCallback, useState } from 'react';

const BRUSH_RADIUS = 72; // logical px

interface GlowRevealCardProps {
  baseImg:    string;  // image revealed by painting
  glowImg:    string;  // always-visible background
  alt?:       string;
  children?:  React.ReactNode;
  className?: string;
}

export default function GlowRevealCard({
  baseImg, glowImg, alt = '', children, className = '',
}: GlowRevealCardProps) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const displayCanvas  = useRef<HTMLCanvasElement>(null);
  // maskCanvas is off-DOM — only accumulates white brush strokes
  const maskCanvas     = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const revealImg      = useRef<HTMLImageElement | null>(null);
  const imgLoaded      = useRef(false);

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  // Pre-load the reveal image
  useEffect(() => {
    const img = new Image();
    img.src = baseImg;
    img.onload = () => {
      revealImg.current = img;
      imgLoaded.current = true;
    };
  }, [baseImg]);

  // Size both canvases to match the container
  useEffect(() => {
    const dc = displayCanvas.current;
    const mc = maskCanvas.current;
    const container = containerRef.current;
    if (!dc || !mc || !container) return;

    const sync = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(width  * dpr);
      const h = Math.round(height * dpr);
      // Setting dimensions clears the canvas — that's fine on resize
      dc.width = w;  dc.height = h;
      mc.width = w;  mc.height = h;
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Reset the reveal mask whenever the card scrolls out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Clear mask — next visit starts fresh
          const mc = maskCanvas.current;
          const dc = displayCanvas.current;
          if (mc) mc.getContext('2d')?.clearRect(0, 0, mc.width, mc.height);
          if (dc) dc.getContext('2d')?.clearRect(0, 0, dc.width, dc.height);
          setCursorPos(null);
        }
      },
      { threshold: 0.1 }, // reset once less than 10% is visible
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const paint = useCallback((clientX: number, clientY: number) => {
    const dc = displayCanvas.current;
    const mc = maskCanvas.current;
    const img = revealImg.current;
    if (!dc || !mc || !img || !imgLoaded.current) return;

    const dctx = dc.getContext('2d');
    const mctx = mc.getContext('2d');
    if (!dctx || !mctx) return;

    const rect = dc.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const x    = (clientX - rect.left) * dpr;
    const y    = (clientY - rect.top)  * dpr;
    const R    = BRUSH_RADIUS * dpr;

    // ── 1. Stamp a soft white circle onto the mask (accumulates, never erased) ──
    mctx.globalCompositeOperation = 'source-over';
    const grad = mctx.createRadialGradient(x, y, 0, x, y, R);
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.50, 'rgba(255,255,255,0.97)');
    grad.addColorStop(0.78, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');
    mctx.fillStyle = grad;
    mctx.beginPath();
    mctx.arc(x, y, R, 0, Math.PI * 2);
    mctx.fill();

    // ── 2. Rebuild display canvas from scratch every stroke ──────────────────
    // clearRect + drawImage(revealImg) + destination-in(maskCanvas)
    // This guarantees painted areas NEVER fade — mask is the source of truth.
    dctx.clearRect(0, 0, dc.width, dc.height);
    dctx.globalCompositeOperation = 'source-over';
    dctx.drawImage(img, 0, 0, dc.width, dc.height);
    dctx.globalCompositeOperation = 'destination-in';
    dctx.drawImage(mc, 0, 0);
    dctx.globalCompositeOperation = 'source-over'; // reset
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    paint(e.clientX, e.clientY);
  }, [paint]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorPos(null)}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ cursor: 'none' }}
    >
      {/* Always-visible glow background */}
      <img
        src={glowImg}
        alt={alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Display canvas — shows reveal image only where mask has been painted */}
      <canvas
        ref={displayCanvas}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Custom brush cursor ring */}
      {cursorPos && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left:           cursorPos.x - BRUSH_RADIUS,
            top:            cursorPos.y - BRUSH_RADIUS,
            width:          BRUSH_RADIUS * 2,
            height:         BRUSH_RADIUS * 2,
            border:         '1.5px solid rgba(255,255,255,0.6)',
            boxShadow:      '0 0 14px rgba(123,60,232,0.55), inset 0 0 10px rgba(0,153,255,0.10)',
            backdropFilter: 'blur(0.5px)',
          }}
        />
      )}

      {/* Idle hint — visible until first cursor move, then fades out */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pointer-events-none transition-opacity duration-700"
        style={{ opacity: cursorPos ? 0 : 1 }}
      >
        {/* Pulsing ring stack */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: 88, height: 88,
              border: '1.5px solid rgba(255,255,255,0.35)',
              animationDuration: '2s',
            }}
          />
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: 64, height: 64,
              border: '1.5px solid rgba(0,153,255,0.5)',
              animationDuration: '2s',
              animationDelay: '0.4s',
            }}
          />
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 44, height: 44,
              background: 'rgba(255,255,255,0.10)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(6px)',
            }}
          >
            {/* Paintbrush icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
              <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
              <path d="M14.5 17.5 4.5 15"/>
            </svg>
          </div>
        </div>
        <p
          className="text-[13px] font-medium tracking-[0.12em] uppercase"
          style={{
            color: 'rgba(255,255,255,0.7)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            letterSpacing: '0.14em',
          }}
        >
          Move cursor to reveal
        </p>
      </div>

      {/* Card overlay content */}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}
