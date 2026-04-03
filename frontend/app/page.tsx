"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import CelestialCard from "@/components/CelestialCard";
import ShootingStars from "@/components/ShootingStars";
import FloatingPlanets from "@/components/FloatingPlanets";
import { Telescope, Rocket, Sparkles, ArrowRight, Zap, Stars, Globe, Shield, MessageSquare, Newspaper, Map } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  
  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const translateX = useTransform(smoothX, [ -0.5, 0.5 ], [ "-2%", "2%" ]);
  const translateY = useTransform(smoothY, [ -0.5, 0.5 ], [ "-2%", "2%" ]);

  useEffect(() => {
    fetchFeatured();
    
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fetchFeatured = async () => {
    try {
      const [stars, planets] = await Promise.all([
        api.get("/astronomy/stars"),
        api.get("/astronomy/planets"),
      ]);
      setFeatured([...planets.data, ...stars.data].slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch featured objects", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#0B0F19] min-h-screen font-sans" ref={scrollRef}>
      
      {/* AstroView Centered Premium Hero */}
      <section className="relative h-screen min-h-[850px] flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Layer 1: Background Stars & Parallax */}
        <motion.div 
            style={{ 
                y: bgY,
                x: translateX,
                top: translateY
            }} 
            className="absolute inset-0 z-0"
        >
            <Image
                src="/hero-exact.png"
                alt="Cosmic Backdrop"
                fill
                priority
                className="object-cover object-center scale-110"
            />
            {/* Cosmic Glowing Blue/Purple Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/40 via-[#0B0F19]/60 to-[#9333EA]/20" />
            <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Layer 2: Floating Planets & Shooting Stars */}
        <FloatingPlanets />
        <ShootingStars />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B0F19_90%)] opacity-60" />
        </div>

        {/* Centered Content - AstroView Main Stage */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 max-w-5xl px-6 space-y-12 mb-20"
        >
          <div className="space-y-6">
            <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.95]"
            >
              Explore the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-white to-[#9333EA]">Wonders</span> <br />
              <span className="text-3xl md:text-5xl font-light tracking-wide text-white/90">of the Universe</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-300 font-light leading-relaxed drop-shadow-md"
            >
              Discover galaxies, planets, and cosmic mysteries with stunning visuals and real-time space data.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <Link href="/explore">
              <Button className="h-16 px-12 text-xl font-bold rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#1E3A8A] text-white border-0 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all transform hover:scale-110 active:scale-95">
                Explore Now
              </Button>
            </Link>
            <Link href="/galleries">
              <Button variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-2xl">
                View Galleries
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Grid - Centered Glassmorphic Cards */}
        <div className="absolute bottom-0 left-0 right-0 z-40 px-6 max-w-6xl mx-auto hidden lg:block">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1.2 }}
                className="grid grid-cols-3 gap-8"
            >
                <Glasscard icon={Telescope} title="Astrophotography Tips" />
                <Glasscard icon={Newspaper} title="Space News" />
                <Glasscard icon={Zap} title="Stargazing Guides" />
            </motion.div>
        </div>
      </section>

      {/* Main Flow Continues */}
      <div className="bg-[#0B0F19] relative z-30">
          
          <section className="container mx-auto px-6 py-40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <FeatureItem 
                    icon={Map} 
                    title="3D Sky Engine" 
                    text="Immersive real-time celestial navigator with 2 million+ mapped star objects." 
                  />
                  <FeatureItem 
                    icon={Globe} 
                    title="Live Tracking" 
                    text="Synchronized with global observation nodes for millisecond coordinate accuracy." 
                  />
                  <FeatureItem 
                    icon={Shield} 
                    title="Expert Insights" 
                    text="Verified archival data and research-grade metadata for every stellar discovery." 
                  />
              </div>
          </section>

          <section className="container mx-auto px-6 py-20 space-y-20">
                <div className="flex flex-col md:flex-row items-end justify-between gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#38BDF8] font-black text-sm uppercase tracking-[0.3em]">
                            <Sparkles className="h-5 w-5" />
                            Discoveries
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">Astronomy <br /> Picks</h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 rounded-[50px] bg-white/5 border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {featured.map((obj, idx) => (
                            <motion.div
                                key={obj.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CelestialCard object={obj} />
                            </motion.div>
                        ))}
                    </div>
                )}
          </section>

          <section className="py-40 bg-[#0B0F19] border-y border-white/5">
              <div className="container mx-auto px-6 space-y-20">
                  <div className="max-w-2xl space-y-6">
                      <div className="flex items-center gap-2 text-[#38BDF8] font-bold uppercase tracking-widest text-xs">
                          <Newspaper className="h-4 w-4" />
                          Deep Space Transmission
                      </div>
                      <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase">Space Chronicles</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                      <NewsCard 
                        image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2072&auto=format&fit=crop"
                        title="New Exoplanet Discovered in Alpha Centauri"
                        date="July 12, 2026"
                      />
                      <div className="space-y-12">
                          <NewsCardSmall 
                            title="Mars Rover Updates: New Evidence of Water"
                            date="July 10, 2026"
                          />
                          <NewsCardSmall 
                            title="Solar Cycle 25: Maximum Intensity Expected"
                            date="July 08, 2026"
                          />
                          <NewsCardSmall 
                            title="James Webb captures stunning Pillar details"
                            date="July 05, 2026"
                          />
                      </div>
                  </div>
              </div>
          </section>

          <section className="pb-40 container mx-auto px-6 pt-40">
              <div className="rounded-[80px] bg-gradient-to-br from-[#1E3A8A]/40 to-[#0B0F19] border border-white/10 p-16 md:p-32 text-center space-y-12 relative overflow-hidden group shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#38BDF8_0%,_transparent_10%)] -z-10 group-hover:scale-[10] transition-transform duration-[4000ms] opacity-10" />
                  <h2 className="text-6xl md:text-[10rem] font-black text-white tracking-tighter leading-none">JOIN NOW.</h2>
                  <p className="text-zinc-400 text-2xl max-w-2xl mx-auto font-light">Join the AstroView network and unlock advanced astronomical features.</p>
                  <div className="flex flex-wrap items-center justify-center gap-10 pt-10">
                      <Link href="/register">
                          <Button className="h-20 px-16 text-2xl rounded-[30px] bg-gradient-to-r from-[#1E3A8A] to-[#9333EA] hover:scale-105 transition-all text-white font-black border-0 shadow-2xl">
                              GET STARTED
                          </Button>
                      </Link>
                  </div>
              </div>
          </section>
      </div>
    </div>
  );
}

function Glasscard({ icon: Icon, title }: any) {
    return (
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center gap-4 transition-all hover:bg-white/10 group cursor-pointer shadow-xl">
             <div className="p-3 rounded-2xl bg-[#38BDF8]/10 group-hover:bg-[#38BDF8]/20 transition-colors">
                <Icon className="h-7 w-7 text-[#38BDF8]" />
             </div>
             <span className="text-white font-bold tracking-tight text-lg">{title}</span>
        </div>
    );
}

function FeatureItem({ icon: Icon, title, text }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 p-10 rounded-[40px] bg-white/5 border border-white/5 hover:border-[#38BDF8]/30 transition-all group"
        >
            <div className="p-5 w-fit rounded-3xl bg-[#0B0F19] group-hover:bg-[#38BDF8]/10 transition-all border border-white/5 shadow-xl">
                <Icon className="h-10 w-10 text-[#38BDF8]" />
            </div>
            <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none">{title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light text-lg">{text}</p>
            </div>
        </motion.div>
    );
}

function NewsCard({ image, title, date }: any) {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group relative aspect-[4/5] rounded-[50px] overflow-hidden border border-white/5 cursor-pointer shadow-2xl"
        >
            <Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest">{date}</span>
                <h3 className="text-3xl font-bold text-white leading-tight">{title}</h3>
            </div>
        </motion.div>
    );
}

function NewsCardSmall({ title, date }: any) {
    return (
        <motion.div 
            whileHover={{ x: 10 }}
            className="group flex gap-8 items-center cursor-pointer p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-[#38BDF8]/30 transition-all"
        >
            <div className="flex-1 space-y-2">
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">{date}</span>
                <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-[#38BDF8] transition-colors">{title}</h3>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[#38BDF8]/20 transition-colors">
                <ArrowRight className="h-6 w-6 text-white" />
            </div>
        </motion.div>
    );
}
