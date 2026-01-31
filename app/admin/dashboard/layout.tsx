'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    MessageSquare,
    Settings2,
    LogOut,
    Bell,
    Search,
    UserCircle,
    Menu,
    X,
    Shield
} from 'lucide-react';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (!session) {
            router.replace('/admin');
        } else {
            setAdmin(JSON.parse(session));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        router.push('/admin');
    };

    const sidebarItems = [
        { id: 'home', label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { id: 'users', label: 'User Management', icon: Users, path: '/admin/dashboard/users' },
        { id: 'payments', label: 'Payments & Plans', icon: CreditCard, path: '/admin/dashboard/payments' },
        { id: 'chats', label: 'Chat Monitoring', icon: MessageSquare, path: '/admin/dashboard/chats' },
        { id: 'controls', label: 'Global Controls', icon: Settings2, path: '/admin/dashboard/controls' },
    ];

    if (!admin) return null;

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-200 selection:bg-primary/30">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0b0f1a] border-r border-white/5 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-8 pb-12 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                                <Shield className="text-primary-foreground" size={24} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black italic uppercase tracking-tighter leading-none text-white">Nearby Chat</h1>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Admin Panel</p>
                            </div>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => router.push(item.path)}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 group ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30'
                                            : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={18} className={`${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-destructive hover:bg-destructive/10 transition-all"
                        >
                            <LogOut size={18} />
                            Logout Session
                        </button>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-20 bg-[#0b0f1a]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-6 flex-1">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-muted-foreground hover:text-white transition-colors">
                            <Menu size={24} />
                        </button>

                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Search queries..."
                                className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:border-primary focus:outline-none transition-all placeholder:text-[10px] placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-[#0b0f1a]" />
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none mb-1">Super Admin</p>
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none italic">{admin.username}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/20 flex items-center justify-center text-accent">
                                <UserCircle size={28} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
