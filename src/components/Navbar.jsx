import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import useScrollProgress from "../hooks/useScrollProgress.js";
import { profile } from "../data/profile.js";
import { routes } from "../data/routes.js";

export default function Navbar() {
  const progress = useScrollProgress();
  return (
    <header className="gs-nav">
      <Link to="/" className="gs-brand">
        {profile.brand}
      </Link>
      <nav className="gs-links" aria-label="Primary">
        {routes.map((r) => (
          <NavLink key={r.path} to={r.path} end={r.path === "/"}>
            {r.label}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle />
      <span className="gs-prog" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
