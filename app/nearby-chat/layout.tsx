import React from 'react';

export default function NearbyChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {children}
        </div>
    );
}
