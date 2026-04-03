"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import CelestialCard from "@/components/CelestialCard";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?callback=/favorites");
      return;
    }
    fetchFavorites();
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data.map((obj: any) => ({ ...obj, isFavorite: true })));
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
            <Heart className="h-4 w-4 fill-current" />
            Your Private Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Favorite Wonders
          </h1>
          <p className="text-zinc-400 max-w-xl">
            A curated list of your most beloved celestial bodies. Access them anytime to track their position and learn more.
          </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
          <p className="text-zinc-500">Retrieving your collection...</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {favorites.length > 0 ? (
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {favorites.map((obj) => (
                    <CelestialCard 
                        key={obj.id} 
                        object={obj} 
                        onFavorite={handleRemoveFavorite}
                    />
                ))}
            </motion.div>
          ) : (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 text-center space-y-6 rounded-3xl bg-zinc-950/50 border border-dashed border-zinc-800"
            >
                <div className="p-6 rounded-full bg-zinc-900 w-fit mx-auto">
                    <Heart className="h-12 w-12 text-zinc-700" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Your collection is empty</h3>
                    <p className="text-zinc-500 max-w-md mx-auto">
                        Start exploring the universe and click the heart icon on any celestial body to save it here.
                    </p>
                </div>
                <Link href="/explore">
                    <Button variant="premium" size="lg" className="gap-2">
                        <Search className="h-5 w-5" />
                        Explore the Stars
                    </Button>
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Stats Overlay */}
      {favorites.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
              <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Saved Objects</span>
                  <span className="text-xl font-bold text-white">{favorites.length}</span>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <Button variant="premium" size="sm" className="h-9 px-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Compare All
              </Button>
          </div>
      )}
    </div>
  );
}
