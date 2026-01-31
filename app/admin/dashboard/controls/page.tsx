'use client';

import React, { useState } from 'react';
import {
    Settings2,
    Save,
    Zap,
    ShieldCheck,
    Clock,
    DollarSign,
    Ban,
    MessageSquare,
    Power,
    RefreshCcw,
    Lock
} from 'lucide-react';
import { toast } from 'sonner';

export default function GlobalControls() {
    const [config, setConfig] = useState({
        trialEnabled: true,
        chatLimitTrial: 5,
        basicPrice: 99,
        standardPrice: 199,
        premiumPrice: 299,
        nearbyRadius: 2.0,
        maintenanceMode: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Global configurations updated successfully!");
        }, 1000);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Platform Parameters</h2>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Global <span className="text-primary italic">Controls</span></h1>
                    <p className="text-sm text-muted-foreground font-medium">Fine-tuning of pricing, trial rules, and system behavior</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toast.info("Refreshing system caches...")}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all active:rotate-180 duration-500"
                    >
                        <RefreshCcw size={20} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {isLoading ? <RefreshCcw className="animate-spin" size={18} /> : <Save size={18} />}
                        Commit Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* User & Access Controls */}
                <div className="space-y-8">
                    <div className="p-10 rounded-[3rem] bg-[#0b0f1a] border border-white/5 space-y-10 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Access Policies</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between group">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-white uppercase tracking-tight">Enable 1-Day Trial</p>
                                    <p className="text-[10px] text-muted-foreground font-medium">Allow new male users to test platform</p>
                                </div>
                                <button
                                    onClick={() => setConfig({ ...config, trialEnabled: !config.trialEnabled })}
                                    className={`w-14 h-8 rounded-full transition-all relative ${config.trialEnabled ? 'bg-primary' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${config.trialEnabled ? 'left-7 shadow-lg' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Daily Chat Limit (Trial Users)</label>
                                <div className="relative">
                                    <MessageSquare size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="number"
                                        value={config.chatLimitTrial}
                                        onChange={e => setConfig({ ...config, chatLimitTrial: Number(e.target.value) })}
                                        className="w-full bg-[#020617] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-black text-white focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Discovery Radius (KM)</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={config.nearbyRadius}
                                        onChange={e => setConfig({ ...config, nearbyRadius: Number(e.target.value) })}
                                        className="w-full bg-[#020617] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-black text-white focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`p-10 rounded-[3rem] border transition-all duration-500 ${config.maintenanceMode ? 'bg-red-500/10 border-red-500/20 shadow-red-500/10' : 'bg-[#0b0f1a] border-white/5 shadow-xl'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.maintenanceMode ? 'bg-red-500 text-white' : 'bg-white/5 text-muted-foreground'}`}>
                                    <Power size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Maintenance Mode</h3>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase mt-1 opacity-50">Restrict all front-end access</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (confirm("DANGER: This will block all users from using the app. proceed?")) {
                                        setConfig({ ...config, maintenanceMode: !config.maintenanceMode });
                                    }
                                }}
                                className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all ${config.maintenanceMode ? 'bg-white text-red-500' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                            >
                                {config.maintenanceMode ? 'DEACTIVATE' : 'ACTIVATE'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing & Revenue Controls */}
                <div className="p-10 rounded-[3rem] bg-[#0b0f1a] border border-white/5 space-y-10 shadow-xl self-start">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <DollarSign size={20} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Pricing Structure</h3>
                    </div>

                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Basic Plan (7 Days)</p>
                                <span className="text-xs font-black text-primary italic tabular-nums">Current: ₹{config.basicPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="19" max="499"
                                value={config.basicPrice}
                                onChange={e => setConfig({ ...config, basicPrice: Number(e.target.value) })}
                                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary border border-white/10"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard Plan (30 Days)</p>
                                <span className="text-xs font-black text-primary italic tabular-nums">Current: ₹{config.standardPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="99" max="999"
                                value={config.standardPrice}
                                onChange={e => setConfig({ ...config, standardPrice: Number(e.target.value) })}
                                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary border border-white/10"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Premium Plan (90 Days)</p>
                                <span className="text-xs font-black text-primary italic tabular-nums">Current: ₹{config.premiumPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="199" max="2999"
                                value={config.premiumPrice}
                                onChange={e => setConfig({ ...config, premiumPrice: Number(e.target.value) })}
                                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary border border-white/10"
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <div className="p-6 rounded-[2rem] bg-accent/5 border border-accent/20 flex items-start gap-4">
                            <Lock size={18} className="text-accent mt-0.5 shrink-0" />
                            <p className="text-[10px] text-accent leading-relaxed font-black uppercase tracking-wider">
                                Price changes are relative to new purchases only. Existing subscriptions will retain their purchase-time pricing until renewal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
