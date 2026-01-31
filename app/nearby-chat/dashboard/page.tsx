'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, MapPin, MessageCircle, Signal, Users, ArrowUpRight, Sparkles, Crown } from 'lucide-react';

const mockUsers = [
    { id: '1', name: 'Alisha Sharma', age: 23, gender: 'Female', distance: 0.4, status: 'online', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '2', name: 'Rohan Gupta', age: 26, gender: 'Male', distance: 0.8, status: 'online', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '3', name: 'Sneha Patil', age: 21, gender: 'Female', distance: 1.2, status: 'offline', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '4', name: 'Vikram Singh', age: 28, gender: 'Male', distance: 1.5, status: 'online', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '5', name: 'Priya Verma', age: 24, gender: 'Female', distance: 1.9, status: 'online', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: '6', name: 'Kushal Jha', age: 25, gender: 'Male', distance: 2.1, status: 'offline', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400' },
];

export default function NearbyChatDashboard() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const userStr = localStorage.getItem('nearby_user');
        if (!userStr) {
            router.push('/nearby-chat/register');
            return;
        }
        setCurrentUser(JSON.parse(userStr));
    }, [router]);

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGender = activeFilter === 'All' || user.gender === activeFilter;
        const isNearby = user.distance <= 2.0;
        return matchesSearch && matchesGender && isNearby;
    });

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xl border border-primary/20">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">Nearby Chat</h1>
                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2">
                                    <Signal size={10} className="text-primary animate-pulse" /> Live Discovery Area
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mb-1">Authenticated</p>
                                <p className="text-sm font-black text-white italic uppercase">{currentUser.fullName}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/20 overflow-hidden">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=random`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search people near you..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-card/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all backdrop-blur-md"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                            {['All', 'Female', 'Male'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeFilter === filter
                                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                            : 'bg-card/40 text-muted-foreground border-white/5 hover:border-primary/30'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Banner for Male users with Trial/No Plan */}
                {currentUser.gender === 'Male' && currentUser.plan === '1-Day Trial' && (
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                                <Crown size={32} />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Upgrade to Premium</h3>
                                <p className="text-sm text-muted-foreground font-medium">Get unlimited chats and exclusive profile badges.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/nearby-chat/pricing')}
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
                        >
                            Unlock Now
                        </button>
                    </div>
                )}

                {/* User Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="group relative bg-card/40 rounded-[2.5rem] border-2 border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 animate-in fade-in zoom-in-95 duration-500"
                        >
                            {/* Image Section */}
                            <div className="aspect-square relative overflow-hidden">
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                    <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                                    {user.status}
                                </div>

                                {/* Distance Badge */}
                                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary shadow-xl">
                                    <MapPin size={10} /> {user.distance} KM AWAY
                                </div>

                                {/* Free for Girls Badge */}
                                {user.gender === 'Female' && (
                                    <div className="absolute top-4 right-4 p-2 bg-accent/20 border border-accent/30 rounded-full backdrop-blur-md text-accent shadow-xl">
                                        <Sparkles size={16} />
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter truncate leading-tight">{user.name}</h3>
                                        {user.gender === 'Female' && (
                                            <span className="shrink-0 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-accent/20 text-accent rounded border border-accent/20">Free</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{user.gender} • {user.age} Years</p>
                                </div>

                                <button
                                    onClick={() => router.push(`/nearby-chat/chat/${user.id}`)}
                                    className="w-full group/btn relative flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 overflow-hidden"
                                >
                                    <MessageCircle size={18} className="transition-transform group-hover/btn:-rotate-12" />
                                    Chat Now
                                    <ArrowUpRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                        <div className="w-24 h-24 rounded-full bg-card/40 border-2 border-white/5 flex items-center justify-center text-muted-foreground">
                            <Users size={48} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">No one found nearby</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto font-medium text-sm">
                                Try adjusting your filters or expanding your search to find more people in your area.
                            </p>
                        </div>
                        <button
                            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                            className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline underline-offset-4 transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </main>

            {/* Mobile Feed Status - Bottom */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                <div className="px-6 py-3 rounded-full bg-background/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Updates</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {filteredUsers.length} Local Users
                    </span>
                </div>
            </div>
        </div>
    );
}
