import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="gs-foot">
      &copy; {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
