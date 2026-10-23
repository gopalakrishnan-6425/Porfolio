import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Chips from "../components/Chips.jsx";

export default function About() {
  return (
    <section className="gs-section" id="about">
      <SectionHeading
        eyebrow="About"
        title="Clean code, from database to browser."
      />
      <Row className="g-4">
        <Col lg={7}>
          <Reveal className="h-100">
            <SpotlightCard>
              <p className="mb-3">
                I&rsquo;m a Java Full Stack Developer with a strong base in
                Java, Spring Boot, RESTful APIs, MySQL and React.js. I write
                clean, maintainable code, debug methodically and work well in
                Agile teams.
              </p>
              <p className="mb-4">
                I&rsquo;m looking for an entry-level Full Stack Developer role
                where I can design, build and ship scalable, enterprise-grade
                web applications.
              </p>
              <Chips
                list={[
                  "REST APIs",
                  "Database design",
                  "Responsive UI",
                  "Agile teamwork",
                ]}
              />
            </SpotlightCard>
          </Reveal>
        </Col>
        <Col lg={5} className="d-grid gap-4">
          <Reveal delay={90}>
            <SpotlightCard>
              <span className="gs-when">Education</span>
              <h3>B.E., Electronics &amp; Communication</h3>
              <p>Panimalar Engineering College, 2022 – 2026. CGPA 8.97 / 10.</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={180}>
            <SpotlightCard>
              <span className="gs-when">Schooling</span>
              <h3>HSC (Class XII)</h3>
              <p>Anjuham Hr. Sec. School, 2021 – 2022. 86.83%.</p>
            </SpotlightCard>
          </Reveal>
        </Col>
      </Row>
    </section>
  );
}
