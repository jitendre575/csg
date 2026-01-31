'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGame, games } from '../game-context';
import { CalendarHeader } from '../calendar-header';
import { ArrowLeft, Coins, Plus, Minus, Trophy, Clock, Shield, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { DiceDuelGame } from '../dice-duel-game';
import { DiceArenaProGame } from '../dice-arena-pro-game';

export default function GameDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const game = games.find((g) => g.id === id);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState(500);

    if (!game) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;

    // Render Dice Arena Pro
    if (id === 'dice-arena-pro') {
        return (
            <div className="flex flex-col min-h-screen bg-background pb-20">
                <CalendarHeader />
                <main className="p-4 sm:p-6 space-y-8 max-w-4xl mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="p-3 bg-card border border-border rounded-2xl hover:bg-secondary/80 transition-all active:scale-90"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                            <Trophy size={16} className="text-accent" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] leading-none">Pro High Roller Arena</span>
                        </div>
                    </div>
                    <DiceArenaProGame />

                    {/* Rules Section */}
                    <div className="space-y-4 pt-4 max-w-3xl mx-auto w-full">
                        <div className="flex items-center gap-2 text-white">
                            <Shield size={20} className="text-primary/50" />
                            <h2 className="text-lg font-black uppercase tracking-tighter italic">Rules & Regulations</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {game.rulesList.map((rule, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm space-y-1">
                                    <h3 className="text-xs font-black text-accent uppercase tracking-widest">{rule.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Render Dice Duel
    if (id === 'dice-duel') {
        return (
            <div className="flex flex-col min-h-screen bg-background pb-20">
                <CalendarHeader />
                <main className="p-4 sm:p-6 space-y-8 max-w-2xl mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="p-3 bg-card border border-border rounded-2xl hover:bg-secondary/80 transition-all active:scale-90"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                            <Trophy size={16} className="text-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">Instant Win Game</span>
                        </div>
                    </div>
                    <DiceDuelGame />

                    {/* Rules Section */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2 text-white">
                            <Shield size={20} className="text-primary/50" />
                            <h2 className="text-lg font-black uppercase tracking-tighter italic">Rules & Regulations</h2>
                        </div>

                        <div className="space-y-3">
                            {game.rulesList.map((rule, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm space-y-1">
                                    <h3 className="text-xs font-black text-primary uppercase tracking-widest">{rule.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const handlePlaceBet = () => {
        if (!selectedTimeSlot) {
            toast.error("Please select a time slot first!", {
                className: "bg-destructive/10 border-destructive text-destructive font-bold",
            });
            return;
        }
        toast.success(`Bet of ₹${betAmount} placed on ${selectedTimeSlot}!`, {
            description: `Target Game: ${game.name}. Good luck!`,
            className: "bg-card border-primary text-foreground border-2",
        });
    };

    const adjustBet = (amount: number) => {
        setBetAmount((prev) => Math.max(10, prev + amount));
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            <CalendarHeader />

            <main className="p-4 sm:p-6 space-y-8 max-w-2xl mx-auto w-full">
                {/* Navigation & Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-card border border-border rounded-2xl hover:bg-secondary/80 transition-all active:scale-90"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                        <Trophy size={16} className="text-accent" />
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] leading-none">High Roller Choice</span>
                    </div>
                </div>

                {/* Banner Section */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl group">
                    <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-[10px] font-black px-3 py-1 bg-primary text-primary-foreground rounded-full uppercase tracking-[0.3em] mb-3 inline-block shadow-xl">
                            {game.theme}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white drop-shadow-2xl uppercase">
                            {game.name}
                        </h1>
                    </div>
                </div>

                {/* Intro */}
                <div className="px-2">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic opacity-80">
                        "{game.description}"
                    </p>
                </div>

                {/* Select Time Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <Clock size={20} className="text-primary" />
                        <h2 className="text-lg font-black uppercase tracking-tighter italic">Select Time Slot</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {game.timeSlots.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest border-2 transition-all duration-300 ${selectedTimeSlot === slot
                                    ? 'bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-white'
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Betting Section */}
                <div className={`space-y-6 transition-all duration-500 ${selectedTimeSlot ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none grayscale'}`}>
                    <div className="flex items-center gap-2 text-white">
                        <Coins size={20} className="text-accent" />
                        <h2 className="text-lg font-black uppercase tracking-tighter italic">Enter Amount</h2>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-card border-2 border-primary/20 shadow-2xl relative overflow-hidden text-center space-y-8">
                        <div className="absolute top-0 right-0 p-12 bg-primary/5 blur-3xl rounded-full -mr-8 -mt-8" />

                        <div className="flex items-center justify-between px-4">
                            <button
                                onClick={() => adjustBet(-100)}
                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground transition-all active:scale-90 border border-white/5"
                            >
                                <Minus size={24} />
                            </button>

                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1 opacity-50">Bet Amount</span>
                                <div className="text-5xl font-black tracking-tighter tabular-nums text-white">
                                    ₹{betAmount}
                                </div>
                            </div>

                            <button
                                onClick={() => adjustBet(100)}
                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-90 shadow-xl shadow-primary/20"
                            >
                                <Plus size={24} />
                            </button>
                        </div>

                        <div className="flex gap-2 justify-center">
                            {[500, 1000, 5000].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setBetAmount(val)}
                                    className={`px-6 py-2 text-[10px] font-black rounded-full transition-all uppercase tracking-widest ${betAmount === val ? 'bg-accent text-accent-foreground shadow-lg' : 'bg-secondary text-muted-foreground border border-white/5 hover:text-white'}`}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handlePlaceBet}
                            className="w-full py-5 bg-primary text-primary-foreground font-black text-xl rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center gap-3 group"
                        >
                            Place Bet Now
                            <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Rules Section */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 text-white">
                        <Shield size={20} className="text-primary/50" />
                        <h2 className="text-lg font-black uppercase tracking-tighter italic">Rules & Regulations</h2>
                    </div>

                    <div className="space-y-3">
                        {game.rulesList.map((rule, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm space-y-1">
                                <h3 className="text-xs font-black text-primary uppercase tracking-widest">{rule.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{rule.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
