import React from 'react';
import { motion } from 'framer-motion';
import { splitScreenVariants, pinkSideVariants, whiteSideVariants } from '../animations';
import { DoorCrest } from '../ui/DoorCrest';

interface SplitScreenProps {
    children?: React.ReactNode;
    onUnlock?: () => void;
}

export const SplitScreen: React.FC<SplitScreenProps> = ({ children, onUnlock }) => {
    return (
        <motion.div
            className="flex w-full h-screen overflow-hidden"
            variants={splitScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div
                className="w-1/2 h-full bg-[#FF69B4] flex flex-col items-center justify-center relative border-r-4 border-white z-10"
                variants={pinkSideVariants}
            >
                {/* Pink Side Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
                <DoorCrest side="left" onClick={onUnlock} />
            </motion.div>

            <motion.div
                className="w-1/2 h-full bg-[#FFFFFF] flex flex-col items-center justify-center relative z-0"
                variants={whiteSideVariants}
            >
                {/* White Side Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/30 pointer-events-none" />
                <DoorCrest side="right" onClick={onUnlock} />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {children}
            </div>
        </motion.div>
    );
};
