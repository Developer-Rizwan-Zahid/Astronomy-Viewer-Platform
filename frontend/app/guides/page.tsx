"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Telescope, Moon, ArrowRight, Shield, Zap, Sparkles, MapPin, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";

const guides = [
  {
    id: 1,
    title: "Celestial Navigation",
    subtitle: "A Complete Guide for Stargazers",
    description: "Learn the fundamentals of finding your way through the night sky using only the stars and constellations.",
    icon: MapPin,
    category: "Basics",
    time: "15 min read",
  },
  {
    id: 2,
    title: "Astro-Photography",
    subtitle: "Capturing the Milky Way with Precision",
    description: "Our comprehensive guide to the gear, settings, and techniques needed to capture stunning images of the galaxy.",
    icon: Telescope,
    category: "Intermediate",
    time: "25 min read",
  },
  {
    id: 3,
    title: "Space Exploration",
    subtitle: "The History and Future of Space Travel",
    description: "From the Apollo missions to Mars exploration, discover how we've explored the universe and what's next.",
    icon: Rocket,
    category: "Educational",
    time: "20 min read",
  },
  {
    id: 4,
    title: "Stargazing Tools",
    subtitle: "The Ultimate Telescope Buying Guide",
    description: "Discover the best telescopes for beginners and professionals, and how to choose the right one for you.",
    icon: Telescope,
    category: "Tools",
    time: "10 min read",
  },
];

function Rocket(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  );
}

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-6 py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            Learning Archives
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">Astro Guides</h1>
        <p className="text-zinc-400 text-xl font-light">
          Master the art of stargazing and celestial navigation with our curated expert guides and tutorials.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {guides.map((guide, idx) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group p-10 rounded-[40px] bg-zinc-950 border border-white/5 hover:border-blue-500/30 transition-all space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors" />
            
            <div className="flex items-start justify-between">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all shadow-inner">
                    <guide.icon className="h-10 w-10 text-white group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                        {guide.category}
                    </span>
                    <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
                       {guide.time}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">{guide.title}</h2>
              <h3 className="text-xl text-zinc-400 font-light">{guide.subtitle}</h3>
              <p className="text-base text-zinc-500 leading-relaxed max-w-sm">
                {guide.description}
              </p>
            </div>

            <Button variant="ghost" size="lg" className="p-0 text-white hover:text-blue-400 hover:bg-transparent gap-2 h-auto text-lg group/btn font-bold">
                Access Full Guide <ArrowRight className="h-6 w-6 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Trust Components */}
      <section className="grid md:grid-cols-3 gap-8 pt-10">
          <TrustCard icon={Shield} title="Peer-Reviewed" text="All celestial content is verified by professional astronomers." />
          <TrustCard icon={Zap} title="Live Recalibration" text="Guides are updated monthly with the latest observational data." />
          <TrustCard icon={Stars} title="Community Insights" text="Contribution from thousands of stargazers worldwide." />
      </section>
    </div>
  );
}

function TrustCard({ icon: Icon, title, text }: any) {
    return (
        <div className="p-10 rounded-[40px] bg-zinc-950/20 border border-white/5 space-y-6 hover:border-blue-500/40 transition-all group backdrop-blur-md">
            <div className="p-4 w-fit rounded-2xl bg-zinc-900/50 group-hover:bg-blue-500/20 transition-colors shadow-inner">
                <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">{text}</p>
        </div>
    );
}
