'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Clear old session
        localStorage.removeItem('admin_session');
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Artificial delay for premium feel
        setTimeout(() => {
            if (credentials.username === 'adminjs' && credentials.password === '335524JI') {
                localStorage.setItem('admin_session', JSON.stringify({
                    id: 'admin_1',
                    username: 'adminjs',
                    role: 'SUPER_ADMIN',
                    loginTime: new Date().toISOString()
                }));
                toast.success("Welcome back, Commander.");
                router.push('/admin/dashboard');
            } else {
                toast.error("Invalid Admin Credentials");
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050b18]">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-2xl mb-4 group hover:scale-110 transition-transform duration-500">
                        <ShieldCheck size={40} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                        Admin <span className="text-primary italic">Secure Access</span>
                    </h1>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em]">
                        Console v2.4.0 • Restricted Area
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Username</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="Enter admin username"
                                className="w-full bg-card/40 border-2 border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none backdrop-blur-xl font-bold"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Password Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="Enter secure password"
                                className="w-full bg-card/40 border-2 border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none backdrop-blur-xl font-bold"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative flex items-center justify-center gap-3 py-5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/30 overflow-hidden"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <span className="relative z-10">Initialise Dashboard</span>
                                <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={20} />
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>

                <div className="pt-8 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-[10px] text-muted-foreground font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Back to Mainland
                    </button>
                </div>
            </div>
        </div>
    );
}
