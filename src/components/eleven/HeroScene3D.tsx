"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────── Glass Torus Knot ─────────────────────── */
function GlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  // Track mouse
  useFrame(({ pointer }) => {
    mouseRef.current.x = pointer.x;
    mouseRef.current.y = pointer.y;

    if (meshRef.current) {
      // Gentle follow mouse
      meshRef.current.rotation.x +=
        (mouseRef.current.y * 0.3 - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.y +=
        (mouseRef.current.x * 0.4 - meshRef.current.rotation.y) * 0.02;
      // Slow auto-rotation
      meshRef.current.rotation.z += 0.003;
    }
  });

  // Scale based on viewport
  const scale = Math.min(viewport.width, viewport.height) * 0.22;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={scale}>
        <torusKnotGeometry args={[1, 0.35, 256, 64, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#e8edf5"
          roughness={0.05}
          transmission={1}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────────────── Floating particles ─────────────────────── */
function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sz[i] = Math.random() * 0.03 + 0.005;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const geom = ref.current.geometry;
    const posAttr = geom.attributes.position;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Subtle floating movement
      posAttr.array[ix + 1] += Math.sin(t * 0.3 + i) * 0.0008;
      posAttr.array[ix] += Math.cos(t * 0.2 + i * 0.5) * 0.0004;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#b4c5e0"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────── Soft ring ─────────────────────── */
function SoftRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.3;
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <mesh ref={ref} scale={2.8}>
      <torusGeometry args={[1, 0.008, 32, 128]} />
      <meshStandardMaterial color="#d0d8e8" transparent opacity={0.3} />
    </mesh>
  );
}

/* ─────────────────────── Scene ─────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#bfdbfe" />

      <GlassTorus />
      <Particles />
      <SoftRing />

      <Environment preset="city" />
    </>
  );
}

/* ─────────────────────── Exported component ─────────────────────── */
export default function HeroScene3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 500,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
