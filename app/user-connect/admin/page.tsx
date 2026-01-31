'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Shield, Trash2, MessageSquare, AlertTriangle, CheckCircle, Search, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    city: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, blocked: 0, cities: 0 });

    const fetchData = async () => {
        setLoading(true);
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

                const blocked = data.filter((u: User) => u.isBlocked).length;
                const uniqueCities = new Set(data.map((u: User) => u.city)).size;
                setStats({ total: data.length, blocked, cities: uniqueCities });
            } else {
                toast.error('Admin authorization failed');
                router.push('/user-connect/dashboard');
            }
        } catch (err) {
            toast.error('Server error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [router]);

    const handleBlock = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/users/block/${id}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('User status updated');
                fetchData();
            }
        } catch (err) {
            toast.error('Block failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('User deleted');
                fetchData();
            }
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-background text-white p-6 md:p-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
                        <Shield size={12} /> Admin Control Panel
                    </div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter">System <span className="text-primary text-glow">Admin</span></h1>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">Manage users, monitor safety, and control access</p>
                </div>

                <button onClick={fetchData} className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                    <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /> Refresh Data
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Users', value: stats.total, icon: Users, color: 'primary' },
                    { label: 'Blocked Accounts', value: stats.blocked, icon: AlertTriangle, color: 'red-500' },
                    { label: 'Cities Served', value: stats.cities, icon: CheckCircle, color: 'green-500' }
                ].map((stat, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-card/40 border-2 border-white/5 backdrop-blur-xl group hover:border-primary/30 transition-all duration-500">
                        <stat.icon className={`text-${stat.color} mb-4 group-hover:scale-110 transition-transform`} size={32} />
                        <div className="text-4xl font-black italic uppercase tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Users Table */}
            <div className="bg-card/40 border-2 border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Registered <span className="text-primary">Users</span></h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <input type="text" placeholder="Quick Search..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                                <th className="p-6">User / Identity</th>
                                <th className="p-6">Location</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black uppercase italic tracking-tight">{user.name}</div>
                                                <div className="text-[10px] text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{user.city || 'Unknown'}</span>
                                    </td>
                                    <td className="p-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.isBlocked ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleBlock(user._id)}
                                                className={`p-3 rounded-xl border border-white/10 transition-all ${user.isBlocked ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                            >
                                                <Shield size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Chats Monitoring Section */}
            <div className="bg-card/40 border-2 border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl mt-12">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Live Chat <span className="text-primary">Monitoring</span></h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Real-time view of all system communications</p>
                </div>

                <div className="p-6 text-center">
                    <ChatMonitor />
                </div>
            </div>
        </div>
    );
}

function ChatMonitor() {
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('http://localhost:5000/api/chats/admin/all', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setChats(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
        const interval = setInterval(fetchChats, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="h-40 flex items-center justify-center animate-pulse text-muted-foreground font-black uppercase tracking-widest">Loading Chats...</div>;

    return (
        <div className="space-y-4">
            {chats.map((chat: any) => (
                <div key={chat._id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col text-right min-w-[100px]">
                            <span className="text-[10px] font-black uppercase text-primary leading-none">{chat.sender?.name}</span>
                            <span className="text-[8px] text-muted-foreground">Sender</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 text-left">
                            <p className="text-xs text-white/80">{chat.text}</p>
                            <span className="text-[8px] text-muted-foreground mt-1 block">{new Date(chat.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col min-w-[100px] text-left">
                            <span className="text-[10px] font-black uppercase text-accent leading-none">{chat.receiver?.name}</span>
                            <span className="text-[8px] text-muted-foreground">Receiver</span>
                        </div>
                    </div>
                </div>
            ))}
            {chats.length === 0 && <div className="text-center py-10 text-muted-foreground">No recent messages</div>}
        </div>
    );
}
