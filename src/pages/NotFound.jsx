import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

export default function NotFound() {
  useDocumentTitle("Not found");
  return (
    <section className="gs-hero text-center justify-content-center">
      <div>
        <span className="gs-eyebrow">Error 404</span>
        <h1 className="gs-h1">Lost in space.</h1>
        <p className="gs-lead mx-auto">That page doesn&rsquo;t exist.</p>
        <Link className="gs-btn primary" to="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
