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

    // setTimeout(0) ensures this runs after Lenis cleanup (which fires during unmount)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
