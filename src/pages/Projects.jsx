import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { projects } from "../data/projects.js";

const FILTERS = [
  ["all", "All"],
  ["software", "Software"],
  ["academic", "Academic"],
];

export default function Projects() {
  useDocumentTitle("Projects");
  const { state } = useLocation();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  // opened from the home page: /projects with { state: { open: id } }
  useEffect(() => {
    if (state?.open) setOpen(projects.find((p) => p.id === state.open) ?? null);
  }, [state]);

  const list = projects.filter((p) => filter === "all" || p.type === filter);

  return (
    <section className="gs-section">
      <SectionHeading eyebrow="Projects" title="Software and academic work." />
      <div className="gs-filter" role="tablist" aria-label="Filter projects">
        {FILTERS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            className={filter === key ? "on" : ""}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <Row className="g-4">
        {list.map((p, i) => (
          <Col md={6} xl={4} key={p.id}>
            <ProjectCard project={p} delay={(i % 3) * 90} onOpen={setOpen} />
          </Col>
        ))}
      </Row>
      <ProjectModal project={open} onHide={() => setOpen(null)} />
    </section>
  );
}
