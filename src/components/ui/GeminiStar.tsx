import React from 'react';

interface GeminiStarProps {
    className?: string;
    size?: number;
    color?: string;
}

export const GeminiStar: React.FC<GeminiStarProps> = ({ className = "", size = 24, color = "white" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="url(#geminiGradient)"
                filter="url(#glow)"
            />
            <defs>
                <linearGradient id="geminiGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4E89FF" /> {/* Gemini Blue */}
                    <stop offset="0.5" stopColor="#9C8CFF" /> {/* Gemini Purple */}
                    <stop offset="1" stopColor="#FFFFFF" /> {/* White core */}
                </linearGradient>
                <filter id="glow" x="-4" y="-4" width="32" height="32" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_123" />
                </filter>
            </defs>
        </svg>
    );
};
