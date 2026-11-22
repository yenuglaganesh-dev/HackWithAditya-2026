import { useState, useEffect, useRef } from 'react';

/**
 * Custom React Hook that generates cinematic motion blur when the user scrolls up or down.
 * Dynamically computes scroll velocity and applies directional blur, smoothly snapping
 * back to crystal clarity when scrolling ceases.
 */
export function useScrollMotionBlur() {
  const [blurAmount, setBlurAmount] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState('none'); // 'up' | 'down' | 'none'

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      const dir = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      if (delta > 1) {
        setIsScrolling(true);
        setDirection(dir);

        // Calculate motion blur: between 1px and 6px based on velocity
        const calculatedBlur = Math.min(Math.max(delta * 0.12, 1.2), 6.5);
        setBlurAmount(Number(calculatedBlur.toFixed(1)));
      }

      // Reset when scrolling pauses
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setBlurAmount(0);
        setIsScrolling(false);
        setDirection('none');
      }, 90);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const motionBlurStyle = {
    filter: isScrolling && blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none',
    transform: isScrolling && blurAmount > 1 ? `scaleY(${1 + Math.min(blurAmount * 0.002, 0.015)})` : 'none',
    transition: isScrolling ? 'filter 0.06s ease-out, transform 0.06s ease-out' : 'filter 0.16s ease-out, transform 0.16s ease-out',
    willChange: 'filter, transform'
  };

  return {
    blurAmount,
    isScrolling,
    direction,
    motionBlurStyle
  };
}
