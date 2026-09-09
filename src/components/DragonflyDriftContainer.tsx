import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DragonflyDriftContainerProps {
  children: React.ReactNode;
  /** Seed index to uniquely phase-shift and harmonic-tune each nested container */
  seed?: number;
  className?: string;
  id?: string;
}

/**
 * DragonflyDriftContainer
 * Mimics the Dragonfly Mechanic (Module 30 / Dragonfly Protocol):
 * Smooth, non-binary, multi-dimensional hovering drift between nested states.
 * Uses incommensurate periods for X, Y, and subtle rotation to create an organic,
 * non-collapsing Lissajous drift without rigid binary oscillations.
 */
export const DragonflyDriftContainer: React.FC<DragonflyDriftContainerProps> = ({
  children,
  seed = 1,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Honor reduced motion accessibility preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Incommensurate harmonic periods (in seconds) to prevent binary lock-in
    // By using different prime-fraction intervals, trajectories never repeat along a single line
    const periodX = 13.2 + ((seed * 3) % 7) * 1.45;
    const periodY = 9.4 + (((seed + 1) * 5) % 6) * 1.35;
    const periodRot = 17.1 + (((seed + 2) * 7) % 5) * 1.65;

    // Subtle drift amplitudes (pixels and degrees) to keep typography pristine and readable
    const ampX = 2.4 + (seed % 3) * 0.6; // ~2.4px - 3.6px
    const ampY = 3.2 + ((seed + 1) % 4) * 0.7; // ~3.2px - 5.3px
    const ampRot = 0.16 + (seed % 3) * 0.06; // ~0.16deg - 0.28deg

    // Staggered initial phase delays to desynchronize nested layers
    const delayX = (seed * 0.7) % 2.5;
    const delayY = ((seed + 1) * 0.9) % 2.2;
    const delayRot = ((seed + 2) * 1.1) % 3.0;

    const ctx = gsap.context(() => {
      // Smooth continuous multi-phase lateral drift (X-axis)
      // Starts from rest (0), glides to +ampX, through -ampX, and returns smoothly
      const tlX = gsap.timeline({ repeat: -1, delay: delayX });
      tlX.to(el, { x: ampX, duration: periodX * 0.25, ease: 'sine.out' })
        .to(el, { x: -ampX, duration: periodX * 0.5, ease: 'sine.inOut' })
        .to(el, { x: 0, duration: periodX * 0.25, ease: 'sine.in' });

      // Smooth continuous multi-phase vertical hover (Y-axis) on independent period
      const tlY = gsap.timeline({ repeat: -1, delay: delayY });
      tlY.to(el, { y: -ampY, duration: periodY * 0.25, ease: 'sine.out' })
        .to(el, { y: ampY, duration: periodY * 0.5, ease: 'sine.inOut' })
        .to(el, { y: 0, duration: periodY * 0.25, ease: 'sine.in' });

      // Smooth micro-tilt (Rotation) simulating dragonfly wing/body hovering pitch
      const tlRot = gsap.timeline({ repeat: -1, delay: delayRot });
      tlRot.to(el, { rotation: ampRot, duration: periodRot * 0.25, ease: 'sine.out', transformOrigin: '50% 50%' })
        .to(el, { rotation: -ampRot, duration: periodRot * 0.5, ease: 'sine.inOut', transformOrigin: '50% 50%' })
        .to(el, { rotation: 0, duration: periodRot * 0.25, ease: 'sine.in', transformOrigin: '50% 50%' });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [seed]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`dragonfly-drift-container will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
