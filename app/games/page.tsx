'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGame, games } from './game-context';
import { CalendarHeader } from './calendar-header';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function GameSelectPage() {
    const { selectedGameId, setSelectedGameId } = useGame();
    const router = useRouter();

    const handleGameSelect = (id: string) => {
        setSelectedGameId(id);
    };

    const selectedGame = games.find(g => g.id === selectedGameId);

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-background">
            <CalendarHeader />

            <main className="flex-1 p-4 sm:p-6 space-y-8 max-w-4xl mx-auto w-full">
                <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                        <Zap size={12} fill="currentColor" /> Live Betting Available
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase italic">
                        Select Your <span className="text-primary">Game</span>
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Choose a game to see available match times and place your bets.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {games.map((game) => {
                        const isSelected = selectedGameId === game.id;
                        return (
                            <button
                                key={game.id}
                                onClick={() => handleGameSelect(game.id)}
                                className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 transition-all duration-500 active:scale-[0.98] shadow-2xl ${isSelected
                                        ? 'border-primary ring-8 ring-primary/10 bg-primary/5'
                                        : 'border-card bg-card hover:border-primary/30'
                                    }`}
                            >
                                <div className="aspect-[16/10] w-full relative overflow-hidden">
                                    <img
                                        src={game.image}
                                        alt={game.name}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                    {isSelected && (
                                        <div className="absolute top-4 right-4 p-2 bg-primary text-primary-foreground rounded-2xl shadow-2xl animate-in zoom-in spin-in-12 duration-500 scale-110">
                                            <Check size={20} strokeWidth={4} />
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-accent/20 text-accent text-[10px] font-black rounded-lg uppercase tracking-[0.2em] backdrop-blur-xl border border-accent/30 shadow-lg">
                                            {game.theme}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 text-left space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-xl font-black transition-colors italic uppercase tracking-tighter ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                            {game.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-80">
                                        {game.shortIntro}
                                    </p>

                                    <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                                            <ShieldCheck size={12} className="text-primary" /> Verified
                                        </div>
                                        <span>•</span>
                                        <div>{game.timeSlots.length} Slots Today</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>

            {/* Floating Action Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 bg-background/40 backdrop-blur-2xl border-t border-white/5 transition-all duration-500 transform ${selectedGameId ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="max-w-md mx-auto flex items-center gap-6">
                    <div className="flex-1">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Ready to Play</p>
                        <p className="text-lg font-black italic text-white truncate uppercase tracking-tighter">{selectedGame?.name}</p>
                    </div>

                    <button
                        onClick={() => router.push(`/games/${selectedGameId}`)}
                        className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                    >
                        Next
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
