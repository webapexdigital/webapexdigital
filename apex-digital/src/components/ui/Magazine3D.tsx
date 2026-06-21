import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { TextureLoader, DoubleSide } from "three";
import * as THREE from "three";

const PAGE_W = 1.45;
const PAGE_H = 2.05;

const SPREADS = [
  {
    left:  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    right: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=800&q=80",
  },
  {
    left:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    right: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  },
  {
    left:  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    right: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
];

function Spread({ index }: { index: number }) {
  const s = SPREADS[index] ?? SPREADS[0];
  const [lt, rt] = useLoader(TextureLoader, [s.left, s.right]);
  lt.colorSpace = THREE.SRGBColorSpace;
  rt.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      {/* Spine */}
      <mesh>
        <boxGeometry args={[0.05, PAGE_H + 0.04, 0.06]} />
        <meshStandardMaterial color="#0d0d2b" roughness={0.8} />
      </mesh>
      {/* Left page */}
      <mesh position={[-PAGE_W / 2 - 0.025, 0, 0.03]}>
        <planeGeometry args={[PAGE_W, PAGE_H, 1, 1]} />
        <meshStandardMaterial map={lt} side={DoubleSide} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Right page */}
      <mesh position={[PAGE_W / 2 + 0.025, 0, 0.03]}>
        <planeGeometry args={[PAGE_W, PAGE_H, 1, 1]} />
        <meshStandardMaterial map={rt} side={DoubleSide} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Page edge thickness — left */}
      <mesh position={[-PAGE_W - 0.025, 0, 0.015]}>
        <boxGeometry args={[0.01, PAGE_H, 0.03]} />
        <meshStandardMaterial color="#e8e8e8" roughness={1} />
      </mesh>
      {/* Page edge thickness — right */}
      <mesh position={[PAGE_W + 0.025, 0, 0.015]}>
        <boxGeometry args={[0.01, PAGE_H, 0.03]} />
        <meshStandardMaterial color="#e8e8e8" roughness={1} />
      </mesh>
    </group>
  );
}

function Magazine({ spread }: { spread: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.07;
    groupRef.current.rotation.y = -0.25 + Math.sin(t * 0.35) * 0.07;
    groupRef.current.rotation.z = Math.sin(t * 0.28) * 0.018;
  });

  return (
    <group ref={groupRef} rotation={[0.18, 0, 0]}>
      <Suspense fallback={null}>
        <Spread index={spread} />
      </Suspense>
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial color="#0d0d2b" />
    </mesh>
  );
}

export default function Magazine3D() {
  const [spread, setSpread] = useState(0);
  const canPrev = spread > 0;
  const canNext = spread < SPREADS.length - 1;

  return (
    <div className="mt-5 rounded-2xl overflow-hidden relative" style={{ height: 480, background: "#07071a" }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        shadows={false}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <pointLight position={[-3, 2, 3]} intensity={1.2} color="#7B3CE8" />
        <pointLight position={[3, -1, 2]} intensity={0.9} color="#0099FF" />
        <pointLight position={[0, -4, 1]} intensity={0.4} color="#ffffff" />

        <Suspense fallback={<Loader />}>
          <Magazine spread={spread} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.7}
          minDistance={2.5}
          maxDistance={6}
        />
      </Canvas>

      {/* Navigation */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4 pointer-events-none">
        <button
          onClick={() => setSpread(s => s - 1)}
          disabled={!canPrev}
          className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(10px)" }}
        >
          ← Prev
        </button>

        <span className="text-white/30 text-[12px] font-medium pointer-events-none">
          {spread + 1} / {SPREADS.length}
        </span>

        <button
          onClick={() => setSpread(s => s + 1)}
          disabled={!canNext}
          className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(10px)" }}
        >
          Next →
        </button>
      </div>

      {/* Drag hint */}
      <div
        className="absolute top-4 right-4 text-[11px] font-medium text-white/35 pointer-events-none"
        style={{ backdropFilter: "blur(8px)" }}
      >
        Drag to orbit
      </div>
    </div>
  );
}
