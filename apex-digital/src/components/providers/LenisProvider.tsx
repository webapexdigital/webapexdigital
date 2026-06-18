import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Drive Lenis through GSAP's ticker so both run on the exact same frame.
    // Without this, Lenis and ScrollTrigger run on separate rAF loops and
    // scroll values arrive one frame late — causing the jerky/lagging feel.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from skipping frames during heavy work (video decoding etc.)
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis scroll values
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33); // restore default on unmount
    };
  }, []);

  return <>{children}</>;
}
