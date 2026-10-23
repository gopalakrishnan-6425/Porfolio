import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Reveal from "../components/Reveal.jsx";

const certs = ["Java Developer", "Front End Web Developer"];

export default function Certifications() {
  return (
    <section className="gs-section" id="certifications">
      <SectionHeading eyebrow="Certifications" title="Always learning." />
      <Row className="g-4">
        {certs.map((c, i) => (
          <Col md={6} key={c}>
            <Reveal delay={i * 90} className="h-100">
              <SpotlightCard>
                <span className="gs-when">Infosys Springboard</span>
                <h3>{c}</h3>
              </SpotlightCard>
            </Reveal>
          </Col>
        ))}
      </Row>
    </section>
  );
}
