import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#";

/** Scrambles text and resolves it character by character. */
export default function useDecodeText(text) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return undefined;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      setOut(
        [...text]
          .map((ch, i) =>
            ch === " " || frame > i * 1.5 + 5
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame > text.length * 1.5 + 8) {
        clearInterval(id);
        setOut(text);
      }
    }, 38);
    return () => clearInterval(id);
  }, [text]);
  return out;
}

/** Cycles through a list of strings. */
export function useRotator(list, ms = 3400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % list.length), ms);
    return () => clearInterval(id);
  }, [list, ms]);
  return list[i];
}
