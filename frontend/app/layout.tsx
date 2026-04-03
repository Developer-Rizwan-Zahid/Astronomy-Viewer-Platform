import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StarBackground from "@/components/StarBackground";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AstroView | Explore the Universe",
  description: "Your interactive portal to the stars, planets, and constellations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black min-h-screen text-white antialiased selection:bg-indigo-500/30`}>
        <Navbar />
        <StarBackground />
        <main className="pt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
