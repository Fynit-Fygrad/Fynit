'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Pause work outside the viewport or while the browser tab is hidden. */
export function useAnimationVisibility(ref: RefObject<HTMLElement | null>, rootMargin = '0px') {
  const [visibility, setVisibility] = useState({ active: false, hasEntered: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let intersects = false;
    const update = () => {
      const active = intersects && !document.hidden;
      setVisibility(previous => {
        const hasEntered = previous.hasEntered || active;
        return previous.active === active && previous.hasEntered === hasEntered
          ? previous : { active, hasEntered };
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0;
      update();
    }, { rootMargin });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [ref, rootMargin]);

  return visibility;
}

/** Preserve CSS animation progress instead of restarting animations on scroll. */
export function usePauseOffscreenAnimations(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const sections = [...root.querySelectorAll('section')];
    const visible = new Set<Element>();
    const update = () => {
      for (const section of sections) {
        section.dataset.animationPaused = String(document.hidden || !visible.has(section));
      }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    }, { rootMargin: '100px' });
    sections.forEach(section => observer.observe(section));
    update();
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      sections.forEach(section => delete section.dataset.animationPaused);
    };
  }, [ref]);
}
