import React from 'react';
import { motion } from 'framer-motion';

interface ShowcaseStageProps {
    children: React.ReactNode;
    isActive: boolean;
}

export const ShowcaseStage: React.FC<ShowcaseStageProps> = ({ children, isActive }) => {
    return (
        <div className="relative group perspective-1000">
            {/* The "Infinite Light" - now blends with the bright world, adding extra localized intensity */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[900px] h-[900px] 
                bg-gradient-radial from-white via-white/40 to-transparent 
                blur-[80px] rounded-full 
                transition-all duration-[2000ms] 
                mix-blend-screen
                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `} style={{ pointerEvents: 'none' }} />

            {/* Iridescent Aura - Stronger colors to pop against the white/pink background */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[700px] h-[700px]
                bg-gradient-conic from-rose-400/20 via-blue-300/20 to-rose-400/20
                blur-[80px] rounded-full
                animate-spin-slow
                opacity-60 mix-blend-multiply
            `} style={{ pointerEvents: 'none', animationDuration: '25s' }} />

            {/* The "Zero Point" Grounding Shadow (The Disc) - Needs to be distinct on light floor */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-[#8B4513]/20 blur-md rounded-[100%] scale-x-150 pointer-events-none mix-blend-multiply" />

            {/* Reflective Highlights on the "Floor" */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white/80 to-transparent opacity-50 pointer-events-none" />

            {/* The Object (Doll) */}
            <div className="relative z-10 transition-transform duration-700 hover:scale-105 drop-shadow-2xl">
                {children}
            </div>
        </div>
    );
};
