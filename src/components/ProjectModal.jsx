import Modal from "react-bootstrap/Modal";
import Chips from "./Chips.jsx";
import { PV } from "../data/previews.js";

export default function ProjectModal({ project, onHide }) {
  const { demo, code } = project?.links ?? {};
  return (
    <Modal
      show={Boolean(project)}
      onHide={onHide}
      centered
      size="lg"
      contentClassName="gs-modal"
    >
      {project && (
        <>
          <Modal.Header closeButton>
            <Modal.Title as="h3">{project.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="gs-pv"
              dangerouslySetInnerHTML={{ __html: PV[project.preview] }}
            />
            <div className="gs-pb">
              <span className="gs-when">
                {project.type === "academic"
                  ? "Academic project"
                  : "Software project"}{" "}
                / {project.period}
              </span>
              <ul className="mb-4 ps-3" style={{ color: "var(--mut)" }}>
                {project.bullets.map((b) => (
                  <li key={b} className="mb-2">
                    {b}
                  </li>
                ))}
              </ul>
              <Chips list={project.stack} />
              {(demo || code) && (
                <div className="d-flex gap-2 mt-4">
                  {demo && (
                    <a
                      className="gs-btn primary"
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo
                    </a>
                  )}
                  {code && (
                    <a
                      className="gs-btn"
                      href={code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
