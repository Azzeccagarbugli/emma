'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faHeart,
    faPizzaSlice,
    faCouch,
    faMountainSun,
    faMugHot,
    faMusic,
    faBookOpen,
    faGamepad,
    faDog,
    faPlane,
} from '@fortawesome/free-solid-svg-icons';
import type { Card } from '@/types';

interface SwipeCardProps {
    card: Card;
    isTop?: boolean;
}

// Map of icon names to their definitions
const iconMap: Record<string, IconDefinition> = {
    'heart': faHeart,
    'pizza-slice': faPizzaSlice,
    'couch': faCouch,
    'mountain-sun': faMountainSun,
    'mug-hot': faMugHot,
    'music': faMusic,
    'book-open': faBookOpen,
    'gamepad': faGamepad,
    'dog': faDog,
    'plane': faPlane,
};

// Helper to get icon from string name
function getIcon(iconName: string): IconDefinition {
    return iconMap[iconName] || faHeart;
}

export default function SwipeCard({ card, isTop = false }: SwipeCardProps) {
    return (
        <div
            className={`
        w-full h-full bg-card rounded-3xl
        flex flex-col items-center justify-center p-8
        border-4 border-white/50
        ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}
      `}
            style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
                boxShadow: isTop
                    ? '0 25px 50px -12px rgba(0,0,0,0.15), 0 12px 24px -8px rgba(0,0,0,0.1)'
                    : '0 10px 25px -5px rgba(0,0,0,0.08)',
                transition: 'box-shadow 0.3s ease-out',
            }}
        >
            {/* Icon container */}
            <div className="w-28 h-28 bg-bumble/10 rounded-full flex items-center justify-center mb-8 relative">
                {isTop && (
                    <div
                        className="absolute inset-0 bg-bumble/10 rounded-full animate-ping-slow"
                    />
                )}
                <FontAwesomeIcon
                    icon={getIcon(card.icon)}
                    className="w-14 h-14 text-bumble relative z-10"
                />
            </div>

            {/* Card text */}
            <p className="text-2xl font-bold text-text-dark text-center leading-snug max-w-[280px]">
                {card.text}
            </p>

            {/* Swipe hints - only show on top card */}
            {isTop && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-between px-8">
                    <div className="flex items-center gap-2 text-coral/40">
                        <span className="text-sm font-semibold">← Nope</span>
                    </div>
                    <div className="flex items-center gap-2 text-teal/40">
                        <span className="text-sm font-semibold">Yay →</span>
                    </div>
                </div>
            )}
        </div>
    );
}
