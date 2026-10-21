import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Gopalakrishnan S`
      : "Gopalakrishnan S | Java Full Stack Developer";
  }, [title]);
}
