import React, { useEffect, useRef } from 'react';

/**
 * Elegant Falling Small Dots Background
 * - Subtly drifting small orange (#F58220) and tiny light-grey dots
 * - Soft low opacity, varied sizes and speeds
 * - Respects reduced-motion accessibility settings
 * - Non-blocking pointer events
 */
export default function FallingDotsBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Generate falling dots
    // Density: roughly 45 to 65 dots on standard desktop screens
    const count = Math.max(30, Math.min(75, Math.floor(window.innerWidth / 24)));
    const dots = [];

    for (let i = 0; i < count; i++) {
      // 80% warm orange dots, 20% delicate soft grey dots
      const isOrange = Math.random() < 0.78;
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.2, // 1.2px to 3.4px
        speedY: Math.random() * 0.45 + 0.2, // 0.2 to 0.65 px/frame
        speedX: (Math.random() - 0.5) * 0.15, // subtle horizontal sway
        opacity: Math.random() * 0.28 + 0.12, // 0.12 to 0.40 (soft & subtle)
        color: isOrange ? '#F58220' : '#BDC1C6',
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let lastTime = performance.now();

    const draw = (now) => {
      const dt = Math.min((now - lastTime) / 16.6, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (!prefersReducedMotion) {
          d.swayAngle += d.swaySpeed * dt;
          d.y += d.speedY * dt;
          d.x += (d.speedX + Math.sin(d.swayAngle) * 0.18) * dt;

          // Wrap around screen seamlessly
          if (d.y > height + 10) {
            d.y = -10;
            d.x = Math.random() * width;
          }
          if (d.x < -10) d.x = width + 10;
          if (d.x > width + 10) d.x = -10;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
