'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    ShieldAlert,
    MoreHorizontal,
    Activity,
    History,
    Search,
    Filter,
    ShieldOff,
    AlertTriangle,
    Flag,
    ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const mockActiveChats = [
    { id: 'C1', user1: 'Rohan Gupta', user2: 'Alisha Sharma', messages: 42, startTime: '10:30 AM', status: 'Active' },
    { id: 'C2', user1: 'Vikram Singh', user2: 'Sneha Patil', messages: 12, startTime: '11:15 AM', status: 'Active' },
    { id: 'C3', user1: 'Kushal Jha', user2: 'Priya Verma', messages: 8, startTime: '11:45 AM', status: 'Active' },
    { id: 'C4', user1: 'Amitabh R.', user2: 'Neha G.', messages: 4, startTime: '12:05 PM', status: 'Reported' },
];

export default function ChatMonitoring() {
    const handleWarn = (user: string) => {
        toast.warning(`System warning issued to ${user} regarding chat behavior.`);
    };

    const handleBan = (user: string) => {
        toast.error(`${user} has been permanently banned from searching nearby users.`);
    };

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Compliance Center</h2>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Chat <span className="text-primary italic">Monitoring</span></h1>
                    <p className="text-sm text-muted-foreground font-medium">SafeMode overview: maintaining community standards</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Live Feed Enabled</span>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Conversations', value: '142', trend: 'Live', icon: MessageSquare, color: 'text-primary' },
                    { label: 'Reported Pairs', value: '4', trend: 'Priority', icon: Flag, color: 'text-destructive' },
                    { label: 'Blocked Chats', value: '18', trend: 'Today', icon: ShieldOff, color: 'text-muted-foreground' },
                ].map((stat) => (
                    <div key={stat.label} className="p-8 rounded-[2rem] bg-[#0b0f1a] border border-white/5 shadow-xl group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-white italic tracking-tighter tabular-nums">{stat.value}</p>
                            </div>
                            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat List */}
            <div className="bg-[#0b0f1a] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Active Conversations</h3>
                        <div className="relative max-w-xs w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                            <input
                                type="text"
                                placeholder="Search usernames..."
                                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border border-white/5">
                            <Activity size={14} /> Live Monitor
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest bg-white/5">
                            <History size={14} /> Log Exports
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-white/5">
                    {mockActiveChats.map((chat) => (
                        <div key={chat.id} className="p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:bg-white/[0.01] transition-all group">
                            <div className="flex items-center gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-xs text-primary">{chat.user1.charAt(0)}</div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-black text-white uppercase tracking-tight">{chat.user1}</p>
                                        <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase opacity-50">
                                            <div className="w-1 h-1 bg-green-500 rounded-full" /> Online
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{chat.messages} Msgs</p>
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-8 bg-white/10" />
                                        <MessageSquare size={16} className="text-muted-foreground" />
                                        <div className="h-px w-8 bg-white/10" />
                                    </div>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase">{chat.startTime}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-xs text-accent">{chat.user2.charAt(0)}</div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-black text-white uppercase tracking-tight">{chat.user2}</p>
                                        <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase opacity-50">
                                            <div className="w-1 h-1 bg-green-500 rounded-full" /> Online
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${chat.status === 'Reported' ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' : 'bg-green-500/10 text-green-500 border-green-500/20'
                                    }`}>
                                    {chat.status === 'Reported' ? <AlertTriangle size={12} /> : <Activity size={12} />}
                                    {chat.status}
                                </span>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleWarn(chat.user1)}
                                        className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all"
                                        title="Warn Both"
                                    >
                                        <AlertTriangle size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleBan(chat.user1)}
                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                        title="Ban User"
                                    >
                                        <ShieldOff size={18} />
                                    </button>
                                    <button className="px-5 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                                        View Chat <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
