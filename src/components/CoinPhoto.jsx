import { useRef } from "react";
import photo from "../assets/profile.jpg";

const RIM_LAYERS = 15;
/** A profile coin with a 3D flip and a smooth settling motion. */
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
              style={{ transform: `translateZ(${i - (RIM_LAYERS - 1) / 2}px)` }}
            />
          ))}
          <div className="gs-face gs-front">
            <img src={photo} alt={alt} />
            <span className="gs-photo-glint" aria-hidden="true" />
          </div>
          <div className="gs-face gs-back" aria-hidden="true">
            <b>GOKI</b>
            <span>Java Full Stack Developer</span>
          </div>
        </div>
      </div>
      <span className="gs-cap">{caption}</span>
    </div>
  );
}
