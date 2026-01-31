'use client';

import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGame } from './game-context';
import { format, addDays, subDays } from 'date-fns';

export const CalendarHeader: React.FC = () => {
    const { selectedDate, setSelectedDate } = useGame();

    const handlePrevDate = () => {
        setSelectedDate(subDays(selectedDate, 1));
    };

    const handleNextDate = () => {
        setSelectedDate(addDays(selectedDate, 1));
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent">
                <div className="p-2 bg-accent/10 rounded-lg">
                    <CalendarIcon size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Selected Date</span>
                    <span className="text-sm font-semibold">{format(selectedDate, 'PPP')}</span>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={handlePrevDate}
                    className="p-2 hover:bg-secondary rounded-full transition-colors active:scale-95"
                    aria-label="Previous Day"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="relative">
                    <input
                        type="date"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                    <span className="px-3 py-1 bg-secondary text-xs font-medium rounded-full cursor-pointer hover:bg-secondary/80 transition-colors uppercase tracking-tight">Change</span>
                </div>
                <button
                    onClick={handleNextDate}
                    className="p-2 hover:bg-secondary rounded-full transition-colors active:scale-95"
                    aria-label="Next Day"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </header>
    );
};
