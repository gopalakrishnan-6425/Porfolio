import ThemeToggle from "./ThemeToggle.jsx";
import useScrollProgress from "../hooks/useScrollProgress.js";
import useActiveSection from "../hooks/useActiveSection.js";
import { profile } from "../data/profile.js";
import { routes } from "../data/routes.js";
import { IC, RI } from "../data/icons.js";

const quickLinks = [
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: IC.linkedin,
    className: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    icon: IC.github,
    className: "github",
    external: true,
  },
  {
    label: "Instagram",
    href: profile.links.instagram,
    icon: IC.instagram,
    className: "instagram",
    external: true,
  },
  {
    label: "Email",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
    icon: RI.contact,
    className: "email",
    external: true,
  },
];

export default function Navbar() {
  const progress = useScrollProgress();
  const active = useActiveSection();
  const activeIndex = Math.max(0, routes.findIndex((route) => route.id === active));
  const current = routes[activeIndex];

  return (
    <header className="gs-nav">
      <a href="#home" className="gs-brand" aria-label={profile.brand}>
        {profile.brand}
      </a>
      <span className="gs-nav-divider" aria-hidden="true" />
      <div className="gs-nav-section" aria-live="polite" aria-atomic="true">
        <span className="gs-nav-kicker">Now exploring</span>
        <span className="gs-nav-current">
          <span className="gs-nav-count">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="gs-nav-current-label">{current.label}</span>
        </span>
      </div>
      <span className="gs-nav-spacer" aria-hidden="true" />
      <div className="gs-nav-status">
        <span className="gs-nav-status-dot" aria-hidden="true" />
        <span>Open to opportunities</span>
      </div>
      <nav className="gs-nav-social" aria-label="Social links and contact">
        {quickLinks.map(({ label, href, icon, className, external }) => (
          <a
            key={label}
            className={`gs-nav-social-link ${className}`}
            href={href}
            aria-label={label === "Email" ? `Send email to ${profile.email}` : label}
            title={label === "Email" ? profile.email : label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <i dangerouslySetInnerHTML={{ __html: icon }} />
          </a>
        ))}
      </nav>
      <ThemeToggle />
      <span className="gs-prog" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
