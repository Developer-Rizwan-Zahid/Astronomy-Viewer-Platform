"use client";

import { motion } from "framer-motion";
import { Telescope, Users, Globe, Shield, Zap, Sparkles, Heart, Target, Compass } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20 space-y-32 mb-32">
      {/* Header & Mission */}
      <section className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              The Mission
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">THE COSMOS <br /> WITHIN REACH.</h1>
          <p className="text-zinc-400 text-2xl font-light leading-relaxed">
            Founded in 2026, StarKeeper was born from a simple yet profound realization: the universe belongs to everyone. Our mission is to bridge the gap between high-level astronomical data and curiosity-driven explorers worldwide.
          </p>
          <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">2.5M+</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Data Points</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">48</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Global Nodes</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white">100k+</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Active Explorers</span>
              </div>
          </div>
        </div>

        <div className="relative aspect-square rounded-[60px] overflow-hidden border border-white/10 group shadow-2xl">
            <Image 
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"
                alt="Earth from Space"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 p-4 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl flex items-center gap-3">
                <Globe className="h-6 w-6 text-blue-500" />
                <span className="text-white text-sm font-medium">Real-time Earth Rotation Sync</span>
            </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="grid md:grid-cols-3 gap-10">
          <PhilosophyCard 
            icon={Target} 
            title="Precision" 
            text="Every coordinate is verified against the Global Astronomy Network with millisecond precision." 
          />
          <PhilosophyCard 
            icon={Heart} 
            title="Accessibility" 
            text="Designed to be simple enough for a first-time stargazer, yet powerful enough for researcher use." 
          />
          <PhilosophyCard 
            icon={Compass} 
            title="Open Science" 
            text="We believe in the democratization of space data, supporting thousands of open-source research projects." 
          />
      </section>

      {/* The Experience Section */}
      <section className="rounded-[60px] bg-zinc-950/40 border border-white/10 p-12 md:p-24 relative overflow-hidden backdrop-blur-3xl group">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] -z-10 group-hover:bg-blue-600/10 transition-colors duration-1000" />
          <div className="max-w-4xl space-y-12 relative z-10">
              <div className="p-5 w-fit rounded-[30px] bg-white/5 border border-white/10">
                  <Rocket className="h-12 w-12 text-blue-500" />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">A Journey Without End.</h2>
              <p className="text-zinc-400 text-2xl font-light leading-relaxed">
                  Whether you're tracking the Lyrids meteor shower or exploring the event horizon of a distant black hole, StarKeeper provides the high-fidelity 3D interface you need to connect with the cosmos.
              </p>
              <div className="grid sm:grid-cols-2 gap-10 pt-10">
                  <div className="space-y-4">
                      <h4 className="text-white font-bold text-xl flex items-center gap-2">
                          <Zap className="h-5 w-5 text-blue-500" />
                          Performance First
                      </h4>
                      <p className="text-zinc-500 leading-relaxed font-light">Custom 3D rendering engine optimized for 60fps across all devices, even on mobile.</p>
                  </div>
                  <div className="space-y-4">
                      <h4 className="text-white font-bold text-xl flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-500" />
                          Collective Knowledge
                      </h4>
                      <p className="text-zinc-500 leading-relaxed font-light">Join a network of stargazers and researchers sharing live observation data.</p>
                  </div>
              </div>
              <div className="pt-10">
                  <Button variant="premium" size="lg" className="h-16 px-12 text-xl rounded-[25px]">Join the Network Today</Button>
              </div>
          </div>
      </section>

      {/* Footer Branding */}
      <div className="text-center space-y-4 border-t border-white/5 pt-32">
          <div className="flex items-center justify-center gap-2 text-white/50 text-2xl font-bold font-mono tracking-widest">
              <Telescope className="h-8 w-8" />
              STARKEEPER PLATFORM
          </div>
          <p className="text-zinc-600 text-xs italic">Version 2.0.4 • 2026 Epoch Relay Active</p>
      </div>
    </div>
  );
}

function PhilosophyCard({ icon: Icon, title, text }: any) {
    return (
        <div className="p-10 rounded-[40px] bg-zinc-950/20 border border-white/5 space-y-8 hover:border-blue-500/40 transition-all group backdrop-blur-md">
            <div className="p-4 w-fit rounded-2xl bg-zinc-900 group-hover:bg-blue-500/10 transition-colors shadow-inner border border-white/5">
                <Icon className="h-8 w-8 text-blue-400" />
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light text-lg">{text}</p>
            </div>
        </div>
    );
}

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
