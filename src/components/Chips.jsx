export default function Chips({ list }) {
  return (
    <div className="gs-chips">
      {list.map((x) => (
        <span key={x} className="gs-chip">
          {x}
        </span>
      ))}
    </div>
  );
}
