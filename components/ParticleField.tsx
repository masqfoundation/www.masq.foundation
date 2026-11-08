"use client";

import { useEffect, useRef } from "react";
import styles from "./ParticleField.module.css";

/*
 * Full-screen particle scene behind the home page. Scroll position moves it
 * through six shapes, one per story section:
 *   0 a field of lights, 1 a centralized monolith, 2 people in their own spaces,
 *   3 a peer-to-peer globe, 4 three interlocking rings, 5 walking toward a horizon.
 */

const ACCENT: Vec3 = [229 / 255, 170 / 255, 67 / 255]; // #e5aa43
const PARTICLES = 14000;
const STAGES = 5;

type Vec3 = [number, number, number];

const VS = `
  precision highp float;
  attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4; attribute vec3 p5;
  attribute vec3 tA; attribute vec3 tB; attribute float r;
  uniform mat4 uProj; uniform mat4 uView;
  uniform vec3 uW0; uniform vec3 uW1;
  uniform float uTime; uniform float uSize; uniform float uDpr; uniform float uTrans;
  uniform vec3 uC[12];
  varying vec3 vCol; varying float vA;
  void main() {
    vec3 p = p0*uW0.x + p1*uW0.y + p2*uW0.z + p3*uW1.x + p4*uW1.y + p5*uW1.z;
    float d = 0.025 + uW0.x * 0.3;
    p += vec3(sin(uTime*0.5 + r*40.0), cos(uTime*0.4 + r*31.0), sin(uTime*0.33 + r*17.0)) * d;
    vec3 dir = normalize(vec3(sin(r*91.7), cos(r*57.3), sin(r*23.1 + 1.0)) + 0.0001);
    p += dir * uTrans * (1.0 + fract(r*7.0) * 2.5);
    vec3 c = uW0.x*mix(uC[0],uC[1],tA.x) + uW0.y*mix(uC[2],uC[3],tA.y) + uW0.z*mix(uC[4],uC[5],tA.z)
           + uW1.x*mix(uC[6],uC[7],tB.x) + uW1.y*mix(uC[8],uC[9],tB.y) + uW1.z*mix(uC[10],uC[11],tB.z);
    vec4 mv = uView * vec4(p, 1.0);
    gl_Position = uProj * mv;
    float s = uSize * (0.5 + fract(r*13.1) * 1.0);
    gl_PointSize = clamp(s * uDpr / -mv.z, 1.0, 48.0);
    vCol = c;
    vA = 0.6 + 0.4 * sin(uTime*1.3 + r*60.0);
  }`;

const FS = `
  precision mediump float;
  varying vec3 vCol; varying float vA;
  void main() {
    vec2 q = gl_PointCoord - 0.5;
    float d = dot(q, q);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.0, d) * vA;
    gl_FragColor = vec4(vCol * a, a);
  }`;

/** Pixel coordinates of a standing human silhouette drawn on a 100×200 canvas. */
function figurePixels(): number[] {
  const w = 100;
  const h = 200;
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const x = cv.getContext("2d");
  if (!x) return [50, 100];
  x.fillStyle = "#fff";
  const rr = (a: number, b: number, c: number, d: number, r: number) => {
    x.beginPath();
    x.moveTo(a + r, b);
    x.arcTo(a + c, b, a + c, b + d, r);
    x.arcTo(a + c, b + d, a, b + d, r);
    x.arcTo(a, b + d, a, b, r);
    x.arcTo(a, b, a + c, b, r);
    x.fill();
  };
  x.beginPath();
  x.arc(50, 24, 15, 0, Math.PI * 2);
  x.fill();
  rr(44, 36, 12, 12, 4);
  rr(29, 44, 42, 72, 16);
  rr(17, 50, 12, 64, 6);
  rr(71, 50, 12, 64, 6);
  rr(32, 108, 16, 88, 8);
  rr(52, 108, 16, 88, 8);
  const d = x.getImageData(0, 0, w, h).data;
  const pix: number[] = [];
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (d[(j * w + i) * 4 + 3] > 128) pix.push(i, j);
  return pix;
}

function buildGeometry(n: number) {
  let seed = 1234567;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pix = figurePixels();
  const fig = (cx: number, by: number, cz: number, sc: number): Vec3 => {
    const k = Math.floor(rnd() * (pix.length / 2)) * 2;
    const px = pix[k] + rnd();
    const py = pix[k + 1] + rnd();
    return [cx + ((px - 50) / 100) * sc, by + (1 - py / 200) * 2 * sc, cz + (rnd() - 0.5) * 0.22 * sc];
  };
  const sph = (): Vec3 => {
    const u = rnd() * 2 - 1;
    const a = rnd() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(a), u, s * Math.sin(a)];
  };
  const P = [0, 1, 2, 3, 4, 5].map(() => new Float32Array(n * 3));
  const TA = new Float32Array(n * 3);
  const TB = new Float32Array(n * 3);
  const R = new Float32Array(n);
  const set = (arr: Float32Array, i: number, v: Vec3) => {
    arr[i * 3] = v[0];
    arr[i * 3 + 1] = v[1];
    arr[i * 3 + 2] = v[2];
  };

  // Stage 3: network nodes on a globe, each linked to its three nearest neighbours.
  const M = 42;
  const nodes: Vec3[] = [];
  for (let k = 0; k < M; k++) {
    const y = 1 - ((k + 0.5) / M) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = k * 2.39996;
    nodes.push([Math.cos(th) * rad * 5, y * 5, Math.sin(th) * rad * 5]);
  }
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const ds = nodes
      .map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2] as const)
      .filter((e) => e[0] !== i)
      .sort((p, q) => p[1] - q[1]);
    for (let k = 0; k < 3; k++) edges.push([i, ds[k][0]]);
  });

  const people: [number, number][] = [[-6, 1], [-4, 0.86], [-2, 1.05], [0, 0.62], [2, 1], [4, 0.9], [6, 1.1]];
  const ringTilt: [number, number][] = [[0.9, 0.2], [-0.5, 1.1], [0.2, -1.0]];

  for (let i = 0; i < n; i++) {
    R[i] = rnd();
    // 0: a field of individual lights
    const s0 = sph();
    const r0 = 5 + rnd() * 10;
    set(P[0], i, [s0[0] * r0, s0[1] * r0 * 0.7, s0[2] * r0]);
    // 1: centralized monolith pulling everything in
    if (rnd() < 0.82) {
      const g = 0.22;
      const face = Math.floor(rnd() * 4);
      const u = Math.round((rnd() * 1.8 - 0.9) / g) * g;
      let v = rnd() * 8 - 4;
      if (rnd() < 0.5) v = Math.round(v / g) * g;
      const p: Vec3 = face === 0 ? [u, v, 0.9] : face === 1 ? [u, v, -0.9] : face === 2 ? [0.9, v, u] : [-0.9, v, u];
      set(P[1], i, p);
    } else {
      const s = sph();
      const t = rnd();
      set(P[1], i, [s[0] * 14 * t * t, s[1] * 8 * t * t, s[2] * 14 * t * t]);
    }
    // 2: people, each inside their own protective space
    const pp = people[i % 7];
    const pz = -Math.abs(pp[0]) * 0.35;
    const base = -1.8;
    if (rnd() < 0.64) {
      set(P[2], i, fig(pp[0], base, pz, pp[1] * 1.15));
      TA[i * 3 + 2] = 0;
    } else {
      const s = sph();
      const rr = 1.35 * pp[1] + 0.25;
      set(P[2], i, [pp[0] + s[0] * rr, base + 1.15 * pp[1] + s[1] * rr, pz + s[2] * rr]);
      TA[i * 3 + 2] = 1;
    }
    // 3: a peer-to-peer network with no center
    if (rnd() < 0.34) {
      const nd = nodes[Math.floor(rnd() * M)];
      const s = sph();
      set(P[3], i, [nd[0] + s[0] * 0.14, nd[1] + s[1] * 0.14, nd[2] + s[2] * 0.14]);
      TB[i * 3] = 0;
    } else {
      const e = edges[Math.floor(rnd() * edges.length)];
      const a = nodes[e[0]];
      const b = nodes[e[1]];
      const t = rnd();
      const q: Vec3 = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      const l = Math.hypot(q[0], q[1], q[2]) || 1;
      const lift = (5 * (1 + 0.05 * Math.sin(Math.PI * t))) / l;
      set(P[3], i, [q[0] * lift, q[1] * lift, q[2] * lift]);
      TB[i * 3] = 1;
    }
    // 4: three interlocking programs
    if (rnd() < 0.12) {
      const s = sph();
      const rr = rnd() * 0.5;
      set(P[4], i, [s[0] * rr, s[1] * rr, s[2] * rr]);
      TB[i * 3 + 1] = 0;
    } else {
      const k = i % 3;
      const ang = rnd() * Math.PI * 2;
      const R4 = 2.5;
      const ca = (2 * Math.PI * k) / 3 + Math.PI / 2;
      const x = Math.cos(ang) * R4 + (rnd() - 0.5) * 0.12;
      const y = Math.sin(ang) * R4 + (rnd() - 0.5) * 0.12;
      const z = (rnd() - 0.5) * 0.12;
      const [tx, ty] = ringTilt[k];
      const y2 = y * Math.cos(tx) - z * Math.sin(tx);
      const z2 = y * Math.sin(tx) + z * Math.cos(tx);
      const x3 = x * Math.cos(ty) + z2 * Math.sin(ty);
      const z3 = -x * Math.sin(ty) + z2 * Math.cos(ty);
      set(P[4], i, [x3 + Math.cos(ca) * 1.6, y2 + Math.sin(ca) * 1.6, z3]);
      TB[i * 3 + 1] = k / 2;
    }
    // 5: walking together toward a new horizon
    const q5 = rnd();
    if (q5 < 0.55) {
      let x: number;
      let z: number;
      if (rnd() < 0.5) {
        x = rnd() * 28 - 14;
        z = -20 + Math.floor(rnd() * 16) * 1.5;
      } else {
        z = rnd() * 24 - 20;
        x = -14 + Math.floor(rnd() * 19) * 1.555;
      }
      set(P[5], i, [x, -2, z]);
      TB[i * 3 + 2] = 0.85;
    } else if (q5 < 0.77) {
      const a = rnd() * Math.PI * 2;
      const rr = Math.sqrt(rnd()) * 3.4;
      set(P[5], i, [Math.cos(a) * rr, 1.6 + Math.sin(a) * rr, -19 + (rnd() - 0.5) * 0.3]);
      TB[i * 3 + 2] = 0;
    } else {
      const f = ([[-1.3, 1], [0, 0.62], [1.1, 1.05]] as const)[i % 3];
      set(P[5], i, fig(f[0], -2, 2.5, f[1] * 1.2));
      TB[i * 3 + 2] = 0.2;
    }
    TA[i * 3] = rnd() < 0.85 ? rnd() * 0.3 : 1;
    TA[i * 3 + 1] = rnd();
  }

  return { P, TA, TB, R };
}

function perspective(fy: number, asp: number, near: number, far: number) {
  const t = 1 / Math.tan(fy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(e: Vec3, c: Vec3) {
  let z: number[] = [e[0] - c[0], e[1] - c[1], e[2] - c[2]];
  let l = Math.hypot(z[0], z[1], z[2]);
  z = z.map((v) => v / l);
  let x = [z[2], 0, -z[0]];
  l = Math.hypot(x[0], x[1], x[2]) || 1;
  x = x.map((v) => v / l);
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -(x[0] * e[0] + x[1] * e[1] + x[2] * e[2]),
    -(y[0] * e[0] + y[1] * e[1] + y[2] * e[2]),
    -(z[0] * e[0] + z[1] * e[1] + z[2] * e[2]),
    1,
  ]);
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const u = Object.fromEntries(
      ["uProj", "uView", "uW0", "uW1", "uTime", "uSize", "uDpr", "uTrans", "uC[0]"].map((name) => [
        name,
        gl.getUniformLocation(prog, name),
      ]),
    );
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    const { P, TA, TB, R } = buildGeometry(PARTICLES);
    const buffers: WebGLBuffer[] = [];
    const bind = (name: string, data: Float32Array, size: number) => {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) return;
      const b = gl.createBuffer()!;
      buffers.push(b);
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };
    P.forEach((p, k) => bind(`p${k}`, p, 3));
    bind("tA", TA, 3);
    bind("tB", TB, 3);
    bind("r", R, 1);

    // Palette: two colors per stage, mixed by each particle's tA/tB value.
    const warm: Vec3 = [1.0, 0.95, 0.86];
    const cyan: Vec3 = [0.35, 0.82, 0.9];
    const cold: Vec3 = [0.49, 0.54, 0.6];
    const deep: Vec3 = [0.17, 0.29, 0.48];
    const palette = [warm, ACCENT, cold, deep, ACCENT, cyan, warm, cyan, ACCENT, cyan, ACCENT, deep];
    const colors = new Float32Array(36);
    palette.forEach((col, i) => {
      colors[i * 3] = col[0] * 0.55;
      colors[i * 3 + 1] = col[1] * 0.55;
      colors[i * 3 + 2] = col[2] * 0.55;
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dpr = 1;
    let aspect = 1;
    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2, 4096 / Math.max(w, h));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      aspect = w / h;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    let mouse = [0, 0];
    const onMove = (e: PointerEvent) => {
      mouse = [e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5];
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    const eyes: Vec3[] = [[0, 0, 17], [-3.2, 1, 14], [-3.2, 1.2, 13], [-3.2, 2, 15], [-3.2, 0.3, 12], [-3.2, 0.8, 11]];
    const targets: Vec3[] = [[0, 0, 0], [-3.2, 0, 0], [-3.2, 0, 0], [-3.2, 0, 0], [-3.2, 0, 0], [-3.2, 0, -6]];

    const start = performance.now();
    let stage = 0;
    let raf = 0;

    const frame = () => {
      if (canvas.width !== Math.round(canvas.clientWidth * dpr) || canvas.height !== Math.round(canvas.clientHeight * dpr)) {
        resize();
      }
      const still = reduceMotion.matches;
      const t = still ? 0 : (performance.now() - start) / 1000;
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      const target = max > 40 ? Math.min(1, Math.max(0, el.scrollTop / max)) * STAGES : 0;
      stage = still ? target : stage + (target - stage) * 0.06;

      const a = Math.min(STAGES - 1, Math.floor(stage));
      const f = stage - a;
      const e = Math.min(1, Math.max(0, (f - 0.3) / 0.5));
      const tt = e * e * (3 - 2 * e);
      const w = [0, 0, 0, 0, 0, 0];
      if (stage >= STAGES) w[STAGES] = 1;
      else {
        w[a] = 1 - tt;
        w[a + 1] = tt;
      }
      const trans = 1 - Math.max(...w);

      const mix = (list: Vec3[]): Vec3 =>
        [0, 1, 2].map((k) => list.reduce((s, v, i) => s + v[k] * w[i], 0)) as Vec3;
      const tgt = mix(targets);
      let eye = mix(eyes);
      const orbit = Math.sin(t * 0.08) * 0.35 * (1 - w[5] * 0.7) + mouse[0] * 0.25 + w[3] * t * 0.06;
      const dx = eye[0] - tgt[0];
      const dz = eye[2] - tgt[2];
      eye = [
        tgt[0] + dx * Math.cos(orbit) - dz * Math.sin(orbit),
        eye[1] - mouse[1] * 1.2,
        tgt[2] + dx * Math.sin(orbit) + dz * Math.cos(orbit),
      ];

      gl.clearColor(0.027, 0.035, 0.047, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(u.uProj, false, perspective(0.75, aspect, 0.1, 100));
      gl.uniformMatrix4fv(u.uView, false, lookAt(eye, tgt));
      gl.uniform3f(u.uW0, w[0], w[1], w[2]);
      gl.uniform3f(u.uW1, w[3], w[4], w[5]);
      gl.uniform1f(u.uTime, t);
      gl.uniform1f(u.uSize, 26);
      gl.uniform1f(u.uDpr, dpr);
      gl.uniform1f(u.uTrans, trans * 1.6);
      gl.uniform3fv(u["uC[0]"], colors);
      gl.drawArrays(gl.POINTS, 0, PARTICLES);
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
    </>
  );
}
