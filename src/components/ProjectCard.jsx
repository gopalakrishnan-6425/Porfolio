import Reveal from "./Reveal.jsx";
import SpotlightCard from "./SpotlightCard.jsx";
import Chips from "./Chips.jsx";
import { PV } from "../data/previews.js";

export default function ProjectCard({ project, onOpen, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-100">
      <SpotlightCard className="gs-proj">
        <div
          className="gs-pv"
          dangerouslySetInnerHTML={{ __html: PV[project.preview] }}
        />
        <div className="gs-pb">
          <span className="gs-when">{project.period}</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <Chips list={project.stack} />
          <button
            type="button"
            className="gs-link"
            onClick={() => onOpen(project)}
          >
            View details
          </button>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}
