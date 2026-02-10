import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualKeyboardProps {
    onKeyPress: (key: string) => void;
}

const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
    return (
        <div className="flex flex-col items-center gap-2 mt-8">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((key) => (
                        <motion.button
                            key={key}
                            whileHover={{ scale: 1.1, translateY: -2 }}
                            whileTap={{ scale: 0.95, translateY: 2 }}
                            onClick={() => onKeyPress(key)}
                            className={`
                                w-10 h-10 md:w-12 md:h-12 rounded-xl
                                bg-gradient-to-br from-pink-400 via-rose-400 to-pink-600
                                text-white font-black text-lg
                                shadow-[0_4px_0_rgb(160,50,100)] active:shadow-none active:translate-y-1
                                border-2 border-white/50
                                flex items-center justify-center
                                transition-all
                                ${key === 'DEL' ? 'from-red-400 via-red-500 to-red-600 shadow-[0_4px_0_rgb(150,20,20)]' : ''}
                            `}
                        >
                            {key}
                        </motion.button>
                    ))}
                </div>
            ))}
        </div>
    );
};
