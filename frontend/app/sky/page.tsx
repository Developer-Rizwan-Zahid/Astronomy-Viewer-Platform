"use client";

import dynamic from "next/dynamic";
import { Stars, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// SkyViewer is a heavy 3D component, using dynamic import for performance
const SkyViewer = dynamic(() => import("@/components/SkyViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] space-y-4">
      <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
      <p className="text-zinc-500 animate-pulse">Initializing cosmic particles...</p>
    </div>
  ),
});

export default function SkyPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-black">
      {/* Overlay Header */}
      <div className="absolute top-20 left-8 z-10 space-y-2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-2"
        >
          <Navigation className="h-4 w-4" />
          Live Interactive Simulation
        </motion.div>
        <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white"
        >
            Interstellar Map
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 max-w-md"
        >
            Explore our solar system and beyond. Interact with celestial bodies to learn more about their position and significance.
        </motion.p>
      </div>

      {/* 3D Component */}
      <div className="flex-1 w-full bg-[#020205]">
          <SkyViewer />
      </div>

      {/* Bottom Controls Legend */}
      <div className="absolute bottom-10 right-8 z-10 flex gap-4 pointer-events-none">
          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase">
                  <Sparkles className="h-3 w-3" />
                  Simulation Settings
              </div>
              <div className="text-sm text-zinc-300">Default Perspective • High Fidelity</div>
          </div>
      </div>
    </div>
  );
}
