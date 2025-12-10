'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, Suspense } from 'react';
import confetti from 'canvas-confetti';
import cardsData from '@/data/cards.json';

function ConclusionContent() {
    const searchParams = useSearchParams();
    const matchCount = parseInt(searchParams.get('matches') || '0', 10);
    const totalCards = parseInt(searchParams.get('total') || '10', 10);
    const [isLoaded, setIsLoaded] = useState(false);

    const matchPercentage = Math.round((matchCount / totalCards) * 100);

    // Celebration confetti on load
    useEffect(() => {
        setIsLoaded(true);

        if (matchCount > 0) {
            // Delayed celebration
            const timer = setTimeout(() => {
                const duration = 3000;
                const animationEnd = Date.now() + duration;
                const colors = ['#FFC629', '#FFD75E', '#FF6B6B', '#4ECDC4', '#FFFFFF'];

                const frame = () => {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors,
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors,
                    });

                    if (Date.now() < animationEnd) {
                        requestAnimationFrame(frame);
                    }
                };
                frame();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [matchCount]);

    // Get appropriate message based on match count
    const getMessage = () => {
        if (matchPercentage >= 80) {
            return {
                emoji: '🔥',
                title: cardsData.conclusion.title,
                subtitle: cardsData.conclusion.message,
            };
        } else if (matchPercentage >= 50) {
            return {
                emoji: '✨',
                title: 'Pretty good match!',
                subtitle: "We've got some things in common... let's explore more!",
            };
        } else {
            return {
                emoji: '💭',
                title: 'Opposites attract?',
                subtitle: "Maybe we can learn new things from each other!",
            };
        }
    };

    const message = getMessage();

    return (
        <main className="min-h-screen min-h-dvh flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-8 w-32 h-32 bg-bumble/20 rounded-full blur-2xl" />
                <div className="absolute top-32 right-4 w-24 h-24 bg-coral/20 rounded-full blur-xl" />
                <div className="absolute bottom-32 left-12 w-28 h-28 bg-teal/20 rounded-full blur-xl" />
                <div className="absolute bottom-16 right-16 w-20 h-20 bg-bumble/30 rounded-full blur-lg" />
            </div>

            {/* Top decoration */}
            <div className="flex gap-3 justify-center">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className="text-bumble animate-float"
                        style={{ animationDelay: `${i * 0.2}s` }}
                    >
                        <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                    </span>
                ))}
            </div>

            {/* Main content */}
            <div
                className={`flex flex-col items-center text-center z-10 max-w-sm transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Big emoji/score display */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-bumble to-bumble-dark rounded-full flex items-center justify-center shadow-xl">
                        <span className="text-6xl">{message.emoji}</span>
                    </div>

                    {/* Match badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-4 py-2 shadow-lg">
                        <span className="text-2xl font-black text-bumble-dark">{matchPercentage}%</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-black text-text-dark mb-3 tracking-tight">
                    {message.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-text-muted font-medium leading-relaxed mb-6">
                    {message.subtitle}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 bg-white/60 rounded-2xl px-6 py-4 shadow-sm">
                    <div className="text-center">
                        <p className="text-3xl font-black text-bumble">{matchCount}</p>
                        <p className="text-sm text-text-muted">Matches</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="text-center">
                        <p className="text-3xl font-black text-text-dark">{totalCards}</p>
                        <p className="text-sm text-text-muted">Cards</p>
                    </div>
                </div>
            </div>

            {/* Bottom buttons */}
            <div className="w-full max-w-sm z-10 space-y-3">
                <Link
                    href="/play"
                    className="w-full bg-bumble hover:bg-bumble-dark text-text-dark font-bold text-xl py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 touch-target transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faRotateRight} className="w-5 h-5" />
                    <span>Play Again</span>
                </Link>

                <Link
                    href="/"
                    className="w-full bg-white hover:bg-gray-50 text-text-muted font-semibold text-lg py-4 px-8 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 touch-target transition-all duration-200 border border-gray-100"
                >
                    <span>Back to Start</span>
                </Link>

                <p className="text-center text-text-muted/60 text-sm mt-4">
                    Made with 💛 just for you, Emma
                </p>
            </div>
        </main>
    );
}

export default function ConclusionPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen min-h-dvh flex items-center justify-center">
                <div className="animate-pulse text-bumble text-xl">Loading...</div>
            </main>
        }>
            <ConclusionContent />
        </Suspense>
    );
}

