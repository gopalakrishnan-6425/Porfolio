import { useRef } from "react";
import photo from "../assets/profile-coin.jpg";

const RIM_LAYERS = 9;
const COIN_PATH =
  "M 0.5273 0.0099 L 0.7941 0.1071 Q 0.8214 0.117 0.8359 0.1422 L 0.9779 0.388 Q 0.9924 0.4132 0.9874 0.4418 L 0.938 0.7214 Q 0.933 0.75 0.9107 0.7687 L 0.6933 0.9511 Q 0.671 0.9698 0.6419 0.9698 L 0.3581 0.9698 Q 0.329 0.9698 0.3067 0.9511 L 0.0893 0.7687 Q 0.067 0.75 0.062 0.7214 L 0.0126 0.4418 Q 0.0076 0.4132 0.0221 0.388 L 0.1641 0.1422 Q 0.1786 0.117 0.2059 0.1071 L 0.4727 0.0099 Q 0.5 0 0.5273 0.0099 Z";

export default function CoinPhoto({
  alt,
  caption = "Open to entry-level roles",
}) {
  const stageRef = useRef(null);
  const trackPointer = (event) => {
    if (event.pointerType === "touch" || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    stageRef.current.style.setProperty("--pointer-x", `${x * 100}%`);
    stageRef.current.style.setProperty("--pointer-y", `${y * 100}%`);
    stageRef.current.style.setProperty("--photo-shift-x", `${(x - 0.5) * 8}px`);
    stageRef.current.style.setProperty("--photo-shift-y", `${(y - 0.5) * 8}px`);
  };
  const resetPointer = () => {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty("--pointer-x", "50%");
    stageRef.current.style.setProperty("--pointer-y", "45%");
    stageRef.current.style.setProperty("--photo-shift-x", "0px");
    stageRef.current.style.setProperty("--photo-shift-y", "0px");
  };

  return (
    <div
      className="gs-coin-stage"
      ref={stageRef}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
    >
      <div className="gs-sh soft" />
      <div className="gs-sh contact" />
      <div className="gs-coin-toss">
        <div className="gs-coin">
          {Array.from({ length: RIM_LAYERS }, (_, i) => (
            <div
              key={i}
              className="gs-rim"
              style={{
                transform: `translateZ(${(i - (RIM_LAYERS - 1) / 2) * 0.7}px)`,
              }}
            />
          ))}
          <div className="gs-face gs-front">
            <img src={photo} alt={alt} />
            <span className="gs-photo-glint" aria-hidden="true" />
          </div>
          <div className="gs-face gs-back" aria-hidden="true">
            <svg className="gs-back-outline" viewBox="0 0 1 1">
              <path d={COIN_PATH} transform="translate(0.035 0.035) scale(0.93)" />
            </svg>
            <b>GOKI</b>
            <span>
              Java Full Stack
              <br />
              Developer
            </span>
          </div>
          <svg
            className="gs-neon-outline gs-neon-front"
            viewBox="0 0 1 1"
            aria-hidden="true"
          >
            <path d={COIN_PATH} />
            <path className="gs-neon-accent" d={COIN_PATH} />
          </svg>
        </div>
      </div>
      <span className="gs-cap">{caption}</span>
    </div>
  );
}
