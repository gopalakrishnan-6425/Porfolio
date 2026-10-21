import { LOGOS } from "../data/logos.js";

/** Animated SVG logo for a tool or language (see data/logos.js). */
export default function TechLogo({ name }) {
  return (
    <div
      className="lg"
      role="img"
      aria-label={name}
      dangerouslySetInnerHTML={{ __html: LOGOS[name] }}
    />
  );
}
