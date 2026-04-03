"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  const createStar = useCallback(() => {
    const id = Date.now();
    const x = Math.random() * 80 + 10; // 10% to 90%
    const y = Math.random() * 40 + 10; // 10% to 50%
    const angle = 30 + Math.random() * 20; // 30 to 50 degrees
    const scale = 0.5 + Math.random() * 1;
    
    const newStar = { id, x, y, angle, scale };
    setStars((prev) => [...prev, newStar]);

    // Cleanup star after animation
    setTimeout(() => {
        setStars((prev) => prev.filter(s => s.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 4 seconds to create a star
        createStar();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [createStar]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ 
                x: `${star.x}%`, 
                y: `${star.y}%`, 
                opacity: 0, 
                scaleX: 0,
                rotate: star.angle 
            }}
            animate={{ 
                x: `${star.x + 20}%`, 
                y: `${star.y + 20}%`, 
                opacity: [0, 1, 0.8, 0], 
                scaleX: [0, 1, 1.2, 0] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute h-[1px] w-40 bg-gradient-to-r from-transparent via-white to-transparent origin-left"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
