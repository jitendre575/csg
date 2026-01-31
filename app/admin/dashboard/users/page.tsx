'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Ban,
    Trash2,
    UserPlus,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    MapPin,
    ShieldCheck,
    ShieldAlert,
    MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';

const mockUsers = [
    { id: 'U1001', name: 'Alisha Sharma', age: 23, gender: 'Female', mobile: '9876543210', email: 'alisha@example.com', loc: 'Delhi', status: 'Online', plan: 'Free', expiry: '--' },
    { id: 'U1002', name: 'Rohan Gupta', age: 26, gender: 'Male', mobile: '9876543211', email: 'rohan@example.com', loc: 'Mumbai', status: 'Online', plan: 'Standard', expiry: '20 Feb 2026' },
    { id: 'U1003', name: 'Sneha Patil', age: 21, gender: 'Female', mobile: '9876543212', email: 'sneha@example.com', loc: 'Pune', status: 'Offline', plan: 'Free', expiry: '--' },
    { id: 'U1004', name: 'Vikram Singh', age: 28, gender: 'Male', mobile: '9876543213', email: 'vikram@example.com', loc: 'Delhi', status: 'Online', plan: 'Trial', expiry: '30 Jan 2026' },
    { id: 'U1005', name: 'Priya Verma', age: 24, gender: 'Female', mobile: '9876543214', email: 'priya@example.com', loc: 'Bangalore', status: 'Online', plan: 'Free', expiry: '--' },
    { id: 'U1006', name: 'Kushal Jha', age: 25, gender: 'Male', mobile: '9876543215', email: 'kushal@example.com', loc: 'Mumbai', status: 'Offline', plan: 'Premium', expiry: '15 Apr 2026' },
];

export default function UserManagement() {
    const [users, setUsers] = useState(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to permanently delete user ${name}? This action cannot be undone.`)) {
            setUsers(users.filter(u => u.id !== id));
            toast.success(`User ${name} deleted permanently.`);
        }
    };

    const handleBlock = (name: string) => {
        toast.warning(`User ${name} has been restricted access.`);
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Administrative View</h2>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">User <span className="text-primary italic">Management</span></h1>
                    <p className="text-sm text-muted-foreground font-medium">Browse, search, and manage platform participants</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <UserPlus size={16} /> Add New User
                    </button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by ID, name, or email address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0b0f1a] border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium placeholder:text-[10px] placeholder:font-black placeholder:uppercase placeholder:tracking-[0.2em]"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-8 py-5 rounded-[1.5rem] bg-[#0b0f1a] border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-all flex items-center gap-2">
                        <Filter size={16} /> Filter List
                    </button>
                    <button className="px-8 py-5 rounded-[1.5rem] bg-[#0b0f1a] border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-all">Export CSV</button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0b0f1a] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mobile / Email</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Plan Info</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center font-black text-xl text-white italic group-hover:scale-110 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-black text-white italic uppercase tracking-tight leading-none">{user.name}</p>
                                                    <span className="text-[10px] font-black text-muted-foreground/50">{user.id}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{user.gender} • {user.age} Yrs</span>
                                                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                                                        <MapPin size={8} /> {user.loc}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <p className="text-xs font-black text-white leading-none mb-1.5">{user.mobile}</p>
                                        <p className="text-[10px] font-medium text-muted-foreground lowercase opacity-70">{user.email}</p>
                                    </td>
                                    <td className="px-8 py-7 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border mb-1.5 ${user.plan === 'Premium' ? 'bg-accent/10 text-accent border-accent/20' :
                                                    user.plan === 'Standard' ? 'bg-primary/10 text-primary border-primary/20' :
                                                        'bg-white/5 text-muted-foreground border-white/10'
                                                }`}>
                                                {user.plan}
                                            </span>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-50">Exp: {user.expiry}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-white/5 shadow-inner">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleBlock(user.name)}
                                                className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all"
                                                title="Block User"
                                            >
                                                <Ban size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:bg-white/20 hover:text-white transition-all">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-10 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Showing 1-10 of 4,281 Results</p>
                    <div className="flex items-center gap-3">
                        <button className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-all disabled:opacity-20" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs">1</span>
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 cursor-pointer font-black text-xs">2</span>
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 cursor-pointer font-black text-xs">3</span>
                        </div>
                        <button className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-all">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
