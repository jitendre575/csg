'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Gamepad2, MapPin, MessageSquare, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg space-y-10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <Sparkles size={14} /> Welcome Back
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
            Choose Your <br /><span className="text-primary italic">Experience</span>
          </h1>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] opacity-70">
            Select an option below to start your journey
          </p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 gap-6">
          {/* Spot Games Card */}
          <button
            onClick={() => router.push('/games')}
            className="group relative flex items-center gap-6 p-8 rounded-[2.5rem] bg-card/40 border-2 border-white/5 hover:border-primary/50 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-[0.98] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-primary/50">
              <Gamepad2 size={40} strokeWidth={2.5} />
            </div>

            <div className="relative flex-1">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                Spot Games
              </h2>
              <p className="text-muted-foreground text-sm font-medium mt-1 leading-tight">
                Play exciting spot-based games and win rewards
              </p>
            </div>

            <div className="relative opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="text-primary" size={24} />
            </div>
          </button>

          {/* Nearby Chat Card */}
          <button
            onClick={() => router.push('/nearby-chat')}
            className="group relative flex items-center gap-6 p-8 rounded-[2.5rem] bg-card/40 border-2 border-white/5 hover:border-accent/50 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 active:scale-[0.98] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-accent/50">
              <div className="relative">
                <MapPin size={32} strokeWidth={2.5} className="absolute -top-3 -left-3" />
                <MessageSquare size={32} strokeWidth={2.5} className="absolute -bottom-3 -right-3 opacity-30" />
              </div>
            </div>

            <div className="relative flex-1">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-accent transition-colors">
                Nearby Chat
              </h2>
              <p className="text-muted-foreground text-sm font-medium mt-1 leading-tight">
                Find and chat with people within 2 km of you
              </p>
            </div>

            <div className="relative opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="text-accent" size={24} />
            </div>
          </button>

          {/* User Connect Card */}
          <button
            onClick={() => router.push('/user-connect')}
            className="group relative flex items-center gap-6 p-8 rounded-[2.5rem] bg-card/40 border-2 border-white/10 hover:border-primary/50 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-[0.98] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-primary/50">
              <Sparkles size={40} strokeWidth={2.5} />
            </div>

            <div className="relative flex-1">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                User Connect
              </h2>
              <p className="text-muted-foreground text-sm font-medium mt-1 leading-tight">
                Connect and chat with users worldwide instantly
              </p>
            </div>

            <div className="relative opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="text-primary" size={24} />
            </div>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
          <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.4em] opacity-40">
            Premium Experience v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
