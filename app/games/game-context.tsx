'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Game {
    id: string;
    name: string;
    description: string;
    shortIntro: string;
    theme: string;
    image: string;
    timeSlots: string[];
    rulesList: { title: string; content: string }[];
}

export interface AdminSettings {
    leftPayout: number;
    centerPayout: number;
    rightPayout: number;
    roundTime: number;
    isGameOn: boolean;
}

export interface GameLog {
    id: string;
    dice: [number, number];
    total: number;
    winner: 'left' | 'center' | 'right';
    timestamp: string;
    totalBets: { left: number; center: number; right: number };
}

interface GameContextType {
    selectedGameId: string | null;
    setSelectedGameId: (id: string | null) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    adminSettings: AdminSettings;
    setAdminSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
    gameHistory: GameLog[];
    addGameLog: (log: GameLog) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const games: Game[] = [
    {
        id: '1',
        name: 'Dragon Fortune',
        shortIntro: 'Unleash the power of the ancient golden dragon for legendary wins.',
        description: 'Dragon Fortune is a mythical high-stakes betting game where players predict the dragon\'s elemental breath.',
        theme: 'Ancient Oriental',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=400&fit=crop',
        timeSlots: ['10:00 AM', '12:30 PM', '03:00 PM', '06:30 PM', '09:00 PM'],
        rulesList: [
            { title: 'Winning System', content: 'Payouts are calculated based on the elemental outcome.' }
        ]
    },
    {
        id: 'dice-arena-pro',
        name: 'Dice Arena Pro',
        shortIntro: 'The ultimate high-stakes automatic dice game with 5x Jackpot.',
        description: 'Dice Arena Pro is our flagship premium game. Fully automated rounds every 15 seconds with a dedicated jackpot for lucky number 7.',
        theme: 'Premium Casino / Neon',
        image: 'https://images.unsplash.com/photo-1596838132731-dd36a18d04b2?w=800&h=400&fit=crop',
        timeSlots: ['24/7 Live Auto'],
        rulesList: [
            { title: 'Small Range (1-6)', content: 'Win 2x your bet if the total is between 1 and 6.' },
            { title: 'Jackpot 7', content: 'Hit exactly 7 to win a massive 5x payout!' },
            { title: 'Big Range (8-12)', content: 'Win 2x your bet if the total is between 8 and 12.' },
            { title: 'Auto Rounds', content: 'A new round starts every 15 seconds. Bets close 3 seconds before the roll.' }
        ]
    }
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [balance, setBalance] = useState<number>(10000);
    const [adminSettings, setAdminSettings] = useState<AdminSettings>({
        leftPayout: 2,
        centerPayout: 5,
        rightPayout: 2,
        roundTime: 15,
        isGameOn: true
    });
    const [gameHistory, setGameHistory] = useState<GameLog[]>([]);

    const addGameLog = (log: GameLog) => {
        setGameHistory(prev => [log, ...prev].slice(0, 50));
    };

    return (
        <GameContext.Provider
            value={{
                selectedGameId,
                setSelectedGameId,
                selectedDate,
                setSelectedDate,
                balance,
                setBalance,
                adminSettings,
                setAdminSettings,
                gameHistory,
                addGameLog
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
