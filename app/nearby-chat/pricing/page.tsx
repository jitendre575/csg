'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap, Crown, Shield, Clock, ArrowRight } from 'lucide-react';

const plans = [
    {
        name: '1-Day Trial',
        price: 'Free',
        period: '24 Hours',
        description: 'Perfect for exploring the community',
        features: ['5 Chats per day', 'Local discovery', 'Profile verification'],
        icon: Clock,
        color: 'border-muted-foreground/30',
        btnColor: 'bg-muted hover:bg-muted-foreground',
        popular: false
    },
    {
        name: 'Basic',
        price: '₹99',
        period: '7 Days',
        description: 'Great for short term usage',
        features: ['Unlimited Chats', 'Priority Support', 'Ad-free experience'],
        icon: Shield,
        color: 'border-primary/30',
        btnColor: 'bg-primary/20 text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground',
        popular: false
    },
    {
        name: 'Standard',
        price: '₹199',
        period: '30 Days',
        description: 'Most popular choice',
        features: ['Everything in Basic', 'Profile Boost', 'Read Receipts'],
        icon: Zap,
        color: 'border-primary shadow-lg shadow-primary/20',
        btnColor: 'bg-primary text-primary-foreground hover:scale-105',
        popular: true
    },
    {
        name: 'Premium',
        price: '₹299',
        period: '90 Days',
        description: 'Best value for money',
        features: ['Everything in Standard', 'Incognito Mode', 'Unlimited Local Filter'],
        icon: Crown,
        color: 'border-accent/30',
        btnColor: 'bg-accent/20 text-accent border-accent/50 hover:bg-accent hover:text-accent-foreground',
        popular: false
    }
];

export default function PricingPage() {
    const router = useRouter();

    const handleSelectPlan = (planName: string) => {
        // In a real app, this would trigger a payment gateway
        // For now, we'll just set the plan in local storage and redirect
        const user = JSON.parse(localStorage.getItem('nearby_user') || '{}');
        user.plan = planName;
        user.isActive = true;
        localStorage.setItem('nearby_user', JSON.stringify(user));

        router.push('/nearby-chat/dashboard');
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-background">
            <div className="w-full max-w-5xl space-y-12 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center space-y-4">
                    <h2 className="text-primary font-black uppercase tracking-widest text-xs italic">Choose Your Plan</h2>
                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tighter">
                        Unlock Full <span className="text-primary italic">Potential</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Select a plan that suits your needs. Male users require an active plan to access full chat features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`group relative flex flex-col p-8 rounded-[2.5rem] bg-card/40 border-2 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 ${plan.color}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6 space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                                    <plan.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{plan.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium">{plan.description}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-black text-white italic">{plan.price}</span>
                                <span className="text-muted-foreground text-sm font-bold ml-2">/ {plan.period}</span>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3 text-sm">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Check size={12} className="text-primary" />
                                        </div>
                                        <span className="text-muted-foreground font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleSelectPlan(plan.name)}
                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 border border-transparent shadow-xl ${plan.btnColor}`}
                            >
                                Select {plan.name}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-2xl text-center">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
                            Secure checkout • Instant Activation • 24/7 Support
                        </span>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="text-muted-foreground hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group"
                    >
                        Go back to Welcome <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
