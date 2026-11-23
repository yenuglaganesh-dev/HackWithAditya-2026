import React from 'react';

/**
 * HeroHeading component reproducing the exact visual reference:
 * - Large responsive typography (36px mobile -> 56px tablet -> 72px desktop -> up to 84px large screen)
 * - Pure white background & dark charcoal / near-black text
 * - Very subtle warm orange outline / glow / accent (-webkit-text-stroke & text-shadow)
 * - Staggered smooth upward entrance with blur-to-sharp transition (800-1100ms)
 * - Lightweight floating decorative orange dots moving gently top to bottom
 * - Accessible to screen readers and respects prefers-reduced-motion
 */
export default function HeroHeading() {
  const words = [
    { text: "Your", delay: "0.05s" },
    { text: "Voice.", delay: "0.18s" },
    { text: "Your", delay: "0.32s" },
    { text: "Language.", delay: "0.46s" },
    { text: "Your", delay: "0.60s" },
    { text: "AI.", delay: "0.74s" },
  ];

  // Decorative floating orange dots positioned delicately around the heading
  const floatingDots = [
    { top: "-12px", left: "12%", size: "4px", duration: "4.8s", delay: "0.2s", opacity: 0.45, sway: "4px" },
    { top: "6px", left: "22%", size: "3px", duration: "5.5s", delay: "1.4s", opacity: 0.35, sway: "-5px" },
    { top: "-18px", left: "38%", size: "5px", duration: "6.2s", delay: "0.8s", opacity: 0.5, sway: "6px" },
    { top: "82%", left: "18%", size: "3.5px", duration: "5.0s", delay: "2.1s", opacity: 0.38, sway: "3px" },
    { top: "75%", left: "46%", size: "4px", duration: "5.8s", delay: "0.5s", opacity: 0.42, sway: "-4px" },
    { top: "-10px", left: "68%", size: "4.5px", duration: "5.2s", delay: "1.8s", opacity: 0.48, sway: "-6px" },
    { top: "15%", left: "84%", size: "3px", duration: "6.5s", delay: "0.3s", opacity: 0.35, sway: "5px" },
    { top: "88%", left: "76%", size: "4px", duration: "5.6s", delay: "1.1s", opacity: 0.4, sway: "4px" },
    { top: "70%", left: "92%", size: "3.5px", duration: "6.0s", delay: "2.4s", opacity: 0.32, sway: "-3px" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-3 px-2 flex justify-center items-center select-none">
      
      {/* Decorative floating dots behind heading */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible" aria-hidden="true">
        {floatingDots.map((dot, idx) => (
          <span
            key={idx}
            className="hero-floating-dot"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              '--dot-duration': dot.duration,
              '--dot-delay': dot.delay,
              '--dot-opacity': dot.opacity,
              '--dot-sway': dot.sway,
            }}
          />
        ))}
      </div>

      {/* Screen reader full text */}
      <span className="sr-only">Your Voice. Your Language. Your AI.</span>

      {/* Visible Heading with Staggered Word Entrance and Subtle Warm Orange Glow */}
      <h1
        aria-hidden="true"
        className="relative z-10 text-center font-headline font-black tracking-[-0.03em] leading-[1.12] hero-heading-glow text-[36px] sm:text-[54px] md:text-[68px] lg:text-[78px] xl:text-[84px]"
      >
        {words.map((w, idx) => (
          <React.Fragment key={idx}>
            <span
              className="hero-word-animate"
              style={{
                animationDelay: w.delay,
              }}
            >
              {w.text}
            </span>
            {idx < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </h1>

    </div>
  );
}
