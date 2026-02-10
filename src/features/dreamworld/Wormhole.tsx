import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface WormholeProps {
    onComplete: () => void;
}

export const Wormhole: React.FC<WormholeProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3000); // 3s for the full "Beam Me Up" sequence
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* 1. The "Hollywood Light Mirror" - Blinding White/Blue Background Flash */}
            <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0.8, 1, 0] }} // Flash sequence
                transition={{ duration: 3, times: [0, 0.2, 0.8, 0.9, 1] }}
            />

            {/* 2. The "Beam" - Vertical Electric Blue Pillar */}
            <motion.div
                className="absolute w-[200px] h-[200vh] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-3xl mix-blend-screen"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
            />

            {/* 3. Electric Blue Stars / Pixie Dust Rising */}
            <div className="absolute inset-0 z-20">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute rounded-full bg-cyan-300 shadow-[0_0_10px_#fff]"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            left: `calc(50% + ${(Math.random() - 0.5) * 300}px)`,
                            bottom: '-10%',
                        }}
                        animate={{
                            y: [0, -window.innerHeight * 1.2], // Shoot up
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 1 + Math.random(),
                            delay: Math.random() * 1.5,
                            ease: "easeIn"
                        }}
                    />
                ))}
            </div>

            {/* 4. Magical Fairies (Swirling Particles) */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`fairy-${i}`}
                        className="absolute w-4 h-4 bg-pink-400 rounded-full blur-sm"
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                        animate={{
                            x: [0, Math.cos(i) * 300, 0],
                            y: [0, Math.sin(i) * 300, -500],
                            scale: [0, 2, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.2,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Fairy Trail */}
                        <div className="absolute inset-0 bg-white blur-md animate-ping" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
