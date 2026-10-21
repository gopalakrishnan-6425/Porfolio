import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeading from "../components/SectionHeading.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

const interests = [
  {
    number: "01",
    symbol: "✳",
    title: "Cricket",
    text: "I enjoy the focus, teamwork, and energy that come with playing the game.",
  },
  {
    number: "02",
    symbol: "⌁",
    title: "Reading",
    text: "Books give me room to slow down, explore new ideas, and stay curious.",
  },
  {
    number: "03",
    symbol: "♫",
    title: "Music",
    text: "A favourite way to reset, recharge, and find a fresh rhythm.",
  },
];

export default function Beyond() {
  useDocumentTitle("Beyond the Code");

  return (
    <section className="gs-section gs-beyond-page">
      <SectionHeading
        eyebrow="Beyond the code"
        title="Curiosity keeps me moving."
      />
      <Reveal>
        <p className="gs-beyond-lead">
          I care about building dependable software for everyday life. Outside
          development, cricket, books, and music keep me energized and curious.
        </p>
      </Reveal>

      <Row className="g-4 gs-beyond-grid">
        {interests.map((interest, index) => (
          <Col md={4} key={interest.title}>
            <Reveal delay={index * 90} className="h-100">
              <SpotlightCard className="gs-beyond-card">
                <div className="gs-beyond-card-top">
                  <span className="gs-beyond-symbol" aria-hidden="true">
                    {interest.symbol}
                  </span>
                  <span className="gs-beyond-number">{interest.number}</span>
                </div>
                <h3>{interest.title}</h3>
                <p>{interest.text}</p>
              </SpotlightCard>
            </Reveal>
          </Col>
        ))}
      </Row>

      <Reveal delay={180}>
        <SpotlightCard className="gs-beyond-focus">
          <span className="gs-beyond-kicker">What drives me</span>
          <p>
            Turning practical ideas into reliable software that makes everyday
            experiences safer, simpler, and more useful.
          </p>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}

