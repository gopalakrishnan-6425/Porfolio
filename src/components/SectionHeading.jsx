import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="gs-heading">
      <span className="gs-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </Reveal>
  );
}
