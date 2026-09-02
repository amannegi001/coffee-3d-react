import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Center,
  Bounds,
  ContactShadows,
  Html,
} from "@react-three/drei";

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-800 text-stone-200 shadow-xl">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium tracking-wider uppercase text-stone-400">Loading Coffee Cup...</p>
      </div>
    </Html>
  );
}

function CoffeeCup() {
  const { scene } = useGLTF("/coffee-cup.glb");

  return (
    <primitive
      object={scene}
      // Scale based on actual dimensions (raw height is ~0.126m, 15x brings it to ~1.9 Three.js units)
      scale={15}
    />
  );
}

useGLTF.preload("/coffee-cup.glb");

export default function App() {
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef();

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-stone-950 text-stone-100 flex flex-col select-none">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(120,53,15,0.18)_0%,rgba(28,25,23,0.6)_50%,rgba(12,10,9,1)_100%)]" />

      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 md:px-10 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-500/30">
            <svg
              className="w-5 h-5 text-amber-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" y1="2" x2="6" y2="4" />
              <line x1="10" y1="2" x2="10" y2="4" />
              <line x1="14" y1="2" x2="14" y2="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-stone-100">
              Coffee House
            </h1>
            <p className="text-xs text-stone-400 font-medium">3D Interactive Viewer</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              autoRotate
                ? "bg-amber-600/20 border-amber-500/50 text-amber-300"
                : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
            } backdrop-blur-md`}
          >
            {autoRotate ? "Auto-Rotate: ON" : "Auto-Rotate: OFF"}
          </button>
          <button
            onClick={handleResetView}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 backdrop-blur-md transition-all"
          >
            Reset View
          </button>
        </div>
      </header>

      {/* 3D Scene Viewport */}
      <main className="relative flex-1 w-full h-full">
        <Canvas
          shadows
          camera={{
            position: [0, 1.2, 4.2],
            fov: 42,
          }}
          className="w-full h-full"
        >
          {/* Lighting Rig */}
          {/* Ambient fill */}
          <ambientLight intensity={1.2} color="#fff7ed" />
          
          {/* Key Light (warm directional light from top right front) */}
          <directionalLight
            position={[5, 7, 5]}
            intensity={2.6}
            color="#fffbeb"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />

          {/* Fill Light (cooler, softer light from top left back) */}
          <directionalLight
            position={[-5, 4, -4]}
            intensity={1.2}
            color="#e2e8f0"
          />

          {/* Warm Rim / Bounce light */}
          <directionalLight
            position={[0, -2, 2]}
            intensity={0.6}
            color="#d97706"
          />

          {/* Hemisphere light for realistic natural ambient tint */}
          <hemisphereLight
            args={["#fed7aa", "#1c1917", 0.8]}
          />

          {/* 3D Model with auto-framing and automatic center alignment */}
          <Suspense fallback={<ModelLoader />}>
            <Bounds fit clip observe margin={1.25}>
              <Center top={false}>
                <CoffeeCup />
              </Center>
            </Bounds>

            {/* Ground Contact Shadow for grounding the 3D model */}
            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.65}
              scale={5.5}
              blur={2.4}
              far={3}
              color="#1a0e08"
            />
          </Suspense>

          {/* Camera Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={2.5}
            enableDamping
            dampingFactor={0.05}
            minDistance={1.5}
            maxDistance={9}
            maxPolarAngle={Math.PI / 2 + 0.15}
          />
        </Canvas>
      </main>

      {/* Footer Controls & Interaction Guide */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 md:px-10 pointer-events-none">
        {/* Model Spec Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/70 border border-stone-800/80 backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-stone-300 font-medium">Ceramic Coffee Cup</span>
          <span className="text-stone-600">•</span>
          <span className="text-xs text-stone-400">GLB 3D Model</span>
        </div>

        {/* Interaction Guide */}
        <div className="flex items-center gap-4 px-4 py-1.5 rounded-full bg-stone-900/70 border border-stone-800/80 backdrop-blur-md text-xs text-stone-400 pointer-events-auto">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-[10px] text-stone-300">Left Click</kbd>
            Rotate
          </span>
          <span className="text-stone-700">•</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-[10px] text-stone-300">Scroll</kbd>
            Zoom
          </span>
          <span className="text-stone-700">•</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-[10px] text-stone-300">Right Click</kbd>
            Pan
          </span>
        </div>
      </footer>
    </div>
  );
}