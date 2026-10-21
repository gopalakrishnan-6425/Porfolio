import { Outlet, useLocation } from "react-router-dom";
import Cosmos from "./Cosmos.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Cosmos />
      <ScrollToTop />
      <Navbar />
      <Sidebar />
      <main className="gs-main">
        {/* the key restarts the entrance animation on every route change */}
        <div key={pathname} className="gs-page">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
