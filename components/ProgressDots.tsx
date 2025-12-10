'use client';

interface ProgressDotsProps {
    total: number;
    current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`
            h-2 rounded-full transition-all duration-300
            ${index < current
                            ? 'w-2 bg-bumble'
                            : index === current
                                ? 'w-6 bg-bumble'
                                : 'w-2 bg-gray-300'
                        }
          `}
                />
            ))}
        </div>
    );
}

