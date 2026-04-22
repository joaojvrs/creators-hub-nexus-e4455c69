import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on every route change.
 * Uses multiple strategies + rAF to defeat smooth-scroll libraries (Lenis)
 * and browser scroll restoration.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    reset();
    // Run again after the next paint to override Lenis or layout shifts
    const r1 = requestAnimationFrame(() => {
      reset();
      const r2 = requestAnimationFrame(reset);
      (reset as unknown as { _r2?: number })._r2 = r2;
    });

    return () => cancelAnimationFrame(r1);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
