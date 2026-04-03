"use client";

import { motion } from "framer-motion";

interface Planet {
  id: number;
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
}

const planets: Planet[] = [
  { id: 1, size: 120, x: "10%", y: "20%", color: "rgba(30, 58, 138, 0.4)", duration: 25 },
  { id: 2, size: 80, x: "85%", y: "15%", color: "rgba(147, 51, 234, 0.3)", duration: 20 },
  { id: 3, size: 40, x: "70%", y: "75%", color: "rgba(56, 189, 248, 0.4)", duration: 30 },
  { id: 4, size: 60, x: "20%", y: "80%", color: "rgba(147, 51, 234, 0.2)", duration: 22 },
];

export default function FloatingPlanets() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          initial={{ x: 0, y: 0 }}
          animate={{ 
            y: [0, -40, 0, 40, 0],
            x: [0, 40, 0, -40, 0],
            rotate: [0, 360] 
          }}
          transition={{ 
            duration: planet.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            left: planet.x, 
            top: planet.y,
            width: planet.size,
            height: planet.size,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, transparent)`,
            boxShadow: `0 0 40px ${planet.color}`,
            borderRadius: "50%",
            backdropFilter: "blur(2px)",
          }}
          className="absolute"
        >
          {/* Subtle glossy highlights */}
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-white/20 blur-sm" />
        </motion.div>
      ))}
    </div>
  );
}
