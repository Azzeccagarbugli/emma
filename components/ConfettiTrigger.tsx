'use client';

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiTriggerProps {
    trigger: boolean;
}

export default function ConfettiTrigger({ trigger }: ConfettiTriggerProps) {
    const fireConfetti = useCallback(() => {
        // Bumble-themed colors
        const colors = ['#FFC629', '#FFD75E', '#FF6B6B', '#4ECDC4', '#FFFFFF'];

        // Fire from both sides
        const leftConfetti = confetti({
            particleCount: 50,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.7 },
            colors,
            startVelocity: 45,
            gravity: 1,
            drift: 0,
            ticks: 200,
            shapes: ['circle', 'square'],
            scalar: 1.2,
        });

        const rightConfetti = confetti({
            particleCount: 50,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.7 },
            colors,
            startVelocity: 45,
            gravity: 1,
            drift: 0,
            ticks: 200,
            shapes: ['circle', 'square'],
            scalar: 1.2,
        });

        // Center burst
        const centerConfetti = confetti({
            particleCount: 80,
            angle: 90,
            spread: 120,
            origin: { x: 0.5, y: 0.6 },
            colors,
            startVelocity: 50,
            gravity: 1.2,
            ticks: 200,
            shapes: ['circle', 'square'],
            scalar: 1.4,
        });

        return Promise.all([leftConfetti, rightConfetti, centerConfetti]);
    }, []);

    useEffect(() => {
        if (trigger) {
            fireConfetti();
        }
    }, [trigger, fireConfetti]);

    return null;
}

