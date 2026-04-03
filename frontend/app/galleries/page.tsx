"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Download, Share2, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    id: 1,
    title: "Orion's Birth",
    category: "Nebula",
    src: "/gallery/nebula.png",
    description: "A colossal nursery of stars, glowing with the heat of newborn suns.",
  },
  {
    id: 2,
    title: "Andromeda's Core",
    category: "Galaxy",
    src: "/gallery/galaxy.png",
    description: "The bright, dense heart of our nearest galactic neighbor.",
  },
  {
    id: 3,
    title: "Icy Horizons",
    category: "Planetary",
    src: "/gallery/saturn.png",
    description: "Close-up detail of Saturn's rings, composed of trillions of icy fragments.",
  },
  {
    id: 4,
    title: "The Abyss",
    category: "Deep Space",
    src: "/gallery/blackhole.png",
    description: "A supermassive black hole twisting the very fabric of space-time.",
  },
];

export default function GalleriesPage() {
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Nebula", "Galaxy", "Planetary", "Deep Space"];
  const filtered = filter === "All" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="container mx-auto px-6 py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            Visual Archives
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Cosmic Galleries</h1>
        <p className="text-zinc-400 text-xl font-light">
          A curated collection of the most stunning astronomical phenomena captured by our global network of telescopes.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "premium" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter !== cat ? "border-white/5 bg-white/5 text-zinc-400 hover:text-white" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group relative aspect-[16/10] overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5 cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Maximize2 className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-7xl aspect-[16/10] md:aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                className="object-contain bg-zinc-950"
              />
              
              {/* Controls */}
              <div className="absolute top-8 right-8 flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full bg-black/40 border-white/10 text-white hover:bg-white/10">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-black/40 border-white/10 text-white hover:bg-white/10">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-black/40 border-white/10 text-white hover:bg-white/10" onClick={() => setSelected(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/60 to-transparent">
                  <div className="max-w-2xl space-y-4">
                      <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">{selected.category}</span>
                      <h2 className="text-4xl md:text-5xl font-black text-white">{selected.title}</h2>
                      <p className="text-zinc-300 text-lg font-light leading-relaxed">{selected.description}</p>
                      <div className="flex items-center gap-4 pt-4">
                          <Button variant="premium" className="h-12 px-8 rounded-xl gap-2">
                             <Download className="h-5 w-5" />
                             Download High-Res
                          </Button>
                          <Button variant="ghost" className="text-white">View Full Metadata</Button>
                      </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
