import { useEffect, useState } from "react";
import { routes } from "../data/routes.js";

/** Tracks the section near the middle of the viewport for both nav systems. */
export default function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const targets = routes
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) setActive(current.target.id);
      },
      { rootMargin: "-32% 0px -56% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return active;
}
