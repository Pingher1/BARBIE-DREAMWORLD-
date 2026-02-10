import React from 'react';
import { motion } from 'framer-motion';

export const DoorCrest: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`relative w-32 h-32 ${className}`}>
            {/* The Sovereign "B" Monogram - Liquid, Looped, Royal */}
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_var(--digital-pink)]">
                <defs>
                    <linearGradient id="crestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gemini-gold)" /> {/* Gold */}
                        <stop offset="50%" stopColor="var(--barbie-pink)" /> {/* Core Pink */}
                        <stop offset="100%" stopColor="var(--gemini-gold)" /> {/* Gold */}
                    </linearGradient>
                </defs>

                {/* The "B" Path - Authentic Barbie Script Approximation (Looped, Slanted, Thick/Thin) */}
                <motion.path
                    d="M 25 85 C 20 85 15 80 15 70 C 15 50 25 35 35 25 C 40 20 50 15 60 15 C 75 15 85 25 85 45 C 85 60 75 70 65 70 C 75 70 85 75 85 85 C 85 95 75 100 60 100 C 40 100 30 90 25 85 Z M 35 55 C 30 60 30 70 30 75 C 30 80 35 85 45 85 C 55 85 60 80 60 70 C 60 60 50 55 45 55 Z M 40 30 C 35 35 35 45 35 50 C 45 50 55 45 55 35 C 55 25 45 25 40 30 Z"
                    fill="url(#crestGradient)"
                    stroke="var(--pure-white)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                    animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                    transition={{ duration: 2.5, ease: "anticipate" }}
                    transform="rotate(-10 50 50)"
                />

                {/* Decorative Crown/Sparkles */}
                <motion.path
                    d="M 30 5 L 40 0 L 50 5 L 60 0 L 70 5"
                    stroke="var(--gemini-gold)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                />
            </svg>
        </div>
    );
};
