'use client';
import React, { useCallback } from 'react';
import { useAnimation, motion } from 'framer-motion';

/**
 * Hook that provides imperative cursor control.
 * All returned functions are stable (useCallback) so they are safe
 * to include in useEffect dependency arrays without causing re-runs.
 */
export function useMockupCursor() {
  const cursorCtrl = useAnimation();
  const ripple1Ctrl = useAnimation();
  const ripple2Ctrl = useAnimation();

  /** Position cursor hidden at starting coords — call before the loop */
  const reset = useCallback((x: number, y: number) => {
    cursorCtrl.set({ x, y, opacity: 0, scale: 1 });
    ripple1Ctrl.set({ opacity: 0, scale: 0 });
    ripple2Ctrl.set({ opacity: 0, scale: 0 });
  }, [cursorCtrl, ripple1Ctrl, ripple2Ctrl]);

  /**
   * Move cursor to (x,y).
   * durationMs: how long the move takes (default 280ms — snappy).
   * Returns Promise that resolves when movement is complete.
   */
  const moveTo = useCallback((x: number, y: number, durationMs = 280) =>
    cursorCtrl.start({
      x,
      y,
      opacity: 1,
      transition: { duration: durationMs / 1000, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  [cursorCtrl]);

  /**
   * Fire click ripple at (x,y).
   * Short (≈280ms total) so it doesn't delay the action after it.
   */
  const click = useCallback(async (x: number, y: number) => {
    cursorCtrl.start({ scale: 0.82, transition: { duration: 0.07 } });

    ripple1Ctrl.set({ x: x - 12, y: y - 12, scale: 0, opacity: 0.55 });
    ripple2Ctrl.set({ x: x - 9,  y: y - 9,  scale: 0, opacity: 0.3  });

    ripple1Ctrl.start({ scale: 2.4, opacity: 0, transition: { duration: 0.28, ease: 'easeOut' } });
    await ripple2Ctrl.start({ scale: 1.7, opacity: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.05 } });

    cursorCtrl.start({ scale: 1, transition: { duration: 0.1 } });
  }, [cursorCtrl, ripple1Ctrl, ripple2Ctrl]);

  /** Fade cursor out */
  const hide = useCallback((durationMs = 200) =>
    cursorCtrl.start({ opacity: 0, transition: { duration: durationMs / 1000 } }),
  [cursorCtrl]);

  /** JSX — place as first child of the wrapper div */
  const CursorNode = (
    <>
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
          width="15" height="17"
          viewBox="0 0 18 20"
          fill="none"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
        >
          <path
            d="M1 1L1 14.5L4.5 11.5L7 17.5L9 16.5L6.5 10.5L11 10.5L1 1Z"
            fill="#1E293B" stroke="white" strokeWidth="1.2" strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={ripple1Ctrl}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 24, height: 24, borderRadius: '50%',
          background: 'rgba(37,99,235,0.4)',
          pointerEvents: 'none', zIndex: 998,
        }}
      />
      <motion.div
        animate={ripple2Ctrl}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 18, height: 18, borderRadius: '50%',
          background: 'rgba(37,99,235,0.22)',
          pointerEvents: 'none', zIndex: 998,
        }}
      />
    </>
  );

  return { reset, moveTo, click, hide, CursorNode };
}
