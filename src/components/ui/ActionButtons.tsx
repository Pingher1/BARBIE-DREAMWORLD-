import React from 'react';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
    onNext: () => void;
    disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onNext, disabled }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={disabled}
            className={`
                px-8 py-3 rounded-full text-xl font-bold tracking-wider
                bg-gradient-to-r from-pink-400 to-rose-500
                text-white shadow-lg border border-white/20
                flex items-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed
                mt-8
            `}
        >
            NEXT <span className="text-2xl">🖌️</span>
        </motion.button>
    );
};
