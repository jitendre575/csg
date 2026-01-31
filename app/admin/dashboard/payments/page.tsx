'use client';

import React, { useState } from 'react';
import {
    CreditCard,
    Calendar,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Search,
    Filter,
    ArrowRight,
    Zap
} from 'lucide-react';
import { toast } from 'sonner';

const mockPayments = [
    { id: 'PAY-1092', user: 'Rohan Gupta', plan: 'Standard', amount: '₹199', date: '21 Jan 2026', method: 'UPI', status: 'Active' },
    { id: 'PAY-1085', user: 'Kushal Jha', plan: 'Premium', amount: '₹299', date: '18 Jan 2026', method: 'Card', status: 'Active' },
    { id: 'PAY-1072', user: 'Vikram Singh', plan: 'Trial', amount: '₹0', date: '15 Jan 2026', method: '--', status: 'Expired' },
    { id: 'PAY-1064', user: 'Sameer K.', plan: 'Basic', amount: '₹99', date: '10 Jan 2026', method: 'UPI', status: 'Active' },
    { id: 'PAY-1051', user: 'Amitabh R.', plan: 'Premium', amount: '₹299', date: '05 Jan 2026', method: 'Net Banking', status: 'Active' },
];

export default function PaymentsManagement() {
    const [payments, setPayments] = useState(mockPayments);

    const handleExtend = (user: string) => {
        toast.success(`Subscription extended by 7 days for ${user}`);
    };

    const handleMarkPaid = () => {
        toast.info("Transaction status updated to completed.");
    }

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Financial Records</h2>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Payments & <span className="text-primary italic">Plans</span></h1>
                    <p className="text-sm text-muted-foreground font-medium">Revenue tracking and manual subscription overrides</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                        <Download size={16} /> Export Reports
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                        <Zap size={16} /> Manual Activation
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Monthly Revenue', value: '₹1,52,400', trend: '+18.4%', icon: TrendingUp, color: 'text-primary' },
                    { label: 'Pending Payouts', value: '₹4,200', trend: 'Low', icon: Clock, color: 'text-yellow-400' },
                    { label: 'Success Rate', value: '98.2%', trend: '+0.4%', icon: CheckCircle2, color: 'text-green-400' },
                ].map((stat) => (
                    <div key={stat.label} className="p-8 rounded-[2rem] bg-[#0b0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-white italic tabular-nums">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction Feed */}
            <div className="bg-[#0b0f1a] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Recent Transactions</h3>
                        <div className="relative max-w-xs w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                        <Filter size={14} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transaction ID</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subscriber</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plan Detail</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {payments.map((pay) => (
                                <tr key={pay.id} className="group hover:bg-white/[0.01] transition-all">
                                    <td className="px-10 py-7">
                                        <p className="text-[10px] font-black text-white italic tracking-widest">{pay.id}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{pay.date}</p>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-xs text-primary">{pay.user.charAt(0)}</div>
                                            <p className="text-[11px] font-black text-white uppercase tracking-tight">{pay.user}</p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="inline-flex items-center gap-2">
                                            <Zap size={12} className="text-primary" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{pay.plan}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 font-black text-white text-sm tabular-nums">
                                        {pay.amount}
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${pay.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {pay.status === 'Active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                            {pay.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleExtend(pay.user)}
                                                className="text-[10px] font-black text-primary uppercase hover:underline underline-offset-4"
                                            >
                                                Extend
                                            </button>
                                            <button
                                                onClick={handleMarkPaid}
                                                className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-black uppercase text-muted-foreground hover:bg-white/10 hover:text-white transition-all shadow-lg"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
