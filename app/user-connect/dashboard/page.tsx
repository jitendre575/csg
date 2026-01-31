'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, LogOut, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    age: number;
    city: string;
    profilePhoto: string;
    isOnline: boolean;
    lastSeen: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/user-connect');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                } else {
                    toast.error('Session expired');
                    localStorage.clear();
                    router.push('/user-connect');
                }
            } catch (err) {
                toast.error('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/user-connect');
        toast.success('Logged out');
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
            <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black italic">UC</div>
                    <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">User <span className="text-primary">Connect</span></h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Discover <span className="text-primary">People</span></h2>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mt-1">Connect with users worldwide in real-time</p>
                    </div>

                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none backdrop-blur-md"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 rounded-[2.5rem] bg-white/5 border border-white/10 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUsers.map(user => (
                            <div
                                key={user._id}
                                className="group relative bg-card/40 border-2 border-white/5 hover:border-primary/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${user.isOnline ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/10 text-muted-foreground'} text-[8px] font-black uppercase tracking-widest`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.isOnline ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                                        {user.isOnline ? 'Online' : 'Offline'}
                                    </div>
                                </div>

                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={user.profilePhoto}
                                        alt={user.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                </div>

                                <div className="p-6 pt-0 relative">
                                    <div className="space-y-1 mb-6">
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter truncate">{user.name}</h3>
                                        <div className="flex items-center gap-4 text-muted-foreground">
                                            <span className="text-[10px] font-black uppercase tracking-widest">{user.age} Years</span>
                                            <div className="flex items-center gap-1">
                                                <MapPin size={10} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-widest truncate">{user.city}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => router.push(`/user-connect/chat/${user._id}`)}
                                        className="w-full group/btn relative flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-primary-foreground transition-all duration-300"
                                    >
                                        <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        <span>Start Chat</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredUsers.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 text-muted-foreground mb-4">
                            <Search size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">No Users Found</h3>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">Try adjusting your search criteria</p>
                    </div>
                )}
            </main>
        </div>
    );
}
