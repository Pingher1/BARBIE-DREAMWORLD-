import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundManager } from '../../utils/SoundManager';

// Point #8: The Sovereign Toy Chest (Pirate Princess Aesthetic)
// Functions: Asset Anchor for the South-East Corner
interface ToyChestProps {
    onClick?: () => void;
}

export const ToyChest: React.FC<ToyChestProps> = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChest = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            SoundManager.playSuccess(); // Placeholder for "Chest Open" sound
        } else {
            SoundManager.playClick();
        }
        if (onClick) onClick();
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 pointer-events-auto">
            <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChest}
            >
                {/* The Aura: Golden Glow */}
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 animate-pulse rounded-full" />

                {/* The Chest Container */}
                <div className="relative w-24 h-20">
                    {/* The Lid (Animated) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#F59E0B] to-[#D97706] rounded-t-xl border-t-2 border-l-2 border-r-2 border-[#FEF3C7] z-20 origin-bottom"
                        animate={{
                            rotateX: isOpen ? -110 : 0,
                            y: isOpen ? -5 : 0
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Lid Detail: The Royal lock */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-[#E0218A] rounded-t-lg border border-yellow-200" />
                    </motion.div>

                    {/* The Base (Body) */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-[#D97706] to-[#92400E] rounded-b-xl border-2 border-[#FEF3C7] z-10 flex items-center justify-center overflow-hidden">
                        {/* Wood Grain / Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                        {/* The Jewel (Pirate Treasure) */}
                        <div className="w-8 h-8 bg-gradient-to-br from-[#E0218A] to-[#831843] rotate-45 border-2 border-white/50 shadow-[0_0_10px_#E0218A]" />
                    </div>

                    {/* The Treasure (Inner Contents - Visible when open) */}
                    <motion.div
                        className="absolute top-4 left-2 w-20 h-10 flex justify-center items-end z-0"
                        animate={{ y: isOpen ? -15 : 0, opacity: isOpen ? 1 : 0 }}
                    >
                        {/* Asset #2: Barbie Basics Kit (From Scan) */}
                        <div className="flex flex-col items-center animate-bounce">
                            <span className="text-4xl filter drop-shadow-md">👗</span>
                            <span className="text-[9px] text-white font-bold bg-[#E0218A] px-2 py-0.5 rounded-full mt-1 border border-white/50 tracking-wide">BASICS KIT</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
