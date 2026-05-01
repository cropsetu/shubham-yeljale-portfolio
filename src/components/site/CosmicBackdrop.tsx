import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ═══════════════════════════════ GALAXY ═══════════════════════════════
 * Logarithmic-spiral disk built from ~14 000 additively-blended points.
 *
 * - Radius drawn from a power-law so most stars cluster toward the bulge.
 * - Each star is assigned to one of NUM_ARMS arms; its base angle follows
 *   θ = (1/b) · ln(r), the standard log-spiral relation. Arm pitch matches
 *   the Milky Way's ~12° (b = tan 12°).
 * - Gaussian jitter perpendicular to the arm spreads the arm into a soft
 *   band (wider at the rim, tight near the core) — so dust lanes appear
 *   naturally as the dim gaps between arms.
 * - Vertical scale-height shrinks with radius: a thick central bulge that
 *   flattens into a thin disk at the rim.
 * - Colour ramp by radius: yellow/orange core → cream mid → blue rim,
 *   with ~3% magenta "HII region" hot spots scattered through the arms.
 * - Star size correlates with hue (bluer = larger young star).
 * - Custom GLSL renders each point as a soft round splat with a hot core
 *   (turns pixels into stars instead of squares).
 */

const NUM_ARMS = 4;
const PITCH_DEG = 12;
const GAL_RADIUS = 14;

function gauss() {
  // Box-Muller, returns roughly N(0,1)
  const u = Math.max(1e-6, Math.random());
  const v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function Galaxy() {
  const ref = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const { positions, colors, sizes, count } = useMemo(() => {
    const count = 14000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const b = Math.tan((PITCH_DEG * Math.PI) / 180);
    const armSpacing = (Math.PI * 2) / NUM_ARMS;

    const C_CORE = new THREE.Color("#ffd9a1"); // warm yellow
    const C_MID = new THREE.Color("#ffe9c2"); // cream white
    const C_RIM = new THREE.Color("#7da7ff"); // cool blue
    const C_HII = new THREE.Color("#ff5fa3"); // pink HII region

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // power-law radius — exponent < 1 packs density toward centre
      const u = Math.random();
      const r = Math.pow(u, 0.55) * GAL_RADIUS + 0.05;

      // assign to an arm and compute base angle on the log spiral
      const arm = Math.floor(Math.random() * NUM_ARMS);
      const base = (1 / b) * Math.log(r * 0.6 + 0.7);
      // perpendicular gaussian jitter — wider at the rim
      const armWidth = 0.22 + r * 0.06;
      const tan = gauss() * armWidth;
      // along-arm jitter softens the spiral edges
      const along = gauss() * 0.05;

      const theta = base + arm * armSpacing + along;
      // convert tangent jitter into x/z offset perpendicular to arm
      const dx = -Math.sin(theta) * tan;
      const dz = Math.cos(theta) * tan;

      // vertical scale-height: tall bulge, thin disk at rim
      const h = (0.35 + Math.exp(-r * 0.45) * 1.2) * 0.18;
      const y = gauss() * h;

      positions[i3] = Math.cos(theta) * r + dx;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * r + dz;

      // colour mix: 0=core, 0.5=mid, 1=rim
      const t = Math.min(1, r / GAL_RADIUS);
      const col = new THREE.Color();
      if (t < 0.45) col.lerpColors(C_CORE, C_MID, t / 0.45);
      else col.lerpColors(C_MID, C_RIM, (t - 0.45) / 0.55);

      // 3% chance to be a pink HII hot spot (skewed toward arm regions)
      if (Math.random() < 0.03 && r > 1.5 && r < GAL_RADIUS * 0.85) {
        col.lerp(C_HII, 0.85);
      }
      // sprinkle of pure-white old stars in the halo
      if (Math.random() < 0.02) col.set("#ffffff");

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      // size: blue/HII = larger young stars; vary brightness
      const blueness = (col.b - col.r) * 0.6 + 0.5;
      sizes[i] = (0.9 + Math.random() * 1.4) * (0.7 + blueness);
    }
    return { positions, colors, sizes, count };
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: 1 } }),
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }
  }, [uniforms]);

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (!ref.current) return;
    // slow galactic rotation
    ref.current.rotation.y += delta * 0.018;
    // gentle scroll-driven pull-back so the galaxy "recedes" as you scroll
    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    state.camera.position.z = 11 + scroll * 1.8;
    state.camera.position.y = 4 + scroll * 0.4;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation={[Math.PI * 0.18, 0, 0]}>
      {/* Bright core glow — billboarded sprite with radial falloff */}
      <CoreGlow />
      <points ref={ref} count={count}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={
            /* glsl */ `
            attribute float size;
            varying vec3 vColor;
            uniform float uPixelRatio;
            uniform float uTime;
            void main() {
              vColor = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              // tiny twinkle so individual stars breathe
              float tw = 0.85 + 0.15 * sin(uTime * 3.0 + position.x * 12.7 + position.z * 9.3);
              gl_PointSize = size * 14.0 * uPixelRatio * tw / -mv.z;
              gl_Position = projectionMatrix * mv;
            }
          `
          }
          fragmentShader={
            /* glsl */ `
            varying vec3 vColor;
            void main() {
              vec2 uv = gl_PointCoord - 0.5;
              float d = length(uv);
              if (d > 0.5) discard;
              // soft round splat with bright core
              float core = pow(1.0 - d * 2.0, 2.5);
              float halo = exp(-d * 6.0) * 0.6;
              vec3 col = vColor * (core + halo);
              gl_FragColor = vec4(col, core + halo * 0.6);
            }
          `
          }
          vertexColors
        />
      </points>
    </group>
  );
}

/** Glowing galactic core: a billboarded plane with a radial gradient. */
function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ camera }) => {
    if (ref.current) ref.current.lookAt(camera.position);
  });
  return (
    <mesh ref={ref} renderOrder={-1}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={
          /* glsl */ `
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            float inner = exp(-d * 5.0);          // tight bright core
            float outer = exp(-d * 1.6) * 0.55;   // soft yellow halo
            vec3 col = mix(vec3(1.0, 0.92, 0.78), vec3(1.0, 0.62, 0.38), d);
            gl_FragColor = vec4(col * (inner + outer), inner + outer * 0.55);
          }
        `
        }
      />
    </mesh>
  );
}

/* ══════════════════════════════ EARTH ══════════════════════════════
 *   - Surface: spinning sphere with warped-fbm continents, latitude
 *     gradients (tropical → arctic), polar ice, day/night terminator,
 *     city lights baked into the shader on the night side.
 *   - Clouds: separate sphere just above the surface, rotating faster,
 *     transparent and pillowy.
 *   - Atmosphere: two back-side spheres for a soft Rayleigh-blue limb.
 */

const earthVert = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjectPos;
  void main() {
    vObjectPos = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const noiseGLSL = /* glsl */ `
  vec3 hash3(vec3 p) {
    return fract(sin(vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    )) * 43758.5453);
  }
  float noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(mix(hash3(i+vec3(0,0,0)).x, hash3(i+vec3(1,0,0)).x, f.x),
                   mix(hash3(i+vec3(0,1,0)).x, hash3(i+vec3(1,1,0)).x, f.x), f.y),
               mix(mix(hash3(i+vec3(0,0,1)).x, hash3(i+vec3(1,0,1)).x, f.x),
                   mix(hash3(i+vec3(0,1,1)).x, hash3(i+vec3(1,1,1)).x, f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise3(p);
      p *= 2.07;
      a *= 0.5;
    }
    return v;
  }
  // Domain-warped fbm — bends the noise so continents have curvy coastlines
  float warpedFbm(vec3 p) {
    vec3 q = vec3(fbm(p), fbm(p + vec3(5.2, 1.3, 8.7)), fbm(p + vec3(2.1, 9.4, 3.6)));
    return fbm(p + 4.0 * q);
  }
`;

const earthFrag =
  /* glsl */ `
  precision highp float;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjectPos;
  uniform float uTime;
  uniform vec3 uLightDir;
` +
  noiseGLSL +
  /* glsl */ `
  void main() {
    vec3 n = normalize(vNormal);

    // rotate sample point so the planet visibly spins
    float rot = uTime * 0.05;
    float c = cos(rot), s = sin(rot);
    vec3 sp = vec3(
      vObjectPos.x * c - vObjectPos.z * s,
      vObjectPos.y,
      vObjectPos.x * s + vObjectPos.z * c
    );

    // ---- LAND vs OCEAN -------------------------------------------------
    float continent = warpedFbm(sp * 1.05);

    // mid-frequency mountain ridges over land
    float mountains = warpedFbm(sp * 3.5);
    float coast = smoothstep(0.48, 0.55, continent);

    vec3 oceanDeep    = vec3(0.020, 0.045, 0.18);
    vec3 oceanShallow = vec3(0.07, 0.32, 0.60);
    float lat = abs(n.y);
    vec3 ocean = mix(oceanShallow, oceanDeep, lat * 0.65 + (1.0 - coast) * 0.4);

    vec3 forest  = vec3(0.10, 0.32, 0.15);
    vec3 jungle  = vec3(0.06, 0.40, 0.18);
    vec3 grass   = vec3(0.30, 0.42, 0.18);
    vec3 desert  = vec3(0.55, 0.42, 0.22);
    vec3 mountain= vec3(0.34, 0.30, 0.27);

    // latitude biome mix: equator → jungle, mid → forest/grass, high → desert/tundra
    float climate = smoothstep(0.0, 0.65, lat);
    vec3 land = mix(jungle, forest, climate);
    land = mix(land, grass, smoothstep(0.35, 0.65, lat));
    land = mix(land, desert, smoothstep(0.55, 0.78, mountains));
    land = mix(land, mountain, smoothstep(0.62, 0.85, mountains));

    vec3 surface = mix(ocean, land, coast);

    // ---- POLAR ICE -----------------------------------------------------
    float iceMask = smoothstep(0.78, 0.94, lat) + smoothstep(0.66, 0.90, lat) * 0.3;
    iceMask = clamp(iceMask, 0.0, 1.0);
    surface = mix(surface, vec3(0.94, 0.97, 1.0), iceMask * (0.6 + 0.4 * coast));

    // ---- LIGHTING ------------------------------------------------------
    vec3 L = normalize(uLightDir);
    float lambert = dot(n, L);
    float dayMix = smoothstep(-0.18, 0.22, lambert);

    // night side: very dark + warm city lights on inhabited land
    vec3 night = surface * 0.04;
    float cityNoise = warpedFbm(sp * 30.0);
    float cities = smoothstep(0.78, 0.92, cityNoise) * (1.0 - dayMix) * coast;
    // people don't live on ice or deserts → reduce there
    cities *= 1.0 - iceMask;
    cities *= 1.0 - smoothstep(0.6, 0.85, mountains) * 0.5;
    night += cities * vec3(1.0, 0.65, 0.30) * 1.5;

    vec3 color = mix(night, surface, dayMix);

    // golden hour at terminator
    float term = 1.0 - abs(lambert);
    color += vec3(1.0, 0.55, 0.18) * pow(term, 6.0) * 0.35;

    // specular highlight on water (sun glint)
    vec3 H = normalize(L + vViewDir);
    float spec = pow(max(dot(n, H), 0.0), 90.0) * (1.0 - coast) * dayMix;
    color += vec3(1.0, 0.96, 0.85) * spec * 0.55;

    // Rayleigh-blue rim baked into the surface (limb darkening + glow)
    float fres = pow(1.0 - max(dot(n, vViewDir), 0.0), 3.0);
    color += vec3(0.30, 0.55, 0.95) * fres * (0.45 + dayMix * 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const cloudFrag =
  /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjectPos;
  uniform float uTime;
  uniform vec3 uLightDir;
` +
  noiseGLSL +
  /* glsl */ `
  void main() {
    // clouds rotate slightly faster than the surface
    float rot = uTime * 0.075;
    float c = cos(rot), s = sin(rot);
    vec3 sp = vec3(
      vObjectPos.x * c - vObjectPos.z * s,
      vObjectPos.y,
      vObjectPos.x * s + vObjectPos.z * c
    );

    float cloud = warpedFbm(sp * 2.2 + vec3(0.0, uTime * 0.01, 0.0));
    float a = smoothstep(0.50, 0.78, cloud);
    if (a < 0.02) discard;

    // shade clouds by sun direction → bright on day side, dim shadow on night
    float lambert = dot(normalize(vNormal), normalize(uLightDir));
    float day = smoothstep(-0.15, 0.30, lambert);
    vec3 col = mix(vec3(0.20, 0.22, 0.30), vec3(1.0, 0.98, 0.96), day);

    // soft fresnel makes edge clouds glow
    float fres = pow(1.0 - max(dot(normalize(vNormal), vViewDir), 0.0), 3.0);
    col += vec3(0.5, 0.7, 1.0) * fres * 0.25 * day;

    gl_FragColor = vec4(col, a * (0.45 + day * 0.55));
  }
`;

function Earth() {
  const groupRef = useRef<THREE.Group>(null);
  const surfMat = useRef<THREE.ShaderMaterial>(null);
  const cloudMat = useRef<THREE.ShaderMaterial>(null);
  const lightDir = useMemo(
    () => new THREE.Vector3(-0.4, 0.35, 0.85).normalize(),
    [],
  );
  const surfUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uLightDir: { value: lightDir } }),
    [lightDir],
  );
  const cloudUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uLightDir: { value: lightDir } }),
    [lightDir],
  );

  useFrame((_, delta) => {
    if (surfMat.current)
      (surfMat.current.uniforms.uTime.value as number) += delta;
    if (cloudMat.current)
      (cloudMat.current.uniforms.uTime.value as number) += delta;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={groupRef} position={[8, -3.6, -7]} rotation={[0.35, 0, 0.1]}>
      {/* ── Atmosphere halo (Rayleigh-blue limb) ── */}
      <mesh scale={1.22}>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial
          color="#4d8eff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial
          color="#7eb6ff"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Planet surface ── */}
      <mesh>
        <sphereGeometry args={[2.4, 128, 128]} />
        <shaderMaterial
          ref={surfMat}
          vertexShader={earthVert}
          fragmentShader={earthFrag}
          uniforms={surfUniforms}
        />
      </mesh>

      {/* ── Cloud layer (slightly above the surface) ── */}
      <mesh>
        <sphereGeometry args={[2.43, 96, 96]} />
        <shaderMaterial
          ref={cloudMat}
          vertexShader={earthVert}
          fragmentShader={cloudFrag}
          uniforms={cloudUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ════════════════════════════ DEEP-SPACE BG ════════════════════════════ */

const plasmaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const plasmaFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  vec3 hash3(vec2 p) {
    return fract(sin(vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash3(i).x;
    float b = hash3(i + vec2(1.0, 0.0)).x;
    float c = hash3(i + vec2(0.0, 1.0)).x;
    float d = hash3(i + vec2(1.0, 1.0)).x;
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= 1.7;
    float t = uTime * 0.04;

    // Multi-octave nebula
    float n = 0.0;
    n += noise(uv * 1.4 + vec2(t, -t)) * 0.55;
    n += noise(uv * 3.0 - vec2(t * 1.4, t * 0.8)) * 0.25;
    n += noise(uv * 6.0 + vec2(-t * 1.6, t)) * 0.12;

    float d = length(uv - uMouse * 0.45);
    n += smoothstep(0.7, 0.0, d) * 0.14;

    // Real-space palette: very dark + dim nebula tints
    vec3 deepVoid = vec3(0.003, 0.004, 0.018);
    vec3 indigo   = vec3(0.030, 0.025, 0.10);
    vec3 magenta  = vec3(0.32, 0.05, 0.24);
    vec3 cyan     = vec3(0.05, 0.16, 0.38);

    vec3 col = mix(deepVoid, indigo, n);
    col = mix(col, magenta, smoothstep(0.62, 0.92, n) * 0.40);
    col = mix(col, cyan,    smoothstep(0.50, 0.82, n) * 0.28);

    float vig = smoothstep(1.4, 0.20, length(vUv - 0.5) * 1.5);
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plasma() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } }),
    [],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.uniforms.uTime.value += delta;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      uniforms.uMouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
      uniforms.uMouse.value.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [uniforms]);

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={plasmaVertex}
        fragmentShader={plasmaFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* Distant background stars — small dim points on a far sphere */
function DistantStars() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, sizes } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.cos(phi);
      positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i] = Math.random() * 1.0 + 0.25;
    }
    return { positions, sizes };
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.004;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        sizeAttenuation
        color="#cdd5ff"
        transparent
        opacity={0.78}
        depthWrite={false}
      />
    </points>
  );
}

export function CosmicBackdrop() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Dim plasma backdrop */}
      <Canvas
        className="!absolute inset-0"
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Plasma />
      </Canvas>
      {/* Galaxy + planet + far stars in one scene for proper depth ordering */}
      <Canvas
        className="!absolute inset-0"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 4, 11], fov: 55 }}
      >
        <ambientLight intensity={0.12} />
        <directionalLight position={[-3, 4, 5]} intensity={1.1} color="#fff8e7" />
        <DistantStars />
        <Galaxy />
        <Earth />
      </Canvas>
      {/* Slight darkening so foreground content stays readable */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
