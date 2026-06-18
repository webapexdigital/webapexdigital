import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function revealText(selector: string, trigger: string) {
  gsap.from(selector, {
    y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger, start: 'top 80%' },
  });
}

export function fadeUp(selector: string, trigger: string, stagger = 0.15, delay = 0) {
  gsap.from(selector, {
    y: 40, opacity: 0, duration: 0.8, delay, ease: 'power2.out', stagger,
    scrollTrigger: { trigger, start: 'top 75%' },
  });
}

export function fadeIn(selector: string, trigger: string, delay = 0) {
  gsap.from(selector, {
    opacity: 0, duration: 1, delay, ease: 'power2.out',
    scrollTrigger: { trigger, start: 'top 80%' },
  });
}

export function countUp(el: HTMLElement, target: number, suffix = '', duration = 1.8) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target, duration, ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    scrollTrigger: { trigger: el, start: 'top 85%' },
  });
}
