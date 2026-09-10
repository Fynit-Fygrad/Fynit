"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      ringRef.current?.classList.add("cursor-ring--hover");
      dotRef.current?.classList.add("cursor-dot--hover");
    };
    const onLeaveInteractive = () => {
      ringRef.current?.classList.remove("cursor-ring--hover");
      dotRef.current?.classList.remove("cursor-dot--hover");
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (dotRef.current) dotRef.current.style.transform = "translate(" + pos.current.x + "px, " + pos.current.y + "px)";
      if (ringRef.current) ringRef.current.style.transform = "translate(" + ring.current.x + "px, " + ring.current.y + "px)";
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    attachListeners();
    raf.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
