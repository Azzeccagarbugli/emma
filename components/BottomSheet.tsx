'use client';

import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export default function BottomSheet({ isOpen, onClose, message }: BottomSheetProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            const animationTimer = setTimeout(() => {
                setIsAnimating(true);
            }, 20);
            return () => clearTimeout(animationTimer);
        } else {
            setIsAnimating(false);
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 400);
            return () => clearTimeout(hideTimer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    const handleBackdropClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleSheetClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 p-4 pb-6 flex items-end justify-center"
            onClick={handleBackdropClick}
        >
            {/* Backdrop with smooth fade */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                style={{
                    opacity: isAnimating ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                }}
            />

            {/* Floating sheet container */}
            <div
                className="relative w-full max-w-md bg-white rounded-3xl p-6 pt-4"
                style={{
                    transform: isAnimating ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.95)',
                    opacity: isAnimating ? 1 : 0,
                    transition: isAnimating
                        ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out'
                        : 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease-out',
                    boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
                onClick={handleSheetClick}
            >
                {/* Handle */}
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 touch-target active:scale-95"
                >
                    <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-text-muted" />
                </button>

                {/* Content with staggered animations */}
                <div className="flex flex-col items-center text-center">
                    {/* Match badge */}
                    <div
                        className="w-18 h-18 bg-gradient-to-br from-bumble to-bumble-dark rounded-full flex items-center justify-center mb-4 shadow-lg"
                        style={{
                            width: '72px',
                            height: '72px',
                            transform: isAnimating ? 'scale(1)' : 'scale(0.5)',
                            opacity: isAnimating ? 1 : 0,
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} className="w-9 h-9 text-white" />
                    </div>

                    <h2
                        className="text-2xl font-black text-text-dark mb-2"
                        style={{
                            transform: isAnimating ? 'translateY(0)' : 'translateY(16px)',
                            opacity: isAnimating ? 1 : 0,
                            transition: 'all 0.4s ease-out 0.15s',
                        }}
                    >
                        It&apos;s a Match! 🎉
                    </h2>

                    <p
                        className="text-base text-text-muted font-medium max-w-xs leading-relaxed"
                        style={{
                            transform: isAnimating ? 'translateY(0)' : 'translateY(16px)',
                            opacity: isAnimating ? 1 : 0,
                            transition: 'all 0.4s ease-out 0.2s',
                        }}
                    >
                        {message}
                    </p>

                    {/* Continue button */}
                    <button
                        onClick={onClose}
                        className="mt-6 w-full bg-bumble hover:bg-bumble-dark text-text-dark font-bold text-lg py-4 px-8 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] touch-target"
                        style={{
                            transform: isAnimating ? 'translateY(0)' : 'translateY(16px)',
                            opacity: isAnimating ? 1 : 0,
                            transition: 'all 0.4s ease-out 0.25s, background-color 0.2s, box-shadow 0.2s',
                        }}
                    >
                        Keep Going! 💪
                    </button>
                </div>
            </div>
        </div>
    );
}
