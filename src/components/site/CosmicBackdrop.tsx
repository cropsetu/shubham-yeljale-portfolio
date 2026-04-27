import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ----------------------------- Galaxy ----------------------------- */
function Galaxy() {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const blue = new THREE.Color("#3b82f6");
    const magenta = new THREE.Color("#e91e63");
    const white = new THREE.Color("#e0d4ff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.5) * 12;
      const branch = (i % 4) * ((Math.PI * 2) / 4);
      const spin = radius * 0.6;
      const randX = (Math.random() - 0.5) * 0.6 * radius * 0.3;
      const randY = (Math.random() - 0.5) * 0.4;
      const randZ = (Math.random() - 0.5) * 0.6 * radius * 0.3;

      positions[i3] = Math.cos(branch + spin) * radius + randX;
      positions[i3 + 1] = randY;
      positions[i3 + 2] = Math.sin(branch + spin) * radius + randZ;

      const mix = radius / 12;
      const c = new THREE.Color().lerpColors(magenta, blue, mix);
      if (Math.random() > 0.85) c.lerp(white, 0.6);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 2 + 0.4;
    }
    return { positions, colors, sizes };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    const targetX = mouse.current.y * 0.15;
    const targetZ = mouse.current.x * 0.15;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z += (targetZ - ref.current.rotation.z) * 0.04;

    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    state.camera.position.z = 8 + scroll * 2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------- Realistic Earth-like Planet --------------------- */
const planetVertex = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const planetFragment = /* glsl */ `
  precision highp float;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform vec3 uLightDir;

  // hash + simplex-ish noise
  vec3 hash3(vec3 p) {
    return fract(sin(vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    )) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float n =
      mix(mix(mix(hash3(i+vec3(0,0,0)).x, hash3(i+vec3(1,0,0)).x, f.x),
              mix(hash3(i+vec3(0,1,0)).x, hash3(i+vec3(1,1,0)).x, f.x), f.y),
          mix(mix(hash3(i+vec3(0,0,1)).x, hash3(i+vec3(1,0,1)).x, f.x),
              mix(hash3(i+vec3(0,1,1)).x, hash3(i+vec3(1,1,1)).x, f.x), f.y), f.z);
    return n;
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 n = normalize(vNormal);

    // Slowly rotate the surface in shader so the planet "spins"
    float rot = uTime * 0.03;
    float c = cos(rot), s = sin(rot);
    vec3 surfaceP = vec3(
      vWorldPos.x * c - vWorldPos.z * s,
      vWorldPos.y,
      vWorldPos.x * s + vWorldPos.z * c
    );

    float landNoise = fbm(surfaceP * 1.3);
    float continent = smoothstep(0.50, 0.62, landNoise);

    // Ocean palette (deep blue → tropical teal at equator)
    float lat = abs(n.y);
    vec3 oceanDeep = vec3(0.02, 0.05, 0.18);
    vec3 oceanShallow = vec3(0.05, 0.30, 0.55);
    vec3 ocean = mix(oceanShallow, oceanDeep, lat);

    // Land palette (greens → arid browns)
    vec3 forest = vec3(0.08, 0.30, 0.14);
    vec3 desert = vec3(0.45, 0.34, 0.20);
    vec3 land = mix(forest, desert, smoothstep(0.55, 0.78, landNoise));

    vec3 surface = mix(ocean, land, continent);

    // Polar ice caps
    float ice = smoothstep(0.78, 0.95, lat);
    surface = mix(surface, vec3(0.92, 0.96, 1.0), ice);

    // Cloud layer (subtle, parallax)
    float cloud = fbm(surfaceP * 1.8 + vec3(uTime * 0.02, 0.0, 0.0));
    cloud = smoothstep(0.55, 0.78, cloud) * 0.55;
    surface = mix(surface, vec3(0.95, 0.96, 1.0), cloud);

    // Day/night terminator
    vec3 L = normalize(uLightDir);
    float lambert = dot(n, L);
    float dayMix = smoothstep(-0.15, 0.25, lambert);
    vec3 night = surface * 0.05;
    // Tiny city-light dots on the night side, on land
    float cityNoise = fbm(surfaceP * 22.0);
    float cities = smoothstep(0.78, 0.92, cityNoise) * (1.0 - dayMix) * continent;
    night += cities * vec3(1.0, 0.7, 0.35) * 1.2;

    vec3 color = mix(night, surface, dayMix);

    // Atmosphere rim (Fresnel — blue glow at the limb, brighter on day side)
    float fres = pow(1.0 - max(dot(n, vViewDir), 0.0), 2.5);
    vec3 atmos = vec3(0.30, 0.55, 0.95) * fres;
    color += atmos * (0.55 + dayMix * 0.7);

    // Subtle specular hotspot on water
    vec3 H = normalize(L + vViewDir);
    float spec = pow(max(dot(n, H), 0.0), 60.0) * (1.0 - continent) * dayMix;
    color += vec3(0.9, 0.95, 1.0) * spec * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function Planet() {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLightDir: { value: new THREE.Vector3(-0.4, 0.4, 0.9).normalize() },
    }),
    []
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      (matRef.current.uniforms.uTime.value as number) += delta;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  // Position the planet bottom-right — out of content's way, anchors the scene
  return (
    <group position={[7.5, -4.0, -6]} ref={groupRef}>
      {/* Outer atmosphere halo */}
      <mesh scale={1.18}>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial color="#5a9bff" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[2.4, 48, 48]} />
        <meshBasicMaterial color="#7eb6ff" transparent opacity={0.10} side={THREE.BackSide} />
      </mesh>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[2.4, 96, 96]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={planetVertex}
          fragmentShader={planetFragment}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

/* --------------------- Plasma background (toned down) --------------------- */
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
    vec2 i = floor(p);
    vec2 f = fract(p);
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
    float t = uTime * 0.05;

    float n = 0.0;
    n += noise(uv * 1.6 + vec2(t, -t)) * 0.55;
    n += noise(uv * 3.5 - vec2(t * 1.4, t * 0.8)) * 0.25;
    n += noise(uv * 7.0 + vec2(-t * 1.8, t)) * 0.12;

    float d = length(uv - uMouse * 0.5);
    n += smoothstep(0.7, 0.0, d) * 0.18;

    // Real-space palette — mostly very dark, occasional dim nebulae
    vec3 deepVoid = vec3(0.005, 0.008, 0.025);
    vec3 indigo   = vec3(0.04, 0.03, 0.10);
    vec3 magenta  = vec3(0.42, 0.06, 0.30);
    vec3 cyan     = vec3(0.08, 0.20, 0.45);

    vec3 col = mix(deepVoid, indigo, n);
    col = mix(col, magenta, smoothstep(0.62, 0.92, n) * 0.45);
    col = mix(col, cyan,    smoothstep(0.50, 0.82, n) * 0.30);

    // Strong vignette (real space is darker at the edges of vision)
    float vig = smoothstep(1.4, 0.25, length(vUv - 0.5) * 1.5);
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plasma() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } }),
    []
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

/* --------------------- Distant background stars --------------------- */
function DistantStars() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, sizes } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute on a far sphere shell
      const r = 60 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.cos(phi);
      positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i] = Math.random() * 1.2 + 0.3;
    }
    return { positions, sizes };
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        sizeAttenuation
        color="#cfd8ff"
        transparent
        opacity={0.85}
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
        camera={{ position: [0, 2, 8], fov: 60 }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[-3, 4, 5]} intensity={1.0} color="#fff8e7" />
        <DistantStars />
        <Galaxy />
        <Planet />
      </Canvas>
      {/* Slight darkening so foreground content stays readable */}
      <div className="absolute inset-0 bg-background/35" />
    </div>
  );
}
