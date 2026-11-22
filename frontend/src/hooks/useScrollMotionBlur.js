/**
 * Motion blur disabled for crystal-clear readability and sharp contrast across the entire site.
 */
export function useScrollMotionBlur() {
  return {
    blurAmount: 0,
    isScrolling: false,
    direction: 'none',
    motionBlurStyle: {}
  };
}
