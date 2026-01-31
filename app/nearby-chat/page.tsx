'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NearbyChatEntry() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('nearby_user');
        if (user) {
            router.replace('/nearby-chat/dashboard');
        } else {
            router.replace('/nearby-chat/register');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
    );
}
