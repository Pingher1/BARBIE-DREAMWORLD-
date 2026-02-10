
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DreamStage = ({ activeMode, activeDoll, activeApp }: { activeMode: 'CARTOON' | 'REALISTIC', activeDoll: string | null, activeApp: string }) => {

    // REAL ASSETS FROM PUBLIC FOLDER
    // Default to doll1 if null, just in case
    const DOLL_SRC = activeDoll || '/assets/dolls/doll1.webp';

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden">

            {/* 1. CINEMATIC OVERLAY (The Movie Glow) */}
            <div className={`absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-1000 ${activeMode === 'REALISTIC' ? 'bg-radial-gradient from-transparent via-pink-500/10 to-purple-900/40 opacity-100' : 'opacity-0'}`} />

            {/* 2. THE DOLL CONTAINER */}
            <div className={`relative transition-all duration-700 ${activeMode === 'CARTOON' ? 'scale-110 filter saturate-125' : 'scale-100 filter contrast-125 brightness-110'
                }`}>

                {/* Bobblehead Logic: Only active in Cartoon Mode */}
                {activeApp === 'BOUTIQUE' || activeApp === 'HOME' ? (
                    <motion.div
                        animate={activeMode === 'CARTOON' ? {
                            rotate: [0, -2, 2, 0],
                            scale: [1, 1.05, 1]
                        } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-[300px] md:w-[400px] h-[500px] md:h-[600px] flex items-center justify-center"
                    >
                        <img
                            src={DOLL_SRC}
                            alt="Active Doll"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                ) : null}

                {/* 3. STAGE FLOOR */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-black/20 blur-xl rounded-[100%]" />
            </div>
        </div>
    );
};
