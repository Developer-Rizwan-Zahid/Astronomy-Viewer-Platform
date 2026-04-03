"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Stars as DreiStars, Sphere, MeshDistortMaterial, Text, Float } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function Planet({ position, size, color, name, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(name)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.5 : 0.2} 
          roughness={0.4}
        />
      </mesh>
      
      {/* Label */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, size + 1, 0]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
          opacity={hovered ? 1 : 0.6}
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

function StarField() {
  return (
    <DreiStars 
      radius={300} 
      depth={60} 
      count={20000} 
      factor={7} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
}

export default function SkyViewer() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const planets = useMemo(() => [
    { position: [15, 0, 0], size: 2, color: "#ff9d00", name: "Sun" },
    { position: [-10, 5, -15], size: 1.2, color: "#8cfffb", name: "Uranus" },
    { position: [5, -8, -10], size: 1.5, color: "#ff6b6b", name: "Mars" },
    { position: [-20, -5, 10], size: 2.5, color: "#f7d794", name: "Jupiter" },
    { position: [10, 10, 20], size: 0.8, color: "#d1ccc0", name: "Mercury" },
  ], []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <StarField />
        
        {planets.map((planet, idx) => (
          <Planet 
            key={idx}
            {...planet}
            onClick={(name: string) => setSelectedPlanet(name)}
          />
        ))}

        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          maxDistance={100} 
          minDistance={10} 
        />
      </Canvas>

      {/* Dynamic Overlay */}
      {selectedPlanet && (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-20 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 max-w-xs space-y-4"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{selectedPlanet}</h3>
                <button onClick={() => setSelectedPlanet(null)} className="text-zinc-500 hover:text-white">×</button>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
                You are currently viewing {selectedPlanet}. It is one of the many celestial wonders in our solar system.
            </p>
            <div className="pt-4 flex gap-2">
                <Button variant="premium" size="sm" className="flex-1">Add to Favorites</Button>
                <Button variant="outline" size="sm" className="border-zinc-800">Learn More</Button>
            </div>
        </motion.div>
      )}

      {/* Navigation Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 px-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md text-indigo-400 text-sm font-medium flex items-center gap-2 animate-bounce">
        Drag to navigate • Scroll to zoom
      </div>
    </div>
  );
}

// Internal reusable components must be client-only
import { motion } from "framer-motion";
import { Button } from "./ui/button";
