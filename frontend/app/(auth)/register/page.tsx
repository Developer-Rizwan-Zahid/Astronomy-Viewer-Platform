"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stars } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black -z-10" />
      
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="p-3 rounded-full bg-indigo-500/10 mb-2">
            <Stars className="w-8 h-8 text-indigo-400" />
          </div>
          <CardTitle className="text-2xl text-white">Create an account</CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Join the community of stargazers today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Name</label>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button 
                type="submit" 
                className="w-full h-11" 
                variant="premium" 
                disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
