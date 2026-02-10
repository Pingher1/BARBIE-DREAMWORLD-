import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import castleBg from '../../assets/castle-bg.png';
import parisBg from '../../assets/paris-bg.png';
import beachBg from '../../assets/beach-bg.png';

interface RibbonEastProps {
    onBackgroundSelect?: (bg: string) => void;
}

const categories = [
    { id: 'dolls', icon: '💃', label: 'Dolls' },
    { id: 'hair', icon: '💇‍♀️', label: 'Hair' },
    { id: 'tops', icon: '👚', label: 'Tops' },
    { id: 'bottoms', icon: '👖', label: 'Bottoms' },
    { id: 'shoes', icon: '👠', label: 'Shoes' },
    { id: 'accessories', icon: '👜', label: 'Extras' },
];

const backdrops = [
    { id: 'castle', image: castleBg, label: 'Castle' },
    { id: 'paris', image: parisBg, label: 'Paris' },
    { id: 'beach', image: beachBg, label: 'Beach' },
    { id: 'vegas', image: castleBg, label: 'Vegas' }, // Using Castle as placeholder for Vegas
];

export const RibbonEast: React.FC<RibbonEastProps> = ({ onBackgroundSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            whileHover="visible"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            variants={{
                visible: { x: 0, opacity: 1 },
                hidden: { x: 60, opacity: 0.6 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-24 bottom-32 w-32 flex items-center justify-end z-40 pointer-events-none pr-4"
        >
            {/* Handle */}
            {!isHovered && (
                <div className="absolute right-24 w-10 h-16 bg-white/20 rounded-l-xl flex items-center justify-center pointer-events-auto cursor-pointer border border-white/30 backdrop-blur-sm">
                    <span className="text-xl">◀️</span>
                </div>
            )}

            <div className="flex flex-col items-center gap-4 pointer-events-auto">
                {/* Scenery Selector Pill */}
                <div className="relative group">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(activeCategory === 'scenery' ? null : 'scenery')}
                        className="w-20 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white text-white font-bold"
                    >
                        🖼️
                    </motion.button>

                    {/* Expanded Scenery Grid */}
                    <AnimatePresence>
                        {activeCategory === 'scenery' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: -140, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                className="absolute right-0 top-0 bg-white/80 backdrop-blur-xl rounded-2xl p-2 w-64 shadow-2xl border border-white grid grid-cols-2 gap-2"
                            >
                                <div className="col-span-2 text-center text-xs font-bold text-pink-600 uppercase tracking-widest mb-1">Select Backdrop</div>
                                {backdrops.map((bg) => (
                                    <button
                                        key={bg.id}
                                        onClick={() => {
                                            if (onBackgroundSelect) onBackgroundSelect(bg.image);
                                            setActiveCategory(null);
                                        }}
                                        className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-pink-500 hover:scale-105 transition-all group/item"
                                    >
                                        <img src={bg.image} alt={bg.label} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            <span className="text-white font-bold text-xs">{bg.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-16 h-px bg-white/50 my-2" />

                {/* Standard Categories */}
                <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-full flex flex-col items-center py-4 gap-4 shadow-lg px-2">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 bg-white/40 rounded-full flex items-center justify-center text-2xl shadow-sm border border-white/30 hover:bg-white/60 transition-colors"
                        >
                            {cat.icon}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
