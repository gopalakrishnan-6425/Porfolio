import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeading from "../components/SectionHeading.jsx";
import TechLogo from "../components/TechLogo.jsx";
import Chips from "../components/Chips.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { LOGOS } from "../data/logos.js";
import { skillGroups } from "../data/skills.js";

export default function Skills() {
  useDocumentTitle("Skills");
  return (
    <section className="gs-section">
      <SectionHeading eyebrow="Skills" title="The stack I build with." />
      <Row className="g-4 mb-5">
        {Object.keys(LOGOS).map((name, i) => (
          <Col xs={6} md={4} xl={3} key={name}>
            <Reveal delay={(i % 4) * 70} className="h-100">
              <div className="gs-tile">
                <div>
                  <TechLogo name={name} />
                  {name}
                </div>
              </div>
            </Reveal>
          </Col>
        ))}
      </Row>
      {skillGroups.map(([label, list]) => (
        <Reveal key={label}>
          <Row className="g-2 mb-3 align-items-start">
            <Col md={3}>
              <div className="gs-lab">{label}</div>
            </Col>
            <Col md={9}>
              <Chips list={list} />
            </Col>
          </Row>
        </Reveal>
      ))}
    </section>
  );
}
