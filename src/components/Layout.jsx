import { useEffect } from "react";
import Cosmos from "./Cosmos.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Skills from "../pages/Skills.jsx";
import Experience from "../pages/Experience.jsx";
import Projects from "../pages/Projects.jsx";
import Beyond from "../pages/Beyond.jsx";
import Certifications from "../pages/Certifications.jsx";
import Contact from "../pages/Contact.jsx";
import { routes } from "../data/routes.js";

export default function Layout() {
  useEffect(() => {
    document.title = "Gopalakrishnan S | Java Full Stack Developer";

    // Keep old bookmarked route URLs working after moving to section anchors.
    const oldPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
    const legacySection = routes.find((route) => route.id === oldPath)?.id;
    const targetId = window.location.hash.slice(1) || legacySection;

    if (legacySection && !window.location.hash) {
      window.history.replaceState(null, "", `/#${legacySection}`);
    }

    if (targetId) {
      requestAnimationFrame(() => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior });
      });
    }
  }, []);

  return (
    <>
      <Cosmos />
      <Navbar />
      <Sidebar />
      <main className="gs-main">
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Beyond />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
