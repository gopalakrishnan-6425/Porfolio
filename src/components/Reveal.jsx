import useInView from "../hooks/useInView.js";

/** Fades and lifts its children in when scrolled into view. */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`gs-reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
