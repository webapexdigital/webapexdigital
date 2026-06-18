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

      {/* Card overlay content */}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}
