import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { GeminiStar } from '../ui/GeminiStar';

const Bubble = ({ index }: { index: number }) => {
    const size = Math.random() * 60 + 20; // Big soft bubbles
    const duration = Math.random() * 10 + 10; // Slow float

    return (
        <motion.div
            className="absolute rounded-full border border-white/30 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-[1px]"
            style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
            }}
            initial={{ bottom: -100, opacity: 0 }}
            animate={{
                bottom: '120%',
                opacity: [0, 0.4, 0],
                x: [0, Math.sin(index) * 50, 0] // Gentle sway
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
            }}
        />
    );
};

export const ParticleEffects = () => {
    const springConfig = { damping: 25, stiffness: 120 };
    const mouseX = useSpring(useMotionValue(0), springConfig);
    const mouseY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {/* 1. The Heirloom Bubbles (From Photo) */}
            {[...Array(15)].map((_, i) => (
                <Bubble key={`bubble-${i}`} index={i} />
            ))}

            {/* 2. Ambient "God Particles" - The Gemini Sparkles (User Request) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.5 + 0.3
                    }}
                    animate={{
                        y: [null, Math.random() * -100], // Float up mainly
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.5, 1.2, 0.5], // Pulse
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <GeminiStar size={Math.random() * 20 + 10} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
            ))}

            {/* Interactive "God Mode" Cursor Follower - Soft Pink Glow now */}
            <motion.div
                className="absolute w-32 h-32 bg-gradient-radial from-pink-400/20 to-transparent blur-xl rounded-full pointer-events-none mix-blend-screen"
                style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            />
        </div>

    );
};
