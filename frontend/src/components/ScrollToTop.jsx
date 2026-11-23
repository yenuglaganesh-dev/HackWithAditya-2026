import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures:
 * 1. On page refresh/reload or route transition, the window resets to the top (0, 0).
 * 2. Overrides browser automatic scroll restoration to ensure every reload starts at the very top of the page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    // When the page first loads or reloads, force scroll to top
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return null;
}
