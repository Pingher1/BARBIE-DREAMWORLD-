import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RibbonSouthProps {
    activeWorld: string;
    onWorldSelect: (world: string) => void;
}

const worlds = [
    { id: 'playground', icon: '🏰', label: 'Playground' },
    { id: 'boutique', icon: '👗', label: 'Boutique' },
    { id: 'pets', icon: '🦄', label: 'Pets' },
    { id: 'karaoke', icon: '🎤', label: 'Karaoke' },
    { id: 'phone', icon: '📱', label: 'Phone' },
];

export const RibbonSouth: React.FC<RibbonSouthProps> = ({ activeWorld, onWorldSelect }) => {
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
                hidden: { y: 80, opacity: 0.6 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-4 right-4 h-32 flex items-end justify-center z-40 pointer-events-none pb-4"
        >
            {/* Handle */}
            {!isHovered && (
                <div className="absolute bottom-24 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer border border-white/30 backdrop-blur-sm animate-bounce">
                    <span className="text-2xl">🔼</span>
                </div>
            )}

            <div className="h-24 bg-white/20 backdrop-blur-2xl border-t border-white/50 border-b border-white/10 rounded-3xl flex items-center justify-center gap-4 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] pointer-events-auto w-full max-w-4xl relative overflow-hidden">
                {/* Molten Gloss Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                {worlds.map((world) => {
                    const isActive = activeWorld === world.id;
                    return (
                        <motion.button
                            key={world.id}
                            whileHover={{ scale: 1.1, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onWorldSelect(world.id)}
                            className={`
                                relative flex flex-col items-center justify-center gap-1
                                w-20 h-20 rounded-2xl transition-all duration-300
                                ${isActive
                                    ? 'bg-gradient-to-b from-white to-pink-50 shadow-[0_4px_0_#d1d5db,0_10px_20px_rgba(236,72,153,0.4)] translate-y-[-4px]'
                                    : 'bg-gradient-to-b from-white/40 to-white/20 hover:from-white/60 hover:to-white/40 shadow-[0_4px_0_rgba(255,255,255,0.2)]'
                                }
                                border border-white/60 backdrop-blur-md
                            `}
                        >
                            <span className="text-4xl filter drop-shadow-sm">{world.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-pink-600' : 'text-white'}`}>
                                {world.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeWorldIndicator"
                                    className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
};
