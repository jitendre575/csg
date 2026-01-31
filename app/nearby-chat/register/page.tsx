'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Calendar, LucideIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

interface InputFieldProps {
    label: string;
    icon: LucideIcon;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder: string;
    required?: boolean;
}

const InputField = ({ label, icon: Icon, type, name, value, onChange, placeholder, required }: InputFieldProps) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Icon size={18} />
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-card/40 border-2 border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none backdrop-blur-xl"
            />
        </div>
    </div>
);

export default function RegistrationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        mobile: '',
        email: '',
        gender: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('nearby_user', JSON.stringify(formData));

        if (formData.gender.toLowerCase() === 'female') {
            router.push('/nearby-chat/dashboard');
        } else {
            router.push('/nearby-chat/pricing');
        }
    };

    return (
        <div className="min-h-screen flex flex-col p-6 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-2">
                        Nearby Chat Onboarding
                    </div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                        Join the <span className="text-accent underline decoration-primary/50 underline-offset-8">Community</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                        Create your profile to find people near you
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Full Name"
                        icon={User}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Age"
                            icon={Calendar}
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Your age"
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full bg-card/40 border-2 border-white/5 rounded-2xl py-4 px-4 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none backdrop-blur-xl"
                            >
                                <option value="" className="bg-card text-white">Select Gender</option>
                                <option value="Male" className="bg-card text-white">Male</option>
                                <option value="Female" className="bg-card text-white">Female</option>
                            </select>
                        </div>
                    </div>

                    <InputField
                        label="Mobile Number"
                        icon={Phone}
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                    />

                    <InputField
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full group relative flex items-center justify-center gap-3 py-5 bg-accent text-accent-foreground rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-accent/30 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10">Create Profile & Continue</span>
                            <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={20} />
                        </button>
                    </div>
                </form>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-relaxed">
                        Your location will only be used to show users within 2km. We value your privacy.
                    </p>
                </div>
            </div>
        </div>
    );
}
