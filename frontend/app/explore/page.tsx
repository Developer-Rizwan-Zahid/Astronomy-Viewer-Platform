"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import CelestialCard from "@/components/CelestialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Sparkles, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorePage() {
  const [objects, setObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Star", "Planet", "Constellation"];

  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    setLoading(true);
    try {
      // In a real app, we'd have a search endpoint or filter parameters
      // For now, we'll fetch all and filter client-side for better UX in this demo
      const [stars, planets, constellations] = await Promise.all([
        api.get("/astronomy/stars"),
        api.get("/astronomy/planets"),
        api.get("/astronomy/constellations"),
      ]);

      setObjects([...stars.data, ...planets.data, ...constellations.data]);
    } catch (err) {
      console.error("Failed to fetch celestial objects", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredObjects = objects.filter((obj) => {
    const matchesSearch = obj.name.toLowerCase().includes(search.toLowerCase()) || 
                         obj.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || obj.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Header & Search */}
      <div className="space-y-6 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Explore the Night Sky
        </h1>
        <p className="text-zinc-400">
          Discover thousands of celestial bodies, from distant stars to neighboring planets.
        </p>
        
        <div className="relative group max-w-xl mx-auto">
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          <Input 
            className="pl-12 h-14 bg-zinc-950 border-zinc-900 rounded-2xl focus:border-indigo-500/50 transition-all text-lg"
            placeholder="Search for stars, planets, or constellations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "premium" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter !== cat ? "border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-white" : ""}
          >
            {cat}
          </Button>
        ))}
        <div className="w-px h-6 bg-zinc-800 mx-2 hidden md:block" />
        <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white gap-2">
            <Filter className="h-4 w-4" />
            More Filters
        </Button>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
          <p className="text-zinc-500 animate-pulse">Calculating orbits and trajectories...</p>
        </div>
      ) : (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm">
                    Showing <span className="text-white font-medium">{filteredObjects.length}</span> celestial bodies
                </p>
            </div>
            
            <AnimatePresence mode="popLayout">
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredObjects.length > 0 ? (
                        filteredObjects.map((obj) => (
                            <CelestialCard 
                                key={obj.id} 
                                object={obj} 
                                onFavorite={(id) => console.log("Favorite", id)} // Integrate later
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center space-y-4 rounded-3xl bg-zinc-950/50 border border-dashed border-zinc-800">
                             <div className="p-4 rounded-full bg-zinc-900 w-fit mx-auto">
                                <Sparkles className="h-8 w-8 text-zinc-700" />
                             </div>
                             <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white">No cosmic wonders found</h3>
                                <p className="text-zinc-500">Try adjusting your search or filters to find what you're looking for.</p>
                             </div>
                             <Button variant="outline" size="sm" onClick={() => { setSearch(""); setFilter("All"); }} className="border-zinc-800 text-zinc-400">
                                Clear all filters
                             </Button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      )}
    </div>
  );
}
