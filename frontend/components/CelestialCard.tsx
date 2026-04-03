"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Globe, Moon, Heart, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CelestialObject {
  id: string;
  name: string;
  type: string;
  rightAscension: string;
  declination: string;
  description?: string;
  isFavorite?: boolean;
}

interface CelestialCardProps {
  object: CelestialObject;
  onFavorite?: (id: string) => void;
}

export default function CelestialCard({ object, onFavorite }: CelestialCardProps) {
  const Icon = object.type === "Star" ? Star : object.type === "Planet" ? Globe : Moon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md hover:border-indigo-500/50 transition-colors overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 z-10">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onFavorite?.(object.id)}
            className={cn(
              "rounded-full bg-black/40 border border-white/10 hover:bg-red-500/10",
              object.isFavorite ? "text-red-500" : "text-zinc-500"
            )}
          >
            <Heart className={cn("h-5 w-5", object.isFavorite && "fill-current")} />
          </Button>
        </div>

        <CardHeader className="relative h-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900/40 via-black to-zinc-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none" />
            <Icon className="h-16 w-16 text-indigo-400/80 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)] transition-transform duration-500 group-hover:scale-110" />
        </CardHeader>
        
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">{object.name}</CardTitle>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700">
                {object.type}
            </span>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <MapPin className="h-3 w-3" />
              <span>{object.rightAscension} / {object.declination}</span>
            </div>
            {object.description && (
                <p className="text-sm text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                    {object.description}
                </p>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0">
          <Button variant="outline" className="w-full border-zinc-800 bg-transparent text-indigo-400 hover:bg-indigo-400/10 hover:text-indigo-300 gap-2 text-sm h-9">
            <Sparkles className="h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
