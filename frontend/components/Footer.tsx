"use client";

import Link from "next/link";
import { Telescope, Code, Send, MessageSquare, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white group">
              <Telescope className="h-8 w-8 text-indigo-400 transition-transform group-hover:rotate-12" />
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                StarGuide
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Your window to the cosmos. Explore, discover, and learn about the universe with our interactive platform powered by real-time astronomical data.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink icon={Code} href="#" />
              <SocialLink icon={Send} href="#" />
              <SocialLink icon={MessageSquare} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Exploration</h4>
            <ul className="space-y-4">
              <FooterLink href="/sky">3D Sky View</FooterLink>
              <FooterLink href="/explore">Celestial Map</FooterLink>
              <FooterLink href="/favorites">Your Collection</FooterLink>
              <FooterLink href="/profile">Stargazer Profile</FooterLink>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-bold mb-6">Educational</h4>
            <ul className="space-y-4">
              <FooterLink href="#">Cosmic Events</FooterLink>
              <FooterLink href="#">Space News</FooterLink>
              <FooterLink href="#">Astrophotography</FooterLink>
              <FooterLink href="#">Research API</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold">Cosmic Briefing</h4>
            <p className="text-zinc-400 text-sm">
              Get weekly updates on meteor showers, eclipses, and cosmic discoveries.
            </p>
            <div className="relative group">
              <Input 
                className="bg-zinc-900 border-zinc-800 focus:border-indigo-500 h-11 pr-12" 
                placeholder="Email address"
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1 bottom-1 hover:bg-indigo-500/10 text-indigo-400">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs">
          <p>© 2026 StarGuide Platform. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Settings</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-zinc-400 hover:text-white transition-colors text-sm">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon: Icon, href }: { icon: any; href: string }) {
  return (
    <Link 
        href={href} 
        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}
