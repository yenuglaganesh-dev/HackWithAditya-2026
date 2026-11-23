import React, { useEffect, useRef } from 'react';

const VERT = "attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}";

const FRAG = `precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uMix;
uniform vec2 uPtr;
uniform float uPtrOn;
uniform vec3 uAccent;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++){
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

vec3 spectrum(float t){
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

vec3 mosaic(vec2 frag){
  vec2 p = frag / uRes.y;
  float t = uTime * 0.12;
  float scale = max(uRes.y / 28.0, 8.0);
  vec2 grid = floor(frag / scale);
  vec2 gcoord = grid * scale;
  float id = hash(grid);
  float n = fbm(grid * 0.08 + vec2(t * 0.25, -t * 0.18));
  float lum = mix(0.02, 0.14, n);
  lum += (id - 0.5) * 0.045;
  vec2 cellCenter = (gcoord + scale * 0.5) / uRes.y;
  float dPtr = length(cellCenter - uPtr);
  float ptrInf = exp(-dPtr * 6.5) * uPtrOn;
  lum += ptrInf * 0.22;
  vec3 col = vec3(lum * 0.82, lum * 0.88, lum * 1.06);
  float flare = smoothstep(0.82, 0.98, sin(id * 40.0 + t * 2.2));
  col += uAccent * (flare * 0.35 + ptrInf * 0.55);
  vec2 f = fract(frag / scale);
  float border = step(0.05, f.x) * step(0.05, f.y);
  col *= 0.62 + 0.38 * border;
  return col;
}

vec3 prism(vec2 frag){
  vec2 p = (frag - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.08;
  vec2 d = normalize(vec2(1.0, 0.75));
  float s = dot(p, d) + t * 0.18;
  vec3 col = vec3(0.02, 0.02, 0.026);
  float beam = smoothstep(0.7, 0.0, abs(dot(p, vec2(-d.y, d.x))));
  vec3 spec = spectrum(s * 1.4);
  col += spec * beam * 0.06;
  float glint = pow(max(0.0, 1.0 - abs(s - 0.02) * 30.0), 3.0) * beam;
  col += vec3(0.9, 0.95, 1.0) * glint * 0.22;
  col += uAccent * 0.03;
  return col;
}

vec3 waves(vec2 frag){
  vec2 p = frag / uRes.y;
  float t = uTime * 0.11;
  vec3 col = mix(vec3(0.07, 0.04, 0.08), vec3(0.20, 0.11, 0.19), smoothstep(0.0, 1.1, p.y));
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float y = 0.52 + (fi - 2.0) * 0.055
      + 0.16 * sin(p.x * (1.5 + fi * 0.3) + t * (1.0 + fi * 0.22) + fi * 1.7)
      + 0.05 * sin(p.x * 3.7 - t * 1.4 + fi * 2.3);
    float dist = abs(p.y - y);
    vec3 c = spectrum(fi * 0.16 + p.x * 0.12 - t * 0.25);
    col += c * (exp(-dist * 42.0) * 0.28 + exp(-dist * 7.0) * 0.05);
  }
  col *= 0.88 + 0.24 * fbm(p * 2.2 + t);
  return col;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  float m = clamp(uMix, 0.0, 2.0);
  vec3 a; vec3 b = vec3(0.0); float k;
  if (m < 1.0) { k = m; a = mosaic(frag); if (k > 0.001) b = prism(frag); }
  else { k = m - 1.0; a = prism(frag); if (k > 0.001) b = waves(frag); }
  float cell = max(uRes.y / 30.0, 9.0);
  float thr = hash(floor(frag / cell) + 7.0) * 0.65 + (frag.y / uRes.y) * 0.35;
  float w = smoothstep(thr - 0.06, thr + 0.06, k * 1.12 - 0.06);
  vec3 col = mix(a, b, w);
  vec2 uv = frag / uRes;
  float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.0, 1.15)));
  col *= 0.55 + 0.45 * vig;
  col += (hash(frag + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function MosaicSkyBackground({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "1";
    canvas.style.pointerEvents = "none";
    container.prepend(canvas);

    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.remove();
      return;
    }

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      canvas.remove();
      return;
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.remove();
      return;
    }

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      mix: gl.getUniformLocation(prog, "uMix"),
      ptr: gl.getUniformLocation(prog, "uPtr"),
      ptrOn: gl.getUniformLocation(prog, "uPtrOn"),
      accent: gl.getUniformLocation(prog, "uAccent"),
    };

    // Ice accent (sky cyan)
    gl.uniform3f(U.accent, 0.46, 0.84, 1.0);

    let w = 0;
    let h = 0;
    let dirty = true;
    const state = { ptr: [0.5, 0.5], ptrOn: 0, mix: 0 };

    const size = () => {
      const r = container.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
      w = Math.max(1, Math.round(r.width * scale));
      h = Math.max(1, Math.round(r.height * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      dirty = true;
    };
    size();

    const ro = new ResizeObserver(size);
    ro.observe(container);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(container);

    const t0 = performance.now();
    let raf = 0;
    let ptrOn = 0;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ptrOn += (state.ptrOn - ptrOn) * 0.08;

      // Slowly adapt uMix based on scroll position
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFrac = Math.min(1, Math.max(0, window.scrollY / scrollMax));
      const targetMix = scrollFrac * 1.5;

      gl.uniform2f(U.res, w, h);
      gl.uniform1f(U.time, (now - t0) / 1000);
      gl.uniform1f(U.mix, targetMix);
      gl.uniform2f(U.ptr, state.ptr[0], state.ptr[1]);
      gl.uniform1f(U.ptrOn, ptrOn);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    const move = (e) => {
      const r = container.getBoundingClientRect();
      state.ptr = [(e.clientX - r.left) / r.height, (r.bottom - e.clientY) / r.height];
      state.ptrOn = 1;
    };

    const leave = () => {
      state.ptrOn = 0;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050506] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,6,0.65) 0%, rgba(5,5,6,0.2) 20%, rgba(5,5,6,0.3) 80%, rgba(5,5,6,0.7) 100%)",
        }}
      />
    </div>
  );
}
