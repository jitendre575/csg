'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from './game-context';
import { Coins, Plus, Minus, RotateCw, Wallet, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

const getDiceIcon = (value: number) => {
    // Simple representation of dice faces
    const dotPositions: Record<number, number[]> = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    };

    return (
        <div className="w-16 h-16 bg-white rounded-xl grid grid-cols-3 p-2 gap-1 shadow-inner relative">
            {[...Array(9)].map((_, i) => (
                <div key={i} className={`flex items-center justify-center`}>
                    {dotPositions[value]?.includes(i) && (
                        <div className="w-2.5 h-2.5 bg-background rounded-full" />
                    )}
                </div>
            ))}
        </div>
    );
};

export const DiceDuelGame: React.FC = () => {
    const { balance, setBalance } = useGame();
    const [betAmount, setBetAmount] = useState(500);
    const [selectedBox, setSelectedBox] = useState<'left' | 'right' | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [dice, setDice] = useState<[number, number]>([1, 1]);
    const [result, setResult] = useState<{ total: number; winner: 'left' | 'right' | null }>({ total: 2, winner: null });

    const handleStartRound = () => {
        if (!selectedBox) {
            toast.error("Please select a box (Small or Big) first!");
            return;
        }
        if (betAmount > balance) {
            toast.error("Insufficient balance!");
            return;
        }

        setIsRolling(true);
        setResult({ total: 0, winner: null });

        // Simulate dice rolling animation
        let count = 0;
        const interval = setInterval(() => {
            setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
            count++;
            if (count >= 15) {
                clearInterval(interval);
                const d1 = Math.floor(Math.random() * 6) + 1;
                const d2 = Math.floor(Math.random() * 6) + 1;
                const total = d1 + d2;
                const winner = total <= 6 ? 'left' : 'right';

                setDice([d1, d2]);
                setResult({ total, winner });
                setIsRolling(false);

                if (selectedBox === winner) {
                    setBalance(prev => prev + betAmount);
                    toast.success(`YOU WIN! Total is ${total}. You won ₹${betAmount * 2}!`, {
                        className: "bg-primary border-primary text-primary-foreground font-black",
                    });
                } else {
                    setBalance(prev => prev - betAmount);
                    toast.error(`YOU LOST! Total is ${total}. Range: ${winner === 'left' ? 'Small (1-6)' : 'Big (7-12)'}`, {
                        className: "bg-destructive border-destructive text-destructive-foreground font-bold",
                    });
                }
            }
        }, 100);
    };

    const adjustBet = (amount: number) => {
        setBetAmount((prev) => Math.max(10, prev + amount));
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto w-full pb-12">
            {/* Wallet Status */}
            <div className="flex items-center justify-between p-4 bg-card rounded-3xl border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-accent/20 rounded-2xl text-accent">
                        <Wallet size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Available Balance</p>
                        <p className="text-xl font-black text-white tabular-nums tracking-tighter">₹{balance.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Game Active</span>
                </div>
            </div>

            {/* Main Game Stage */}
            <div className="relative p-6 sm:p-10 rounded-[3rem] bg-card border-2 border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 blur-3xl ${result.winner === 'left' ? 'bg-primary/40' : 'bg-transparent'}`} />
                    <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-500 blur-3xl ${result.winner === 'right' ? 'bg-primary/40' : 'bg-transparent'}`} />
                </div>

                {/* Center Dice Box */}
                <div className="flex flex-col items-center mb-10 relative">
                    <div className={`flex gap-4 p-6 bg-secondary rounded-[2rem] border-4 transition-all duration-300 ${isRolling ? 'border-accent animate-bounce shadow-[0_0_30px_rgba(255,184,0,0.3)]' : 'border-white/5 shadow-inner'}`}>
                        {getDiceIcon(dice[0])}
                        {getDiceIcon(dice[1])}
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">Total Sum</span>
                        <div className="text-4xl font-black text-white tracking-tighter bg-background px-6 py-2 rounded-2xl shadow-xl min-w-[80px] text-center">
                            {isRolling ? '??' : dice[0] + dice[1]}
                        </div>
                    </div>
                </div>

                {/* Duel Boxes */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
                    {/* Left Box (1-6) */}
                    <button
                        onClick={() => setSelectedBox('left')}
                        disabled={isRolling}
                        className={`group relative flex flex-col items-center p-8 rounded-[2.5rem] border-4 transition-all duration-500 overflow-hidden ${selectedBox === 'left'
                                ? 'bg-primary/5 border-primary shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.02]'
                                : 'bg-secondary/40 border-white/5 hover:border-primary/30'
                            } ${result.winner === 'left' ? 'animate-pulse !border-primary' : ''}`}
                    >
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">Small</span>
                        <h3 className="text-4xl font-black italic tracking-tighter text-white">1 - 6</h3>
                        <div className={`mt-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${selectedBox === 'left' ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-muted-foreground'}`}>
                            Win 2x
                        </div>
                    </button>

                    {/* Right Box (7-12) */}
                    <button
                        onClick={() => setSelectedBox('right')}
                        disabled={isRolling}
                        className={`group relative flex flex-col items-center p-8 rounded-[2.5rem] border-4 transition-all duration-500 overflow-hidden ${selectedBox === 'right'
                                ? 'bg-primary/5 border-primary shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.02]'
                                : 'bg-secondary/40 border-white/5 hover:border-primary/30'
                            } ${result.winner === 'right' ? 'animate-pulse !border-primary' : ''}`}
                    >
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">Big</span>
                        <h3 className="text-4xl font-black italic tracking-tighter text-white">7 - 12</h3>
                        <div className={`mt-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${selectedBox === 'right' ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-muted-foreground'}`}>
                            Win 2x
                        </div>
                    </button>
                </div>
            </div>

            {/* Betting Controls */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-white px-2">
                    <Coins size={20} className="text-accent" />
                    <h2 className="text-lg font-black uppercase tracking-tighter italic">Risk/Bet Amount</h2>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-card border border-white/5 shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="flex items-center justify-between px-4">
                        <button
                            onClick={() => adjustBet(-100)}
                            disabled={isRolling}
                            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground transition-all active:scale-90 border border-white/5"
                        >
                            <Minus size={28} />
                        </button>

                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1 opacity-50">Current Stake</span>
                            <div className="text-5xl font-black tracking-tighter tabular-nums text-white">
                                ₹{betAmount}
                            </div>
                        </div>

                        <button
                            onClick={() => adjustBet(100)}
                            disabled={isRolling}
                            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-90 shadow-xl shadow-primary/20"
                        >
                            <Plus size={28} />
                        </button>
                    </div>

                    <div className="flex gap-2 justify-center">
                        {[100, 500, 1000, 5000].map((val) => (
                            <button
                                key={val}
                                onClick={() => setBetAmount(val)}
                                disabled={isRolling}
                                className={`px-6 py-2 text-[10px] font-black rounded-full transition-all uppercase tracking-widest ${betAmount === val ? 'bg-accent text-accent-foreground shadow-lg' : 'bg-secondary text-muted-foreground border border-white/5 hover:text-white'}`}
                            >
                                ₹{val}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleStartRound}
                        disabled={isRolling}
                        className={`w-full py-5 text-xl font-black rounded-2xl shadow-2xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${isRolling
                                ? 'bg-secondary text-muted-foreground cursor-wait'
                                : 'bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] shadow-primary/30'
                            }`}
                    >
                        {isRolling ? 'Rolling...' : 'Start Round'}
                        <RotateCw size={24} className={isRolling ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};
