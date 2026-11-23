import React, { useMemo } from 'react';

/**
 * FallingParticles Component
 * - Lightweight, pure CSS animated falling particles across full-screen background
 * - Warm orange (#F58220) with delicate soft peach / amber particles
 * - Varied dot sizes (2px to 7px), varied falling speeds (8s to 22s), opacities (0.15 to 0.55), and delays
 * - Subtle horizontal drifting (sway) for natural organic movement
 * - Continuously falling and regenerating from top to bottom
 * - Fixed full-screen layer behind all content (z-index: 0, pointer-events: none)
 * - Controlled particle count (~32 particles) for optimal CPU & battery performance
 * - Full support for prefers-reduced-motion
 */
export default function FallingParticles({ className = "" }) {
  // Precompute 32 static particle parameters with natural distribution
  const particles = useMemo(() => {
    const list = [];
    // 32 particles total: balanced across screen width
    for (let i = 0; i < 32; i++) {
      const left = ((i * 3.125) + (Math.sin(i * 1.7) * 2) + 1.5).toFixed(2); // 0% to 100%
      const size = (2 + ((i * 7) % 5.5)).toFixed(1); // 2px to 7px
      const duration = (9 + ((i * 11) % 13)).toFixed(1); // 9s to 22s
      const delay = (-((i * 3.7) % 18)).toFixed(1); // negative delay so screen is already full of particles on load
      const opacity = (0.18 + ((i * 13) % 40) / 100).toFixed(2); // 0.18 to 0.55
      const sway = (((i % 2 === 0 ? 1 : -1) * (15 + (i * 5) % 25))).toFixed(0); // -40px to +40px sway
      
      // Color: 75% warm orange (#F58220), 25% soft light peach (#FDBA74)
      const color = i % 4 === 0 ? '#FDBA74' : '#F58220';

      list.push({
        id: i,
        left: `${left}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        opacity,
        sway: `${sway}px`,
        color,
      });
    }
    return list;
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="global-falling-particle"
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
