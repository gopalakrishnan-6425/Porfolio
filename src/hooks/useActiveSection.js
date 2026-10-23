import { useEffect, useState } from "react";
import { routes } from "../data/routes.js";

/** Keeps the navbar and mobile dock in sync with the section being read. */
export default function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const targets = routes
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return undefined;

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const readingLine = Math.max(
          96,
          Math.min(window.innerHeight * 0.36, window.innerHeight - 140),
        );
        let current = targets[0].id;

        for (const target of targets) {
          if (target.getBoundingClientRect().top > readingLine) break;
          current = target.id;
        }

        const pageBottom = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        );
        if (window.scrollY + window.innerHeight >= pageBottom - 8) {
          current = targets[targets.length - 1].id;
        }

        setActive((previous) => (previous === current ? previous : current));
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
