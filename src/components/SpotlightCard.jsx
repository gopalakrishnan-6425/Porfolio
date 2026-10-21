import { useRef } from "react";

/** Rounded glass card with a soft light that follows the cursor. */
export default function SpotlightCard({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const move = (e) => {
    const b = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - b.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - b.top}px`);
  };
  return (
    <Tag
      ref={ref}
      onMouseMove={move}
      className={`gs-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
