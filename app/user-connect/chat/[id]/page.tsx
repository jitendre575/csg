'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { Send, ArrowLeft, MoreVertical, Shield, Trash2, Clock, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
    _id: string;
    sender: string;
    receiver: string;
    text: string;
    createdAt: string;
}

interface User {
    _id: string;
    name: string;
    profilePhoto: string;
    isOnline: boolean;
    lastSeen: string;
}

export default function ChatPage() {
    const router = useRouter();
    const params = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [receiver, setReceiver] = useState<User | null>(null);
    const [typing, setTyping] = useState(false);
    const [isReceiverTyping, setIsReceiverTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        if (!token || !user.id) {
            router.push('/user-connect');
            return;
        }
        setCurrentUser(user);

        // Fetch receiver details
        const fetchReceiver = async () => {
            const res = await fetch(`http://localhost:5000/api/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const found = data.find((u: any) => u._id === params.id);
                setReceiver(found);
            }
        };
        fetchReceiver();

        // Fetch chat history
        const fetchHistory = async () => {
            const res = await fetch(`http://localhost:5000/api/chats/${params.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        };
        fetchHistory();

        // Socket setup
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.emit('join', user.id);

        newSocket.on('receiveMessage', (message: Message) => {
            if (message.sender === params.id) {
                setMessages((prev) => [...prev, message]);
                setIsReceiverTyping(false);
            }
        });

        newSocket.on('messageSent', (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        newSocket.on('displayTyping', (data: any) => {
            if (data.sender === params.id) {
                setIsReceiverTyping(true);
                setTimeout(() => setIsReceiverTyping(false), 3000);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [params.id, router]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket || !currentUser) return;

        socket.emit('sendMessage', {
            sender: currentUser.id,
            receiver: params.id,
            text: newMessage
        });

        setNewMessage('');
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
        if (!socket || !currentUser) return;

        socket.emit('typing', {
            sender: currentUser.id,
            receiver: params.id
        });
    };

    if (!receiver) return null;

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Chat Header */}
            <header className="p-4 bg-card/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="relative">
                        <img src={receiver.profilePhoto} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${receiver.isOnline ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase italic tracking-tighter leading-none">{receiver.name}</h2>
                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                            {isReceiverTyping ? (
                                <span className="text-primary italic animate-pulse">Typing...</span>
                            ) : (
                                receiver.isOnline ? 'Online Now' : `Last seen ${new Date(receiver.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {currentUser?.role === 'admin' && (
                        <button className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors" title="Block/Delete User">
                            <Shield size={20} />
                        </button>
                    )}
                    <button className="p-2 hover:bg-white/5 text-muted-foreground hover:text-white rounded-full transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
                {messages.map((msg, index) => {
                    const isMine = msg.sender === currentUser?.id;
                    return (
                        <div key={msg._id || index} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`max-w-[75%] space-y-1`}>
                                <div
                                    className={`px-4 py-3 rounded-2xl text-sm font-medium shadow-xl ${isMine
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-card/60 backdrop-blur-md border border-white/5 text-white rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <div className={`flex items-center gap-1 ${isMine ? 'justify-end' : 'justify-start'} text-[8px] font-black uppercase tracking-widest text-muted-foreground opacity-50`}>
                                    <Clock size={8} />
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="p-4 bg-card/40 backdrop-blur-xl border-t border-white/5">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleTyping}
                        placeholder="Type a message..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none backdrop-blur-md"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-110 active:scale-90 disabled:opacity-50 disabled:scale-100"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <p className="text-center text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-4 opacity-30">
                    End-to-End Encrypted Chat
                </p>
            </footer>
        </div>
    );
}
