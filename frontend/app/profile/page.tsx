"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, Mail, Calendar, Loader2, LogOut, Shield, MapPin, Sparkles, Stars, Telescope } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?callback=/profile");
      return;
    }
    fetchProfile();
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
          <p className="text-zinc-500">Retrieving your cosmic identity...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar info */}
            <div className="md:col-span-1 space-y-6">
                <Card className="border-zinc-800 bg-zinc-950/50 backdrop-blur-xl overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
                    <div className="relative pt-0 px-6 pb-6 text-center">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-zinc-950 border-4 border-zinc-950">
                            <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-bold text-white uppercase">
                                {profile?.name?.[0]}
                            </div>
                        </div>
                        <div className="mt-12 space-y-1">
                            <h2 className="text-2xl font-bold text-white">{profile?.name}</h2>
                            <p className="text-zinc-500 text-sm">{profile?.email}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-white">4</span>
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Favorites</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-white">12</span>
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Explored</span>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="w-full mt-8 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </Card>

                <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase">
                        <Stars className="h-4 w-4" />
                        Next Event
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-white font-medium">Lyrids Meteor Shower</h4>
                        <p className="text-zinc-400 text-xs">Peak activity in 3 days. Prepare your telescope.</p>
                    </div>
                    <Button variant="premium" size="sm" className="w-full">Remind Me</Button>
                </div>
            </div>

            {/* Main profile settings/info */}
            <div className="md:col-span-2 space-y-8">
                <Card className="border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Account Information</CardTitle>
                        <CardDescription className="text-zinc-500">Manage your cosmic identity and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <InfoItem 
                            icon={Mail} 
                            label="Email Address" 
                            value={profile?.email} 
                        />
                        <InfoItem 
                            icon={Calendar} 
                            label="Member Since" 
                            value={new Date(profile?.createdAt).toLocaleDateString()} 
                        />
                        <InfoItem 
                            icon={Shield} 
                            label="Account Type" 
                            value="Star Explorer (Pro)" 
                            highlight
                        />
                        <InfoItem 
                            icon={MapPin} 
                            label="Current Location" 
                            value="31.5204° N, 74.3587° E (Lahore)" 
                        />
                    </CardContent>
                    <CardFooter className="pt-6 border-t border-zinc-800">
                        <Button variant="premium" className="h-10">Update Profile</Button>
                        <Button variant="ghost" className="ml-2 text-zinc-400 hover:text-white">Change Password</Button>
                    </CardFooter>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AchievementCard 
                        title="Early Stargazer" 
                        icon={Sparkles} 
                        description="Joined the platform during the first lunar phase of 2026." 
                    />
                    <AchievementCard 
                        title="Planet Hopper" 
                        icon={Telescope} 
                        description="Explored every planet in the solar system." 
                    />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, highlight }: any) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-zinc-900 last:border-0 group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-indigo-500/10 transition-colors">
                    <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <span className="text-zinc-400">{label}</span>
            </div>
            <span className={highlight ? "text-indigo-400 font-bold" : "text-white font-medium"}>{value}</span>
        </div>
    );
}

function AchievementCard({ title, icon: Icon, description }: any) {
    return (
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-3">
                <Icon className="h-5 w-5 text-indigo-400" />
                <h4 className="text-white font-bold">{title}</h4>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">{description}</p>
        </div>
    );
}
