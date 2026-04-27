import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const HOLO_BRIGHT = "#9be8ff";
const HOLO = "#5ac8fa";

const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  uniform float uFillY;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uColorBright;
  void main() {
    float visible = step(vWorldPos.y, uFillY);
    if (visible < 0.5) discard;
    // Fresnel rim
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    // Vertical scanlines
    float scan = 0.5 + 0.5 * sin(vWorldPos.y * 14.0 - uTime * 1.6);
    scan = pow(scan, 4.0);
    vec3 base = mix(uColor, uColorBright, fres * 0.9);
    base += scan * 0.35;
    float edgeBoost = smoothstep(0.0, 0.18, uFillY - vWorldPos.y);
    edgeBoost = 1.0 - edgeBoost;
    base += edgeBoost * 1.2;
    float alpha = 0.55 + fres * 0.4;
    gl_FragColor = vec4(base, alpha);
  }
`;

function useHoloMaterial() {
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uFillY: { value: -2.5 },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(HOLO) },
          uColorBright: { value: new THREE.Color(HOLO_BRIGHT) },
        },
      }),
    []
  );
}

function HumanoidBody({ fillY }: { fillY: number }) {
  const material = useHoloMaterial();
  const wireMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: HOLO,
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uFillY.value = fillY;
  });

  // Build a rig out of primitive parts (offset Y values describe world-space positions in [-2.5, 2.5])
  const parts: Array<{
    geom: THREE.BufferGeometry;
    position: [number, number, number];
    rotation?: [number, number, number];
  }> = useMemo(() => {
    const head = new THREE.SphereGeometry(0.55, 32, 32);
    const torsoTop = new THREE.SphereGeometry(0.7, 24, 24);
    const torso = new THREE.CylinderGeometry(0.6, 0.55, 1.1, 24, 1, true);
    const hip = new THREE.SphereGeometry(0.62, 24, 24);
    const armUpper = new THREE.CapsuleGeometry(0.18, 0.7, 8, 16);
    const armLower = new THREE.CapsuleGeometry(0.16, 0.7, 8, 16);
    const hand = new THREE.SphereGeometry(0.2, 16, 16);
    const legUpper = new THREE.CapsuleGeometry(0.24, 0.85, 8, 16);
    const legLower = new THREE.CapsuleGeometry(0.22, 0.8, 8, 16);
    const foot = new THREE.BoxGeometry(0.4, 0.18, 0.55);
    const neck = new THREE.CylinderGeometry(0.18, 0.18, 0.18, 12);

    return [
      // Head
      { geom: head, position: [0, 1.85, 0] },
      // Neck
      { geom: neck, position: [0, 1.42, 0] },
      // Shoulders / chest top
      { geom: torsoTop, position: [0, 0.95, 0] },
      // Torso barrel
      { geom: torso, position: [0, 0.35, 0] },
      // Hips
      { geom: hip, position: [0, -0.18, 0] },
      // Left arm (from viewer's POV, character right-side = x>0 mirror)
      { geom: armUpper, position: [-0.85, 0.7, 0], rotation: [0, 0, 0.18] },
      { geom: armLower, position: [-0.95, 0.0, 0], rotation: [0, 0, 0.05] },
      { geom: hand, position: [-1.0, -0.4, 0] },
      // Right arm
      { geom: armUpper, position: [0.85, 0.7, 0], rotation: [0, 0, -0.18] },
      { geom: armLower, position: [0.95, 0.0, 0], rotation: [0, 0, -0.05] },
      { geom: hand, position: [1.0, -0.4, 0] },
      // Left leg
      { geom: legUpper, position: [-0.32, -0.9, 0] },
      { geom: legLower, position: [-0.32, -1.7, 0] },
      { geom: foot, position: [-0.32, -2.2, 0.08] },
      // Right leg
      { geom: legUpper, position: [0.32, -0.9, 0] },
      { geom: legLower, position: [0.32, -1.7, 0] },
      { geom: foot, position: [0.32, -2.2, 0.08] },
    ];
  }, []);

  return (
    <group>
      {parts.map((p, i) => {
        const edges = new THREE.EdgesGeometry(p.geom, 18);
        return (
          <group key={i} position={p.position} rotation={p.rotation ?? [0, 0, 0]}>
            <mesh geometry={p.geom} material={material} />
            <lineSegments geometry={edges} material={wireMat} />
          </group>
        );
      })}
    </group>
  );
}

function HoloPlatform({ pulse }: { pulse: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.elapsedTime * 0.4;
      const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.04;
      ringRef.current.scale.set(s, 1, s);
    }
  });
  return (
    <group position={[0, -2.45, 0]}>
      {/* Disc */}
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.5, 1.9, 64]} />
        <meshBasicMaterial color={HOLO} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.04}>
        <ringGeometry args={[1.05, 1.5, 64]} />
        <meshBasicMaterial color={HOLO_BRIGHT} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner glow disc */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.06}>
        <circleGeometry args={[1.0, 64]} />
        <meshBasicMaterial color={HOLO_BRIGHT} transparent opacity={0.18 + pulse * 0.1} />
      </mesh>
      {/* Tick marks (segmented ring) */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.08} ref={ringRef}>
        <ringGeometry args={[1.95, 2.05, 64, 1, 0, Math.PI * 1.6]} />
        <meshBasicMaterial color={HOLO_BRIGHT} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Light cone above disc */}
      <mesh position-y={1.6} rotation-x={Math.PI}>
        <coneGeometry args={[1.4, 3.6, 32, 1, true]} />
        <meshBasicMaterial color={HOLO} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloorGrid() {
  // Receding perspective grid
  return (
    <gridHelper
      args={[40, 40, HOLO_BRIGHT, HOLO]}
      position={[0, -2.5, 0]}
      rotation={[0, 0, 0]}
    >
      {/* drei <gridHelper> doesn't accept material props directly; we set via prop on the helper */}
    </gridHelper>
  );
}

type Props = { progress: number };

export function HoloFigure3D({ progress }: Props) {
  // Map progress 0..1 to fill Y from below feet (-2.5) to above head (2.5)
  const fillY = -2.5 + Math.min(Math.max(progress, 0), 1) * 5.0;

  return (
    <div className="relative h-[640px] w-full max-w-[640px]">
      <Canvas
        camera={{ position: [0, 0.6, 6.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent" as unknown as THREE.ColorRepresentation]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 4, 4]} intensity={0.6} color={HOLO_BRIGHT} />
        <Stars radius={40} depth={20} count={500} factor={3} fade speed={0.5} />
        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.18}>
          <HumanoidBody fillY={fillY} />
        </Float>
        <HoloPlatform pulse={progress} />
        <FloorGrid />
      </Canvas>
    </div>
  );
}
