import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const bullets = [
  "Built a Learning Management System to run an institute\u2019s academic activities and operations.",
  "Developed core modules for students, trainers, courses and assignments, and linked students to their courses and trainers.",
  "Created Spring Boot REST APIs and integrated them with a relational database.",
  "Connected frontend and backend, then tested, debugged and troubleshot the app for reliable behavior.",
];

export default function Experience() {
  useDocumentTitle("Experience");
  return (
    <section className="gs-section">
      <SectionHeading eyebrow="Experience" title="Hands-on, in a real team." />
      <Reveal className="gs-tl">
        <SpotlightCard>
          <span className="gs-when">May 2026 – Sept 2026</span>
          <h3>Java Full Stack Developer Intern</h3>
          <p className="mb-3">IAT Technologies</p>
          <ul>
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
