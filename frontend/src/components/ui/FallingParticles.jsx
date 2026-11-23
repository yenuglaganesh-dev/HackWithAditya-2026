import React, { useMemo } from 'react';

/**
 * FallingParticles Component
 * - 25-40 small falling particles (configured to 34 particles).
 * - Sizes: 2px–7px.
 * - Colors: Primary warm orange (#F58220) and delicate light peach (#FFD5B8).
 * - Continuous smooth top-to-bottom movement with subtle horizontal drift.
 * - Lightweight pure CSS keyframes with randomized speeds, delays, opacities.
 * - Fixed full-screen background layer strictly behind content (z-0, pointer-events: none).
 * - Honors prefers-reduced-motion accessibility settings.
 * - Optimized for mobile and desktop with zero CPU overhead.
 */
export default function FallingParticles() {
  const particles = useMemo(() => {
    const list = [];
    const count = 34; // Between 25 and 40

    for (let i = 0; i < count; i++) {
      // Particle sizes from 2px to 7px
      const size = (2 + ((i * 7) % 5.5)).toFixed(1);
      // Colors: Warm orange and light peach
      const isOrange = i % 3 !== 0;
      const color = isOrange ? '#F58220' : '#FFD5B8';
      // Starting horizontal position 1% - 99%
      const left = ((i * 100) / count + (i % 5) * 1.5) % 98 + 1;
      // Duration varied between 7s and 16s
      const duration = (7.5 + ((i * 3.7) % 8.5)).toFixed(2);
      // Staggered animation delays between 0s and 12s
      const delay = ((i * 1.6) % 12).toFixed(2);
      // Soft opacity between 0.18 and 0.45
      const opacity = (0.18 + ((i * 0.08) % 0.27)).toFixed(2);
      // Horizontal drift sway between -25px and +25px
      const sway = (((i % 7) - 3) * 7);

      list.push({
        id: i,
        size: `${size}px`,
        color,
        left: `${left.toFixed(2)}%`,
        duration: `${duration}s`,
        delay: `-${delay}s`,
        opacity,
        sway: `${sway}px`,
      });
    }

    return list;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="falling-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            '--particle-duration': p.duration,
            '--particle-delay': p.delay,
            '--particle-opacity': p.opacity,
            '--particle-sway': p.sway,
          }}
        />
      ))}
    </div>
  );
}
