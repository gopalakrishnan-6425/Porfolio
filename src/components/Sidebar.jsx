import { NavLink, useLocation } from "react-router-dom";
import useScrollProgress from "../hooks/useScrollProgress.js";
import { profile } from "../data/profile.js";
import { routes } from "../data/routes.js";
import { IC, RI } from "../data/icons.js";
import ResumeButton from "./ResumeButton.jsx";

const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** Expanding side rail: progress ring, sliding active indicator, quick links. */
export default function Sidebar() {
  const { pathname } = useLocation();
  const progress = useScrollProgress();
  const active = routes.findIndex((r) => r.path === pathname);

  return (
    <aside
      className="rail"
      style={{ "--sp": progress, "--n": routes.length }}
      aria-label="Sidebar"
    >
      <div className="rh">
        <div className="rg">
          <svg viewBox="0 0 52 52">
            <circle className="t" cx="26" cy="26" r="22" />
            <circle className="p" cx="26" cy="26" r="22" />
          </svg>
          <b>GOKI</b>
        </div>
        <div>
          <strong>{profile.name}</strong>
          <small>Java Full Stack</small>
        </div>
      </div>

      <nav className="rn" aria-label="Pages">
        <div
          className="rl"
          style={{ "--i": Math.max(active, 0), "--n": routes.length }}
        >
          <i className="ind" style={{ opacity: active < 0 ? 0 : 1 }} />
          {routes.map((r) => (
            <NavLink
              key={r.path}
              to={r.path}
              end={r.path === "/"}
              className={({ isActive }) => `ri${isActive ? " on" : ""}`}
              aria-label={r.label}
            >
              <i dangerouslySetInnerHTML={{ __html: RI[r.icon] }} />
              <span>{r.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="rf">
        {Object.entries(profile.links).map(([key, href]) => (
          <a
            key={key}
            className="ri"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cap(key)}
          >
            <i dangerouslySetInnerHTML={{ __html: IC[key] }} />
            <span>{cap(key)}</span>
          </a>
        ))}
        <ResumeButton className="ri" aria-label="Download resume">
          <i dangerouslySetInnerHTML={{ __html: RI.dl }} />
          <span>Resume</span>
        </ResumeButton>
      </div>
    </aside>
  );
}
