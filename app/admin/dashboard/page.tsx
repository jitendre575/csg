'use client';

import React from 'react';
import {
    Users,
    Zap,
    ArrowUpRight,
    TrendingUp,
    BarChart3,
    Activity,
    Layers,
    Clock,
    DollarSign,
    Heart,
    Flame
} from 'lucide-react';

export default function AdminOverview() {
    const stats = [
        { label: 'Total Users', value: '4,281', trend: '+12%', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Online Users', value: '1,042', trend: 'Live', icon: Activity, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'Active Plans', value: '852', trend: '+5%', icon: Zap, color: 'text-accent', bg: 'bg-accent/10' },
        { label: 'Total Revenue', value: '₹1,52,400', trend: '+18%', icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    const demographics = [
        { label: 'Male Users', value: '2,840', percentage: 66, icon: Flame, color: 'text-blue-400' },
        { label: 'Female Users', value: '1,441', percentage: 34, icon: Heart, color: 'text-pink-400' },
    ];

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Operational Metrics</h2>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">System <span className="text-primary italic">Overview</span></h1>
                    <p className="text-sm text-muted-foreground font-medium">Real-time data visualization of the Nearby Chat platform</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 rounded-2xl bg-card/40 border border-white/5 flex items-center gap-3 shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Metrics Live</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="group p-8 rounded-[2.5rem] bg-[#0b0f1a] border border-white/5 hover:border-primary/50 transition-all duration-500 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <stat.icon size={80} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</h3>
                                    <span className="text-[10px] font-black text-primary flex items-center gap-1">
                                        {stat.trend} <BarChart3 size={12} />
                                    </span>
                                </div>
                                <p className="text-3xl font-black text-white italic tracking-tighter tabular-nums">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Demographics & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Demographics */}
                <div className="lg:col-span-1 p-10 rounded-[3rem] bg-[#0b0f1a] border border-white/5 space-y-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Demographics</h3>
                        <Layers size={20} className="text-muted-foreground" />
                    </div>

                    <div className="space-y-8">
                        {demographics.map((item) => (
                            <div key={item.label} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} className={item.color} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-black text-white">{item.percentage}%</span>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                    <div
                                        className={`h-full rounded-full ${item.label === 'Male Users' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]'}`}
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.value} Records Found</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground leading-relaxed">
                            <Users size={14} className="text-primary" />
                            Data based on last 24 hours of platform registration activity.
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 p-10 rounded-[3rem] bg-[#0b0f1a] border border-white/5 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Recent Logins</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">Real-time authentication feed</p>
                        </div>
                        <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">View All</button>
                    </div>

                    <div className="divide-y divide-white/5">
                        {[
                            { name: 'Sameer K.', time: '2 mins ago', loc: 'Delhi, IN', plan: 'Premium' },
                            { name: 'Priya S.', time: '5 mins ago', loc: 'Mumbai, IN', plan: 'Free' },
                            { name: 'Ankita R.', time: '12 mins ago', loc: 'Bangalore, IN', plan: 'Free' },
                            { name: 'Rahul V.', time: '15 mins ago', loc: 'Pune, IN', plan: 'Basic' },
                            { name: 'Neha G.', time: '22 mins ago', loc: 'Kolkata, IN', plan: 'Free' },
                        ].map((user, i) => (
                            <div key={user.name} className="py-6 flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-white italic uppercase tracking-tight leading-none mb-1">{user.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-2">
                                            <MapPin size={10} /> {user.loc}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{user.plan}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2 justify-end">
                                        <Clock size={10} /> {user.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const MapPin = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
