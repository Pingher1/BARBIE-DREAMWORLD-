import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const RibbonNorth: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            whileHover="visible"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -60, opacity: 0.5 } // Peeking slightly or fully hidden with a handle
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-4 right-4 h-20 pt-4 z-40 flex justify-center pointer-events-none"
        >
            {/* The Actual Ribbon (Pointer events auto to catch hover) */}
            <div className="w-full h-16 bg-white/30 backdrop-blur-xl border border-white/50 rounded-full flex items-center justify-between px-8 shadow-lg pointer-events-auto cursor-pointer">
                {/* Left: User/Profile */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-yellow-300 rounded-full border-2 border-white shadow-sm" />
                    <span className="text-white font-bold text-lg drop-shadow-md">Princess I</span>
                </div>

                {/* Center: Title/Status */}
                <div className="text-white font-bold tracking-widest uppercase text-sm opacity-80">
                    Dreamworld OS v1.0
                </div>

                {/* Right: System Icons */}
                <div className="flex gap-4 text-2xl">
                    <span>🔋</span>
                    <span>📶</span>
                </div>
            </div>

            {/* Handle to pull it down if hidden */}
            {!isHovered && (
                <div className="absolute top-16 w-32 h-6 bg-white/20 rounded-b-xl flex items-center justify-center pointer-events-auto cursor-pointer border-b border-l border-r border-white/30 backdrop-blur-sm">
                    <span className="text-xs text-white">🔽</span>
                </div>
            )}
        </motion.div>
    );
};
