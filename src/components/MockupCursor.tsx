'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export interface CursorWaypoint {
  x: number;
  y: number;
  /** ms desde el inicio del loop para llegar a esta posición */
  at: number;
  /** si true: dispara ripple de click al llegar */
  click?: boolean;
}

interface MockupCursorProps {
  /** Total duración del loop en ms — el cursor se reiniciará junto con la animación */
  loopMs: number;
  waypoints: CursorWaypoint[];
}

export default function MockupCursor({ loopMs, waypoints }: MockupCursorProps) {
  const cursorCtrl = useAnimation();
  const ripple1Ctrl = useAnimation();
  const ripple2Ctrl = useAnimation();
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    const sleep = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

    const triggerClick = async (x: number, y: number) => {
      // scale down cursor
      cursorCtrl.start({ scale: 0.85, transition: { duration: 0.08 } });

      // ripples
      ripple1Ctrl.set({ x: x - 12, y: y - 12, opacity: 0.55, scale: 0 });
      ripple2Ctrl.set({ x: x - 10, y: y - 10, opacity: 0.3, scale: 0 });
      ripple1Ctrl.start({ scale: 2.8, opacity: 0, transition: { duration: 0.38, ease: 'easeOut' } });
      await ripple2Ctrl.start({ scale: 1.9, opacity: 0, transition: { duration: 0.48, ease: 'easeOut', delay: 0.07 } });

      cursorCtrl.start({ scale: 1, transition: { duration: 0.12 } });
    };

    const run = async () => {
      if (waypoints.length === 0) return;

      // Hide cursor at start
      cursorCtrl.set({ x: waypoints[0].x, y: waypoints[0].y, opacity: 0, scale: 1 });

      while (aliveRef.current) {
        const loopStart = performance.now();

        for (let i = 0; i < waypoints.length; i++) {
          if (!aliveRef.current) break;
          const wp = waypoints[i];

          const now = performance.now() - loopStart;
          const waitFor = wp.at - now;
          if (waitFor > 0) await sleep(waitFor);
          if (!aliveRef.current) break;

          // Move cursor (spring)
          await cursorCtrl.start({
            x: wp.x,
            y: wp.y,
            opacity: 1,
            transition: { type: 'spring', stiffness: 95, damping: 16, mass: 0.9 }
          });

          if (wp.click) {
            await sleep(80);
            await triggerClick(wp.x, wp.y);
          }
        }

        if (!aliveRef.current) break;

        // Wait remaining loop time then fade out before next cycle
        const elapsed = performance.now() - loopStart;
        const remaining = loopMs - elapsed - 400;
        if (remaining > 0) await sleep(remaining);

        await cursorCtrl.start({ opacity: 0, transition: { duration: 0.3 } });
        await sleep(100);
      }
    };

    run();
    return () => { aliveRef.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Cursor shape */}
      <motion.div
        animate={cursorCtrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999,
          originX: 0,
          originY: 0,
        }}
      >
        <svg
          width="16" height="18"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}
        >
          <path
            d="M1 1L1 14.5L4.5 11.5L7 17.5L9 16.5L6.5 10.5L11 10.5L1 1Z"
            fill="#1E293B"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Ripple rings (positioned absolutely via motion values) */}
      <motion.div
        animate={ripple1Ctrl}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 24, height: 24,
          borderRadius: '50%',
          background: 'rgba(37, 99, 235, 0.38)',
          pointerEvents: 'none',
          zIndex: 998,
        }}
      />
      <motion.div
        animate={ripple2Ctrl}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 20, height: 20,
          borderRadius: '50%',
          background: 'rgba(37, 99, 235, 0.22)',
          pointerEvents: 'none',
          zIndex: 998,
        }}
      />
    </>
  );
}
