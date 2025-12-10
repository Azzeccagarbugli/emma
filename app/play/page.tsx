'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TinderCard from 'react-tinder-card';
import SwipeCard from '@/components/SwipeCard';
import BottomSheet from '@/components/BottomSheet';
import ConfettiTrigger from '@/components/ConfettiTrigger';
import cardsData from '@/data/cards.json';
import type { Card, SwipeDirection } from '@/types';

interface CardRef {
    swipe: (dir?: SwipeDirection) => Promise<void>;
    restoreCard: () => Promise<void>;
}

export default function PlayPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(cardsData.cards.length - 1);
    const [showMatch, setShowMatch] = useState(false);
    const [matchMessage, setMatchMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [matches, setMatches] = useState<number[]>([]);

    // Create refs for each card
    const cardRefs = useRef<(CardRef | null)[]>([]);
    const currentIndexRef = useRef(currentIndex);

    // Keep ref in sync with state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const canSwipe = currentIndex >= 0;

    const swiped = useCallback((direction: string, card: Card, index: number) => {
        const swipeDir = direction as 'left' | 'right';
        const isMatch = card.expectedSwipe === swipeDir;

        if (isMatch) {
            setMatchMessage(card.matchMessage);
            setMatches(prev => [...prev, card.id]);

            // Delay showing the modal slightly for smoother experience
            setTimeout(() => {
                setShowMatch(true);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 100);
            }, 300);
        }

        setCurrentIndex(index - 1);

        // Navigate to conclusion after all cards
        if (index === 0) {
            setTimeout(() => {
                const matchCount = isMatch ? matches.length + 1 : matches.length;
                router.push(`/conclusion?matches=${matchCount}&total=${cardsData.cards.length}`);
            }, isMatch ? 2500 : 800);
        }
    }, [matches.length, router]);

    const outOfFrame = useCallback((idx: number) => {
        // Card has left the screen - clean up ref
        cardRefs.current[idx] = null;
    }, []);

    const swipe = useCallback(async (dir: SwipeDirection) => {
        if (canSwipe && currentIndexRef.current >= 0) {
            const cardRef = cardRefs.current[currentIndexRef.current];
            if (cardRef) {
                await cardRef.swipe(dir);
            }
        }
    }, [canSwipe]);

    const handleCloseMatch = useCallback(() => {
        setShowMatch(false);
    }, []);

    return (
        <main className="min-h-screen min-h-dvh flex flex-col items-center px-4 py-6 relative overflow-hidden">
            {/* Confetti */}
            <ConfettiTrigger trigger={showConfetti} />

            {/* Card stack container - takes up available space and centers cards */}
            <div className="flex-1 w-full max-w-md flex items-center justify-center relative">
                <div className="relative w-full aspect-[3/4] max-h-[500px]">
                    {cardsData.cards.map((card, index) => {
                        // Only render cards that haven't been swiped yet
                        if (index > currentIndex) {
                            return null;
                        }

                        // Calculate stack position (0 = top card, 1 = second, etc.)
                        const stackPosition = currentIndex - index;

                        // Only show top 3 cards in the stack
                        if (stackPosition > 2) {
                            return null;
                        }

                        return (
                            <TinderCard
                                ref={(el: CardRef | null) => {
                                    cardRefs.current[index] = el;
                                }}
                                key={card.id}
                                onSwipe={(dir) => swiped(dir, card as Card, index)}
                                onCardLeftScreen={() => outOfFrame(index)}
                                preventSwipe={['up', 'down']}
                                swipeRequirementType="position"
                                swipeThreshold={50}
                                className="absolute inset-0"
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        zIndex: cardsData.cards.length - stackPosition,
                                        transform: stackPosition === 0
                                            ? 'scale(1) translateY(0)'
                                            : `scale(${1 - stackPosition * 0.04}) translateY(${stackPosition * 8}px)`,
                                        opacity: 1,
                                        pointerEvents: stackPosition === 0 ? 'auto' : 'none',
                                    }}
                                >
                                    <SwipeCard card={card as Card} isTop={stackPosition === 0} />
                                </div>
                            </TinderCard>
                        );
                    })}

                    {/* Empty state */}
                    {currentIndex < 0 && (
                        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                            <div className="text-center">
                                <span className="text-6xl mb-4 block">🎉</span>
                                <p className="text-xl font-bold text-text-dark">All done!</p>
                                <p className="text-text-muted">Redirecting...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom section - buttons stay at bottom */}
            <div className="w-full max-w-md">
                {/* Swipe buttons */}
                <div className="flex justify-center gap-8 mb-4">
                    <button
                        onClick={() => swipe('left')}
                        disabled={!canSwipe}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-coral hover:bg-coral hover:text-white transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed touch-target active:scale-90 hover:scale-105 hover:shadow-xl"
                        aria-label="Swipe left (Nope)"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        onClick={() => swipe('right')}
                        disabled={!canSwipe}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed touch-target active:scale-90 hover:scale-105 hover:shadow-xl"
                        aria-label="Swipe right (Yay)"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>

                {/* Hint text */}
                <p className="text-sm text-text-muted/60 text-center">
                    Swipe or tap the buttons
                </p>
            </div>

            {/* Match bottom sheet */}
            <BottomSheet
                isOpen={showMatch}
                onClose={handleCloseMatch}
                message={matchMessage}
            />
        </main>
    );
}
