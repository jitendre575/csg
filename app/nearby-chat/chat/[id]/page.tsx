'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Send, Phone, Video, Info, MoreVertical, Smile, Paperclip, CheckCheck } from 'lucide-react';

const mockUsers = [
    { id: '1', name: 'Alisha Sharma', age: 23, gender: 'Female', status: 'online', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '2', name: 'Rohan Gupta', age: 26, gender: 'Male', status: 'online', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: '3', name: 'Sneha Patil', age: 21, gender: 'Female', status: 'offline', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' },
];

export default function ChatScreen() {
    const router = useRouter();
    const params = useParams();
    const [targetUser, setTargetUser] = useState<any>(null);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! I saw your profile. How's it going?", sender: 'them', time: '10:30 AM' },
        { id: 2, text: "Wait, are you also in Delhi?", sender: 'them', time: '10:30 AM' },
        { id: 3, text: "Yes! High five! Living near Connaught Place.", sender: 'me', time: '10:32 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const user = mockUsers.find(u => u.id === params.id);
        if (user) {
            setTargetUser(user);
        } else {
            // Fallback
            setTargetUser(mockUsers[0]);
        }
    }, [params.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            text: newMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage('');

        // Mock reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "That's awesome! We should grab a coffee sometime soon.",
                sender: 'them',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 2000);
    };

    if (!targetUser) return null;

    return (
        <div className="flex flex-col h-screen bg-background max-w-2xl mx-auto border-x border-white/5 relative">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-xl border-b border-white/5 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 rounded-full hover:bg-card/50 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="relative group cursor-pointer" onClick={() => router.push('/nearby-chat/dashboard')}>
                        <img src={targetUser.image} alt="" className="w-10 h-10 rounded-2xl object-cover border border-white/10" />
                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-background rounded-full ${targetUser.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-white italic uppercase tracking-tight">{targetUser.name}</h2>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
                            {targetUser.status === 'online' ? 'Active Now' : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2.5 rounded-2xl hover:bg-card/50 text-muted-foreground transition-all active:scale-95">
                        <Phone size={20} />
                    </button>
                    <button className="p-2.5 rounded-2xl hover:bg-card/50 text-muted-foreground transition-all active:scale-95">
                        <Video size={20} />
                    </button>
                    <button className="p-2.5 rounded-2xl hover:bg-card/50 text-muted-foreground transition-all active:scale-95">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth no-scrollbar"
            >
                {/* Date Separator */}
                <div className="flex justify-center">
                    <span className="px-4 py-1.5 rounded-full bg-card/40 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                        Today
                    </span>
                </div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div className={`max-w-[80%] space-y-1 ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`p-4 rounded-[2rem] text-sm font-medium shadow-xl ${msg.sender === 'me'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none shadow-primary/20'
                                        : 'bg-card/80 border border-white/5 text-white rounded-tl-none backdrop-blur-md'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <div className={`flex items-center gap-2 px-1 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">{msg.time}</span>
                                {msg.sender === 'me' && <CheckCheck size={12} className="text-primary" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <footer className="p-4 bg-background/80 backdrop-blur-xl border-t border-white/5">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-3 bg-card/40 border border-white/5 rounded-[2.5rem] p-2 pl-4 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
                >
                    <button type="button" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <Paperclip size={20} />
                    </button>

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder:text-muted-foreground py-2"
                    />

                    <button type="button" className="p-2 text-muted-foreground hover:text-accent transition-colors">
                        <Smile size={20} />
                    </button>

                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                    >
                        <Send size={20} className="ml-1" />
                    </button>
                </form>
            </footer>
        </div>
    );
}
