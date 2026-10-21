import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import MAP from "../data/worldMap.js";

export default function Cosmos() {
  const c = useRef();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const fr = useRef(null);
  useEffect(() => {
    const x = c.current.getContext("2d"),
      R = Math.random,
      TAU = Math.PI * 2;
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const CO = 180,
      RO = 69,
      bin = atob(MAP),
      land = (i) => (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
    const CITIES = [
      ["CHENNAI", 80.27, 13.08, "Asia/Kolkata"],
      ["LONDON", -0.12, 51.5, "Europe/London"],
      ["NEW YORK", -74, 40.7, "America/New_York"],
      ["SAN FRANCISCO", -122.4, 37.8, "America/Los_Angeles"],
      ["SINGAPORE", 103.8, 1.35, "Asia/Singapore"],
      ["TOKYO", 139.7, 35.7, "Asia/Tokyo"],
      ["SYDNEY", 151.2, -33.9, "Australia/Sydney"],
      ["DUBAI", 55.3, 25.2, "Asia/Dubai"],
      ["BERLIN", 13.4, 52.5, "Europe/Berlin"],
      ["SAO PAULO", -46.6, -23.5, "America/Sao_Paulo"],
      ["JOHANNESBURG", 28, -26.2, "Africa/Johannesburg"],
      ["TORONTO", -79.4, 43.7, "America/Toronto"],
    ];
    const ARCS = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
      [0, 11],
      [1, 2],
      [3, 5],
      [4, 6],
      [8, 7],
      [2, 9],
    ];
    const PD = {
      dot: [139, 108, 255],
      hi: [34, 230, 255],
      home: [241, 63, 180],
      txt: [205, 210, 255],
    };
    const PL = {
      dot: [15, 107, 69],
      hi: [176, 118, 0],
      home: [15, 107, 69],
      txt: [12, 34, 23],
    };
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)),
      rg = (a, al) => `rgba(${a[0]},${a[1]},${a[2]},${al})`;
    let fm = [];
    try {
      fm = CITIES.map(
        (ci) =>
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: ci[3],
          }),
      );
    } catch (_) {}
    let W,
      H,
      mw,
      mh,
      off,
      ox = 0,
      oy = 0,
      mx = 0,
      my = 0,
      px = -999,
      py = -999,
      T = 0,
      tm = 0,
      raf,
      rt,
      sv = 0,
      ls = scrollY,
      stars = [],
      fixed = [],
      pk = [],
      rp = [],
      ts = [],
      tl = -9e3,
      pcol = "",
      rev = rm ? 9 : 0,
      nextPk = 0,
      homeT = 0;
    const isL = () => themeRef.current === "light";
    const at = (i) => [
      ox + ((CITIES[i][1] + 180) / 360) * mw,
      oy + ((80 - CITIES[i][2]) / 138) * mh,
    ];
    const bz = (a, b, t) => {
      const A = at(a),
        B = at(b),
        d = Math.hypot(B[0] - A[0], B[1] - A[1]),
        cx = (A[0] + B[0]) / 2,
        cy = (A[1] + B[1]) / 2 - d * 0.28,
        u = 1 - t;
      return [
        u * u * A[0] + 2 * u * t * cx + t * t * B[0],
        u * u * A[1] + 2 * u * t * cy + t * t * B[1],
      ];
    };
    const hl = (x0, y0, x1, y1, fn) => {
      const cell = mw / CO,
        c0 = Math.max(0, Math.floor((x0 - ox) / cell)),
        c1 = Math.min(CO - 1, Math.ceil((x1 - ox) / cell)),
        r0 = Math.max(0, Math.floor((y0 - oy) / cell)),
        r1 = Math.min(RO - 1, Math.ceil((y1 - oy) / cell));
      for (let r = r0; r <= r1; r++)
        for (let q = c0; q <= c1; q++)
          if (land(r * CO + q))
            fn(ox + (q + 0.5) * cell, oy + (r + 0.5) * cell, cell);
    };
    const renderMap = (P) => {
      off = document.createElement("canvas");
      off.width = Math.ceil(mw);
      off.height = Math.ceil(mh);
      const o = off.getContext("2d"),
        cell = mw / CO;
      o.strokeStyle = rg(P.dot, 0.12);
      o.lineWidth = 1;
      for (let lo = -180; lo <= 180; lo += 30) {
        const X = ((lo + 180) / 360) * mw;
        o.beginPath();
        o.moveTo(X, 0);
        o.lineTo(X, mh);
        o.stroke();
      }
      for (let la = -50; la <= 80; la += 30) {
        const Y = ((80 - la) / 138) * mh;
        o.beginPath();
        o.moveTo(0, Y);
        o.lineTo(mw, Y);
        o.stroke();
      }
      o.fillStyle = rg(P.dot, 0.4 - 0.08 * tm);
      for (let r = 0; r < RO; r++)
        for (let q = 0; q < CO; q++)
          if (land(r * CO + q)) {
            o.beginPath();
            o.arc((q + 0.5) * cell, (r + 0.5) * cell, cell * 0.3, 0, TAU);
            o.fill();
          }
    };
    const build = () => {
      W = c.current.width = innerWidth;
      H = c.current.height = innerHeight;
      mw = Math.max(W * 1.12, H * 1.5);
      mh = (mw * RO) / CO;
      pcol = "";
      stars = Array.from(
        { length: Math.min(150, Math.round((W * H) / 12000)) },
        () => ({ x: (R() - 0.5) * 2, y: (R() - 0.5) * 2, z: R() }),
      );
      fixed = Array.from({ length: Math.round((W * H) / 16000) }, () => ({
        x: R() * W,
        y: R() * H,
        r: R() * 1.2 + 0.3,
        ph: R() * 6,
        s: R() * 1.5 + 0.5,
      }));
    };
    const frame = (now = performance.now()) => {
      const L = isL(),
        tg = L ? 1 : 0;
      if (!rm) T += 1 / 60;
      tm += (tg - tm) * (rm ? 1 : 0.06);
      if (Math.abs(tg - tm) < 0.002) tm = tg;
      sv += (scrollY - ls - sv) * 0.1;
      ls = scrollY;
      const P = {
        dot: mix(PD.dot, PL.dot, tm),
        hi: mix(PD.hi, PL.hi, tm),
        home: mix(PD.home, PL.home, tm),
        txt: mix(PD.txt, PL.txt, tm),
      };
      const key = P.dot.join();
      if (key !== pcol) {
        pcol = key;
        renderMap(P);
      }
      const chx = ((CITIES[0][1] + 180) / 360) * mw,
        base = Math.max(W - mw, Math.min(0, W * 0.5 - chx));
      ox = Math.min(0, base + Math.min(scrollY * 0.02, W * 0.12)) - mx * 20;
      oy = H * 0.52 - mh / 2 + Math.sin(T * 0.15) * 6 - my * 14;
      x.clearRect(0, 0, W, H);
      [
        [0.18, 0.22, P.dot],
        [0.85, 0.7, P.hi],
        [0.55, 0.95, P.home],
      ].forEach(([fx, fy, col], i) => {
        const gx = W * fx + Math.sin(T * 0.1 + i * 2) * 70 - mx * 50,
          gy = H * fy + Math.cos(T * 0.08 + i) * 50,
          r = Math.max(W, H) * 0.4,
          g = x.createRadialGradient(gx, gy, 0, gx, gy, r);
        g.addColorStop(0, rg(col, 0.2 - 0.11 * tm));
        g.addColorStop(1, rg(col, 0));
        x.fillStyle = g;
        x.fillRect(gx - r, gy - r, 2 * r, 2 * r);
      });
      if (tm < 0.98) {
        const sa = 1 - tm,
          cols = ["#ffffff", "#9bf0ff", "#c4b5ff", "#ffb3e6"];
        fixed.forEach((s, i) => {
          x.globalAlpha =
            (0.2 + 0.45 * Math.abs(Math.sin(T * s.s + s.ph))) * sa;
          x.fillStyle = cols[i % 4];
          x.beginPath();
          x.arc(s.x, s.y, s.r, 0, TAU);
          x.fill();
        });
        const sp0 = 0.0007 + Math.abs(sv) * 0.00018,
          warp = Math.min(1, Math.abs(sv) / 40),
          cx = W / 2 - mx * W * 0.03,
          cy = H / 2 - my * H * 0.03;
        x.lineCap = "round";
        stars.forEach((s, i) => {
          if (!rm) s.z -= sp0;
          if (s.z < 0.04) {
            s.z = 1;
            s.x = (R() - 0.5) * 2;
            s.y = (R() - 0.5) * 2;
          }
          const k = 0.22 / s.z,
            k0 = 0.22 / (s.z + sp0 * (6 + warp * 40)),
            X = cx + s.x * W * 0.5 * k,
            Y = cy + s.y * H * 0.5 * k;
          if (X < -30 || X > W + 30 || Y < -30 || Y > H + 30) {
            s.z = 1;
            s.x = (R() - 0.5) * 2;
            s.y = (R() - 0.5) * 2;
            return;
          }
          x.globalAlpha = Math.min(1, (1 - s.z) * 1.4) * 0.85 * sa;
          x.strokeStyle = cols[i % 4];
          x.lineWidth = Math.max(0.5, (1 - s.z) * 2.2);
          x.beginPath();
          x.moveTo(cx + s.x * W * 0.5 * k0, cy + s.y * H * 0.5 * k0);
          x.lineTo(X, Y);
          x.stroke();
        });
      }
      const done = rev >= 3.2;
      x.save();
      if (!done) {
        const cp = at(0);
        x.beginPath();
        x.arc(cp[0], cp[1], rev * mw * 0.3, 0, TAU);
        x.clip();
      }
      x.globalAlpha = 1;
      x.drawImage(off, ox, oy);
      x.restore();
      if (!rm && !done) rev += 0.012;
      const ra = Math.max(0, Math.min(1, rev - 0.6)) * 1;
      x.save();
      x.lineWidth = 1.2;
      x.setLineDash([3, 8]);
      x.lineDashOffset = -T * 16;
      x.strokeStyle = rg(P.hi, 1);
      x.globalAlpha = 0.26 * ra;
      ARCS.forEach(([a, b]) => {
        const A = at(a),
          B = at(b),
          d = Math.hypot(B[0] - A[0], B[1] - A[1]);
        x.beginPath();
        x.moveTo(A[0], A[1]);
        x.quadraticCurveTo(
          (A[0] + B[0]) / 2,
          (A[1] + B[1]) / 2 - d * 0.28,
          B[0],
          B[1],
        );
        x.stroke();
      });
      x.restore();
      if (!rm && T > nextPk && rev > 1) {
        nextPk = T + 0.45 + R() * 0.7;
        const k = Math.floor(R() * ARCS.length),
          dr = R() < 0.65 ? 1 : -1;
        pk.push({ k, dr, t: dr > 0 ? 0 : 1, s: 0.007 + R() * 0.007 });
      }
      pk = pk.filter((p) => {
        p.t += p.dr * p.s;
        const [a, b] = ARCS[p.k];
        if (p.t > 1 || p.t < 0) {
          rp.push({ c: p.t > 1 ? b : a, r: 3, a: 0.9 });
          return false;
        }
        for (let j = 9; j >= 0; j--) {
          const q = bz(a, b, Math.max(0, Math.min(1, p.t - p.dr * j * 0.016)));
          x.globalAlpha = (1 - j / 10) * 0.9 * ra;
          x.fillStyle = rg(P.hi, 1);
          x.beginPath();
          x.arc(q[0], q[1], j ? 1.6 : 2.8, 0, TAU);
          x.fill();
        }
        return true;
      });
      if (!rm) {
        homeT++;
        if (homeT % 130 === 1) rp.push({ c: 0, r: 4, a: 1, big: 1 });
      }
      rp = rp.filter((q) => {
        q.r += q.big ? 0.7 : 0.45;
        q.a -= q.big ? 0.007 : 0.014;
        if (q.a <= 0) return false;
        const p = at(q.c);
        x.globalAlpha = q.a * ra;
        x.strokeStyle = rg(q.c ? P.hi : P.home, 1);
        x.lineWidth = 1.5;
        x.beginPath();
        x.arc(p[0], p[1], q.r, 0, TAU);
        x.stroke();
        return true;
      });
      if (now - tl > 1000) {
        tl = now;
        ts = fm.map((f) => f.format(new Date()));
      }
      x.font = '500 10px "JetBrains Mono",monospace';
      x.textBaseline = "middle";
      CITIES.forEach((ci, i) => {
        const p = at(i),
          home = !i;
        x.globalAlpha = ra;
        x.fillStyle = rg(home ? P.home : P.hi, 1);
        x.beginPath();
        x.arc(p[0], p[1], home ? 5 : 3, 0, TAU);
        x.fill();
        x.globalAlpha = ra * (home ? 0.22 : 0.15);
        x.beginPath();
        x.arc(p[0], p[1], home ? 14 : 9, 0, TAU);
        x.fill();
        if (home || W > 700) {
          x.globalAlpha = ra * (home ? 0.95 : 0.6);
          x.fillStyle = rg(P.txt, 1);
          x.fillText(
            ci[0] + " " + (ts[i] || "") + (home ? "  HOME BASE" : ""),
            p[0] + 11,
            p[1],
          );
        }
      });
      if (!rm && done) {
        const bx = ox + (((T * 0.08) % 1.25) - 0.1) * mw,
          g = x.createLinearGradient(bx - 60, 0, bx + 4, 0);
        g.addColorStop(0, rg(P.hi, 0));
        g.addColorStop(1, rg(P.hi, 0.16));
        x.globalAlpha = 1;
        x.fillStyle = g;
        x.fillRect(bx - 60, oy, 64, mh);
        x.fillStyle = rg(P.hi, 0.5);
        x.fillRect(bx + 2, oy, 1.5, mh);
        hl(bx - 50, oy, bx + 4, oy + mh, (X, Y, cell) => {
          x.globalAlpha = Math.max(0, Math.min(1, 1 - (bx - X) / 50)) * 0.85;
          x.fillStyle = rg(P.hi, 1);
          x.beginPath();
          x.arc(X, Y, cell * 0.34, 0, TAU);
          x.fill();
        });
      }
      if (done && px > ox && px < ox + mw && py > oy && py < oy + mh) {
        hl(px - 80, py - 80, px + 80, py + 80, (X, Y, cell) => {
          const d = Math.hypot(X - px, Y - py);
          if (d < 80) {
            x.globalAlpha = (1 - d / 80) * 0.9;
            x.fillStyle = rg(P.hi, 1);
            x.beginPath();
            x.arc(X, Y, cell * 0.36, 0, TAU);
            x.fill();
          }
        });
        x.globalAlpha = 0.65;
        x.strokeStyle = rg(P.hi, 1);
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(px - 16, py);
        x.lineTo(px - 5, py);
        x.moveTo(px + 5, py);
        x.lineTo(px + 16, py);
        x.moveTo(px, py - 16);
        x.lineTo(px, py - 5);
        x.moveTo(px, py + 5);
        x.lineTo(px, py + 16);
        x.stroke();
        const lo = ((px - ox) / mw) * 360 - 180,
          la = 80 - ((py - oy) / mh) * 138;
        x.fillStyle = rg(P.txt, 1);
        x.globalAlpha = 0.75;
        x.fillText(
          la.toFixed(1) + "\u00B0 " + lo.toFixed(1) + "\u00B0",
          px + 14,
          py - 12,
        );
      }
      x.globalAlpha = 1;
      if (!rm) raf = requestAnimationFrame(frame);
    };
    const mm = (ev) => {
      px = ev.clientX;
      py = ev.clientY;
      mx = px / W - 0.5;
      my = py / H - 0.5;
    };
    const rs = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        build();
        if (rm) frame();
      }, 150);
    };
    build();
    frame();
    fr.current = frame;
    addEventListener("resize", rs);
    addEventListener("pointermove", mm);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener("resize", rs);
      removeEventListener("pointermove", mm);
    };
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches && fr.current)
      fr.current();
  }, [theme]);
  return <canvas ref={c} id="bg" />;
}
