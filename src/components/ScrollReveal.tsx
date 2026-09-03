'use client';

import React, { useEffect, useRef, useMemo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '@/styles/components/scroll-reveal.css';

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'top 30%', // Cambiado para mayor duración
  wordAnimationEnd = 'top 30%' // Cambiado para mayor duración
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into words, preserving HTML elements like <br />
  const splitText = useMemo(() => {
    const textElements: ReactNode[] = [];
    let wordCount = 0;
    
    const processString = (str: string) => {
      return str.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;
        wordCount++;
        return (
          <span className="word" key={`${wordCount}-${index}`}>
            {word}
          </span>
        );
      });
    };

    const processChildren = (child: ReactNode) => {
      if (typeof child === 'string') {
        textElements.push(...processString(child));
      } else {
        textElements.push(child); // e.g. <br />
      }
    };

    if (Array.isArray(children)) {
      children.forEach(processChildren);
    } else {
      processChildren(children);
    }

    return textElements;
  }, [children]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ? scrollContainerRef.current : window;

    // Use gsap.context to properly clean up animations on unmount!
    const ctx = gsap.context(() => {
      // 1. Rotate the whole container slightly
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 95%', // Empieza justo cuando asoma por abajo
            end: rotationEnd,
            scrub: true
          }
        }
      );

      const wordElements = el.querySelectorAll('.word');

      // 2. Animate opacity
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 90%', // Más amplio para notarse
            end: wordAnimationEnd,
            scrub: 1 // Scrub con suavizado
          }
        }
      );

      // 3. Animate blur
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 90%',
              end: wordAnimationEnd,
              scrub: 1
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
