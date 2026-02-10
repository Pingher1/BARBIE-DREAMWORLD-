import React from 'react';
import { motion } from 'framer-motion';

// The "Vlog Aesthetic" Title Component
// Point #7: Hand-drawn marker font on rough paint strokes
interface PaintStrokeTitleProps {
    title: string;
    subtitle?: string;
    className?: string; // For positioning
}

export const PaintStrokeTitle: React.FC<PaintStrokeTitleProps> = ({ title, subtitle, className = "" }) => {
    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            {/* Layer 1: The Rough Paint Stroke (Background) */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "circOut", delay: 0.2 }}
                className="absolute inset-0 bg-white transform -skew-x-12 scale-110 rotate-[-2deg] z-0"
                style={{
                    clipPath: "polygon(2% 0%, 95% 5%, 100% 90%, 5% 100%, 0% 10%)", // Rough cut
                    filter: "drop-shadow(0px 10px 0px rgba(0,0,0,0.1))"
                }}
            />
            {/* Layer 1.5: Secondary Stoke (Messy overlap) */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.7 }}
                transition={{ duration: 0.3, ease: "circOut", delay: 0.3 }}
                className="absolute inset-0 bg-white/50 transform skew-x-12 scale-105 rotate-[1deg] z-0"
                style={{
                    clipPath: "polygon(5% 5%, 90% 0%, 95% 95%, 0% 90%)",
                }}
            />

            {/* Layer 2: The Text (The "Marker" Font) */}
            <motion.h1
                initial={{ y: 20, opacity: 0, rotate: 5 }}
                animate={{ y: 0, opacity: 1, rotate: -2 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: 0.4
                }}
                className="relative z-10 text-7xl md:text-9xl font-['Amatic_SC'] font-bold text-black tracking-widest uppercase text-center leading-none"
                style={{
                    textShadow: "2px 2px 0px rgba(224,33,138,0.2)" // Subtle pink shadow
                }}
            >
                {title}
            </motion.h1>

            {/* Layer 3: The Subtitle (Washi Tape Style) */}
            {subtitle && (
                <motion.div
                    initial={{ y: -10, opacity: 0, rotate: -3 }}
                    animate={{ y: 15, opacity: 1, rotate: 2 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative z-20 bg-[#00FFFF] px-4 py-1 transform rotate-2 mt-2 shadow-md"
                    style={{
                        maskImage: "linear-gradient(45deg, transparent 5%, black 5%, black 95%, transparent 95%)", // Tape edges
                    }}
                >
                    <span className="font-['Patrick_Hand'] text-black font-bold text-xl tracking-wider">
                        {subtitle}
                    </span>
                </motion.div>
            )}
        </div>
    );
};
