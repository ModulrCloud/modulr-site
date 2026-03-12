"use client";

import { useRef, useState, useEffect, useCallback, Suspense, createContext, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

/* ════════════════════════════════════════════════════════
   ANGULAR DARK HELMET — No spheres. Sharp facets. Menacing.
   Think: Stealth fighter + Predator mask
   ════════════════════════════════════════════════════════ */

/** Shared focus state so the 3D scene knows whether to track pointer or idle-patrol */
const FocusCtx = createContext({ hovered: false, visible: false });

function AngularHelmet() {
  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const { hovered, visible } = useContext(FocusCtx);

  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    /* ── HEAD ROTATION ── */
    let targetY: number;
    let targetX: number;
    const lerpSpeed = 0.05;

    if (hovered && visible) {
      // Active tracking — follow cursor
      targetY = pointer.x * 0.5;
      targetX = -pointer.y * 0.2;
    } else if (visible) {
      // In viewport but no hover — subtle patrol scan
      targetY = Math.sin(t * 0.4) * 0.15;
      targetX = Math.sin(t * 0.25) * 0.04;
    } else {
      // Off-screen — return to neutral
      targetY = 0;
      targetX = 0;
    }

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * lerpSpeed;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * lerpSpeed;

    // Scanner flicker
    if (scanRef.current) {
      const mat = scanRef.current.material as THREE.MeshStandardMaterial;
      const flicker = Math.random() > 0.95 ? 0.3 : 1;
      mat.emissiveIntensity = (4 + Math.sin(t * 6) * 2) * flicker;
    }

    // Inner core pulse
    if (innerGlowRef.current) {
      const m = innerGlowRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;
      innerGlowRef.current.rotation.y = t * 0.3;
      innerGlowRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={groupRef} scale={1.1}>

        {/* ── MAIN SKULL — dark faceted dodecahedron ── */}
        <mesh scale={[1.15, 1.05, 0.95]} position={[0, 0.02, 0]}>
          <dodecahedronGeometry args={[0.42, 1]} />
          <meshPhysicalMaterial
            color="#111111"
            metalness={0.95}
            roughness={0.15}
            flatShading
            envMapIntensity={1.8}
          />
        </mesh>

        {/* ── OUTER ARMOR SHELL — slightly larger wireframe overlay ── */}
        <mesh scale={[1.18, 1.08, 0.98]} position={[0, 0.02, 0]}>
          <dodecahedronGeometry args={[0.42, 1]} />
          <meshPhysicalMaterial
            color="#222222"
            metalness={1}
            roughness={0}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* ── FRONT VISOR PLATE — flat dark mirror strip ── */}
        <mesh position={[0, 0.06, 0.38]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.52, 0.1, 0.03]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={4}
            reflectivity={1}
          />
        </mesh>

        {/* ── Visor top brow — angular overhang ── */}
        <mesh position={[0, 0.12, 0.36]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.56, 0.04, 0.06]} />
          <meshPhysicalMaterial
            color="#0d0d0d"
            metalness={0.95}
            roughness={0.1}
            flatShading
          />
        </mesh>

        {/* ── SCANNER LINE — razor-thin gold light ── */}
        <mesh ref={scanRef} position={[0, 0.06, 0.40]}>
          <boxGeometry args={[0.44, 0.003, 0.005]} />
          <meshStandardMaterial
            color="#f2b400"
            emissive="#f2b400"
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>

        {/* ── INNER CORE — visible through visor gap ── */}
        <mesh ref={innerGlowRef} position={[0, 0.04, 0.1]} scale={0.12}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f2b400"
            emissive="#f2b400"
            emissiveIntensity={0.4}
            wireframe
            toneMapped={false}
          />
        </mesh>

        {/* ── CHEEK ARMOR PLATES — angular, menacing ── */}
        {([-1, 1] as const).map((s) => (
          <group key={`cheek${s}`}>
            {/* Main cheek plate */}
            <mesh
              position={[s * 0.32, -0.06, 0.18]}
              rotation={[0.2, s * 0.6, s * 0.1]}
            >
              <boxGeometry args={[0.14, 0.22, 0.06]} />
              <meshPhysicalMaterial
                color="#0e0e0e"
                metalness={0.95}
                roughness={0.1}
                flatShading
              />
            </mesh>
            {/* Angular detail on cheek */}
            <mesh
              position={[s * 0.36, -0.02, 0.12]}
              rotation={[0, s * 0.4, s * 0.2]}
            >
              <boxGeometry args={[0.06, 0.14, 0.04]} />
              <meshPhysicalMaterial color="#151515" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        ))}

        {/* ── TEMPLE MODULES — tactical sensor blocks ── */}
        {([-1, 1] as const).map((s) => (
          <group key={`temple${s}`} position={[s * 0.44, 0.06, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 0.18, 0.12]} />
              <meshPhysicalMaterial
                color="#0a0a0a"
                metalness={1}
                roughness={0.05}
              />
            </mesh>
            {/* Thin gold status indicator */}
            <mesh position={[s * 0.035, 0, 0.02]}>
              <boxGeometry args={[0.003, 0.1, 0.003]} />
              <meshStandardMaterial
                color="#f2b400"
                emissive="#f2b400"
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* ── FOREHEAD RIDGE ── */}
        <mesh position={[0, 0.2, 0.25]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.1]} />
          <meshPhysicalMaterial color="#111" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* ── CHIN / MANDIBLE — angular jaw ── */}
        <mesh position={[0, -0.22, 0.22]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.12]} />
          <meshPhysicalMaterial
            color="#0c0c0c"
            metalness={0.95}
            roughness={0.1}
            flatShading
          />
        </mesh>
        {/* Jaw edge detail */}
        <mesh position={[0, -0.27, 0.2]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.18, 0.015, 0.08]} />
          <meshPhysicalMaterial color="#1a1a1a" metalness={1} roughness={0.05} />
        </mesh>

        {/* ── VENT SLITS — tactical breathing ── */}
        {[-0.03, 0, 0.03].map((off) => (
          <mesh key={off} position={[0, -0.17 + off, 0.38]}>
            <boxGeometry args={[0.12, 0.004, 0.005]} />
            <meshPhysicalMaterial color="#222" metalness={1} roughness={0} />
          </mesh>
        ))}

        {/* ── NECK — mechanical, hexagonal ── */}
        <group position={[0, -0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.17, 0.2, 6]} />
            <meshPhysicalMaterial
              color="#080808"
              metalness={1}
              roughness={0.05}
              flatShading
            />
          </mesh>
          {/* Neck ring */}
          <mesh position={[0, 0.08, 0]}>
            <torusGeometry args={[0.14, 0.006, 6, 6]} />
            <meshPhysicalMaterial color="#1a1a1a" metalness={1} roughness={0.05} flatShading />
          </mesh>
          {/* Gold accent on neck */}
          <mesh position={[0, 0.04, 0]}>
            <torusGeometry args={[0.145, 0.002, 6, 48]} />
            <meshStandardMaterial
              color="#f2b400"
              emissive="#f2b400"
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
          {/* Shoulder hints */}
          {([-1, 1] as const).map((s) => (
            <mesh key={`sh${s}`} position={[s * 0.2, -0.05, 0]} rotation={[0, 0, s * 0.4]}>
              <boxGeometry args={[0.15, 0.04, 0.1]} />
              <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.05} flatShading />
            </mesh>
          ))}
        </group>

        {/* ── CROWN DETAIL — top ridge ── */}
        <mesh position={[0, 0.35, -0.05]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.08, 0.03, 0.2]} />
          <meshPhysicalMaterial color="#0e0e0e" metalness={1} roughness={0.1} />
        </mesh>

      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[8, 10, 8]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-6, 4, 6]} intensity={1} color="#ffffff" />
      <spotLight position={[0, -5, -8]} angle={0.3} penumbra={1} intensity={2} color="#334155" />
      <pointLight position={[0, -3, 3]} intensity={0.15} color="#f2b400" />

      <AngularHelmet />
      <Environment preset="night" />
    </>
  );
}

export default function RoboticScene3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  /* IntersectionObserver — is the section on screen? */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <FocusCtx.Provider value={{ hovered, visible }}>
      <div
        ref={wrapperRef}
        style={{ width: "100%", height: "100%", minHeight: 500 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          camera={{ position: [0, 0.05, 2.6], fov: 30 }}
          gl={{ antialias: true, alpha: true, toneMappingExposure: 1.0 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </FocusCtx.Provider>
  );
}
