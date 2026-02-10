import React from 'react';
import { motion } from 'framer-motion';

interface DoorCrestProps {
    side: 'left' | 'right';
    onClick?: () => void;
}

export const DoorCrest: React.FC<DoorCrestProps> = ({ side, onClick }) => {
    const isLeft = side === 'left';

    return (
        <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-0' : 'left-0'} w-40 h-80 overflow-hidden pointer-events-none z-50`}>
            {/* 
                The Crest Container 
                We use a negative margin on the inner container to align the two halves perfectly.
                Total width of crest is 320px (160px * 2)
            */}
            <div className={`w-[320px] h-full relative ${isLeft ? 'mr-0' : '-ml-[160px]'}`}>

                {/* Gold Outer Shield/Circle */}
                <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-2xl filter blur-[0.5px]">
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FDE68A" /> {/* Amber 200 */}
                            <stop offset="25%" stopColor="#F59E0B" /> {/* Amber 500 */}
                            <stop offset="50%" stopColor="#FFFBEB" /> {/* Amber 50 */}
                            <stop offset="75%" stopColor="#D97706" /> {/* Amber 600 */}
                            <stop offset="100%" stopColor="#B45309" /> {/* Amber 700 */}
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* The Fancy Container (Shield-ish Circle) */}
                    <circle cx="160" cy="160" r="140" fill="url(#goldGradient)" stroke="#FFF" strokeWidth="4" className="shadow-xl" />
                    <circle cx="160" cy="160" r="130" fill="#E0218A" stroke="#F59E0B" strokeWidth="2" />

                    {/* Decorative Filigree */}
                    <path d="M160 30 Q 220 30, 260 80 T 290 160" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M160 30 Q 100 30, 60 80 T 30 160" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

                    {/* The Royal "B" */}
                    <text x="160" y="210"
                        fontSize="180"
                        fontFamily="'Grand Hotel', cursive"
                        textAnchor="middle"
                        fill="white"
                        stroke="url(#goldGradient)"
                        strokeWidth="3"
                        style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.2))' }}
                    >
                        B
                    </text>

                    {/* Diamond Accents */}
                    <circle cx="160" cy="40" r="8" fill="#E0F2FE" className="animate-pulse" />
                    <circle cx="160" cy="280" r="8" fill="#E0F2FE" className="animate-pulse" />
                    <circle cx="50" cy="160" r="6" fill="#E0F2FE" className="animate-pulse" />
                    <circle cx="270" cy="160" r="6" fill="#E0F2FE" className="animate-pulse" />
                </svg>

                {/* Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-50 mix-blend-overlay" />
            </div>
        </div>
    );
};
