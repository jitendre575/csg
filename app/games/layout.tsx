'use client';

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {children}
        </div>
    );
}
