import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SocialLinks from "../components/SocialLinks.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Wave from "../components/Wave.jsx";
import CoinPhoto from "../components/CoinPhoto.jsx";
import ResumeButton from "../components/ResumeButton.jsx";
import useDecodeText, { useRotator } from "../hooks/useDecodeText.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";

const WORDS = [
  ["Building"],
  ["reliable", 1],
  ["full-stack"],
  ["systems,", 1],
  ["end"],
  ["to"],
  ["end.", 1],
];

const highlights = [
  [
    "Internship",
    "IAT Technologies",
    "Built a Learning Management System with Spring Boot, MySQL and React.",
  ],
  [
    "Education",
    "B.E., Electronics & Communication",
    "Panimalar Engineering College. CGPA 8.97 / 10.",
  ],
  [
    "Certified",
    "Infosys Springboard",
    "Java Developer and Front End Web Developer.",
  ],
];

export default function Home() {
  useDocumentTitle("");
  const navigate = useNavigate();
  const role = useDecodeText(useRotator(profile.roles));
  const featured = projects.filter((p) => p.type === "software");

  return (
    <>
      <section className="gs-hero">
        <Container fluid className="px-0">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <span className="gs-eyebrow">
                {profile.role} &middot; Chennai, IN
              </span>
              <h1 className="gs-h1">
                {WORDS.map(([w, g], i) => (
                  <span key={i}>
                    <span
                      className={`gs-w${g ? " gs-g" : ""}`}
                      style={{ animationDelay: `${0.1 + i * 0.09}s` }}
                    >
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </h1>
              <div className="gs-role">{role}</div>
              <p className="gs-lead">
                <b>{profile.name}</b> &mdash; a Java Full Stack Developer
                building web applications with Java, Spring Boot, MySQL and
                React. Fresh from an internship at IAT Technologies, where I
                helped build a Learning Management System.
              </p>
              <div className="gs-actions">
                <Link className="gs-btn" to="/projects">
                  View projects
                </Link>
                <ResumeButton />
              </div>
              <SocialLinks />
            </Col>
            <Col lg={5}>
              <CoinPhoto alt={`Portrait of ${profile.name}`} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="gs-section">
        <Row className="g-4">
          {highlights.map(([k, t, d], i) => (
            <Col md={4} key={k}>
              <Reveal delay={i * 90} className="h-100">
                <SpotlightCard>
                  <span className="gs-when">{k}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </SpotlightCard>
              </Reveal>
            </Col>
          ))}
        </Row>
      </section>

      <section className="gs-section mt-5">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I&rsquo;ve built."
        />
        <Row className="g-4">
          {featured.map((p, i) => (
            <Col md={6} xl={4} key={p.id}>
              <ProjectCard
                project={p}
                delay={i * 90}
                onOpen={(proj) =>
                  navigate("/projects", { state: { open: proj.id } })
                }
              />
            </Col>
          ))}
        </Row>
      </section>

      <Wave />
      <Reveal className="gs-cta">
        <h2>Let&rsquo;s work together.</h2>
        <p>I&rsquo;m looking for an entry-level Full Stack Developer role.</p>
        <Link className="gs-btn primary" to="/contact">
          Get in touch
        </Link>
      </Reveal>
    </>
  );
}
