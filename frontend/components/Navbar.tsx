"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Telescope, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Gallery", href: "/galleries" },
  { name: "Guides", href: "/guides" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/10 backdrop-blur-[20px] transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white group">
            <Telescope className="h-7 w-7 text-[#38BDF8]" />
            <span className="tracking-tight uppercase">ASTROVIEW</span>
          </Link>

          {/* Center Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all hover:text-white relative py-2",
                  pathname === item.href ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#38BDF8]" : "text-zinc-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-white/10 gap-2">
                    {user?.name}
                </Button>
            ) : (
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-white hover:text-[#38BDF8] h-10 px-4">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-gradient-to-r from-[#1E3A8A] to-[#9333EA] hover:from-[#2563eb] hover:to-[#a855f7] text-white rounded-xl px-6 h-10 border-0 shadow-lg shadow-blue-900/20">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-xl font-medium",
                pathname === item.href ? "text-white" : "text-zinc-400"
              )}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-white/5" />
          <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full border-white/10 bg-transparent text-white">Login</Button>
              <Button className="w-full bg-[#1E3A8A]">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
