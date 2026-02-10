import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PrismWipe = ({ onWipeComplete }: { onWipeComplete?: () => void }) => {
    const [isActive, setIsActive] = useState(true);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ left: '-10%' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                        setIsActive(false);
                        if (onWipeComplete) onWipeComplete();
                    }}
                    className="absolute top-0 bottom-0 z-50 pointer-events-none"
                    style={{ width: '60px' }}
                >
                    <div className="w-full h-full relative prism-wand-core">
                        {/* Core White Hot Center handled by CSS class now, but keeping structure for layering */}

                        {/* Layer 2: Pink/Purple Aura */}
                        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60 blur-sm z-10" />

                        {/* Layer 3: The "Prism" Refraction (Rainbow edges) */}
                        <div className="absolute inset-y-0 -left-6 w-6 bg-gradient-to-l from-cyan-300 to-transparent opacity-40 blur-md" />
                        <div className="absolute inset-y-0 -right-6 w-6 bg-gradient-to-r from-yellow-300 to-transparent opacity-40 blur-md" />

                        {/* Sparkle Trail could be added here later */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
