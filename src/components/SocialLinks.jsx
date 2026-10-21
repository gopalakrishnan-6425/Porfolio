import { profile } from "../data/profile.js";
import { IC } from "../data/icons.js";

export default function SocialLinks() {
  return (
    <div className="gs-soc">
      {Object.entries(profile.links).map(([key, href]) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={key}
        >
          <i
            style={{ display: "grid" }}
            dangerouslySetInnerHTML={{ __html: IC[key] }}
          />
        </a>
      ))}
    </div>
  );
}
