import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitScreen } from '../../components/layout/SplitScreen';
import { Wormhole } from './Wormhole';

import { SoundManager } from '../../utils/SoundManager';

interface WelcomeScreenProps {
    onEnter: (name: string) => void;
}

import { useJoshuaGrid } from './useJoshuaGrid';
import { LogicGrid } from '../../components/ui/LogicGrid';
import { MagicBubbles } from '../../components/MagicBubbles';
import { DoorCrest } from './DoorCrest';
import { PaintStrokeTitle } from '../../components/ui/PaintStrokeTitle';

// The Book of Names (Point #3)
const VALID_NAMES = [
    'YARA', 'HARMONY', 'MERA', 'KATELYN',
    'PHIL', 'PHILLIP', 'PJR', 'KURT', 'LARRAINE',
    'FRED', 'JOHN', 'BOAT'
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
    const [inputValue, setInputValue] = useState('PRINCESS'); // Default placeholder
    const [isWiping, setIsWiping] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const { worldTree } = useJoshuaGrid();

    // Check for match whenever input changes
    React.useEffect(() => {
        // Clean default text if user starts typing (basic logic handled in click, but strict check here)
        if (VALID_NAMES.includes(inputValue)) {
            if (!isValidName) {
                // Victory Moment! (Only trigger once when it becomes valid)
                SoundManager.playSuccess();
                setIsValidName(true);
            }
        } else {
            setIsValidName(false);
        }
    }, [inputValue]);

    const handleKeyPress = (key: string) => {
        // If placeholder exists, clear it on first keypress roughly, 
        // but for now we rely on the CLEAR button or backspace as per previous logic.
        // Actually, let's make it smoother: 
        let newVal = inputValue;
        if (inputValue === 'PRINCESS') newVal = '';

        if (key === 'DEL') {
            newVal = newVal.slice(0, -1);
        } else {
            if (newVal.length < 12) newVal += key;
        }

        setInputValue(newVal);
        SoundManager.playClick();
    };


    const handleEnter = () => {
        if (isValidName) {
            SoundManager.playTeleport(); // ACTIVATE WORMHOLE!
            setIsWiping(true);
        } else {
            SoundManager.playClick(); // Or error buzzer?
        }
    };

    const handleWipeComplete = () => {
        onEnter(inputValue);
    };

    // ... (render) ...



    return (
        <motion.div
            className="relative w-full h-screen bg-transparent" // Transparent so we can see what's behind if needed, but SplitScreen covers it
            exit={{ opacity: 0, pointerEvents: 'none', transition: { delay: 1 } }} // Fade out container after doors open
        >
            {/* The Sovereign Wireframe: Logic Grid Background */}
            <LogicGrid data={worldTree} className="z-0 opacity-40 mix-blend-screen" />

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div className="absolute top-10 left-10 text-4xl animate-bounce">✨</div>
                <div className="absolute bottom-20 right-20 text-4xl animate-pulse">💖</div>
                <div className="absolute top-1/2 left-1/4 text-4xl animate-ping opacity-20">🦋</div>
            </div>

            <SplitScreen onUnlock={handleEnter}>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
                    {/* Logo Area */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="text-center mb-8 pointer-events-auto"
                    >
                        {/* Sovereign Title Block (Point #5: The Royal Standard) */}
                        <div className="flex flex-col items-center mt-12 mb-4">
                            {/* Row 1: The Crest + "arbie" */}
                            <div className="flex items-end justify-center -ml-8">
                                {/* The "B" is the Crest itself */}
                                <DoorCrest className="w-32 h-32 z-20 -mr-4 drop-shadow-[0_0_20px_var(--digital-pink)]" />

                                <h1 className="text-8xl text-barbie-pink font-['Grand_Hotel'] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 -mb-2">
                                    arbie
                                </h1>
                            </div>

                            {/* Row 2: DREAMWORLD (Structured) */}
                            <h2 className="text-5xl font-bold text-white tracking-[0.3em] uppercase drop-shadow-md -mt-4 z-10">
                                DREAMWORLD
                            </h2>
                            {/* Row 3: The Greeting */}
                            <p className="text-white/90 text-sm tracking-[0.2em] mt-4 font-light border-t border-white/30 pt-2 px-8">
                                WELCOME HARMONY & YARA
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Input Area (The "Curtain Call") */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="bg-white/20 backdrop-blur-lg border border-white/40 rounded-3xl p-8 w-full max-w-lg text-center shadow-2xl pointer-events-auto mx-4 relative overflow-hidden"
                    >
                        {/* Falling Bubbles inside the Input Card for excitement */}
                        <div className="absolute inset-0 pointer-events-none opacity-50">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-white rounded-full"
                                    initial={{ y: -20, x: Math.random() * 400, width: 10, height: 10, opacity: 0 }}
                                    animate={{ y: 200, opacity: [0, 1, 0] }}
                                    transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                                />
                            ))}
                        </div>

                        <p className="text-white/80 text-xs tracking-widest mb-2 font-bold uppercase">
                            WELCOME PRINCESS, WHAT'S YOUR NAME?
                        </p>
                        <div className="bg-black/20 rounded-xl p-4 border border-white/10 flex items-center justify-center gap-4 min-h-[80px]">
                            {/* The Sovereign Brand: The Three Twinkling Stars (Gemini/Sparkle) */}
                            <span className="text-4xl filter drop-shadow-lg animate-pulse">
                                ✨
                            </span>

                            {/* The Name Input Display - BIGGER */}
                            <h2 className="text-6xl font-['Grand_Hotel'] text-white tracking-wide text-shadow-glow flex items-baseline">
                                {inputValue}
                            </h2>
                        </div>
                    </motion.div>

                    {/* Keyboard & Actions */}
                    <div className="pointer-events-auto flex flex-col items-center mt-8 w-full max-w-4xl px-4">
                        <motion.div exit={{ y: 100, opacity: 0 }} className="w-full">
                            {/* Liquid Light Virtual Keyboard */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6 p-4 w-full max-w-3xl">
                                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((char) => (
                                    <motion.button
                                        key={char}
                                        whileHover={{ y: -5, scale: 1.1, filter: "brightness(1.2)" }}
                                        whileTap={{ scale: 0.95, y: 0 }}
                                        onClick={() => {
                                            if (inputValue === 'PRINCESS') {
                                                setInputValue(char);
                                                SoundManager.speakLetter(char);
                                                SoundManager.playClick();
                                            } else if (inputValue.length < 12) {
                                                setInputValue(prev => prev + char);
                                                SoundManager.speakLetter(char);
                                                SoundManager.playClick();
                                            }
                                        }}
                                        className="
                                            w-10 h-10 rounded-xl
                                            bg-gradient-to-br from-[#E0218A] via-[#F472B6] to-[#F59E0B]
                                            shadow-[0_2px_0_#9D174D,0_4px_10px_rgba(245,158,11,0.3)]
                                            text-white font-bold text-lg font-['Montserrat']
                                            flex items-center justify-center
                                            overflow-hidden
                                            group
                                            transition-all duration-300
                                            border-t border-white/40
                                        "
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-80" />
                                        <span className="relative z-10 drop-shadow-md">{char}</span>
                                    </motion.button>
                                ))}

                                {/* CLEAR Button - Compact */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (inputValue === 'PRINCESS') return;
                                        setInputValue(prev => prev.slice(0, -1));
                                    }}
                                    className="
                                        w-20 h-10 rounded-xl
                                        bg-white/10 backdrop-blur-md border border-white/20
                                        text-white font-bold tracking-widest text-[10px] uppercase
                                        hover:bg-white/20 hover:border-white/40
                                        transition-all duration-300
                                        flex items-center justify-center
                                        shadow-lg
                                   "
                                >
                                    CLEAR
                                </motion.button>
                            </div>

                            {/* THE SLEEK IGNITE "SPACEBAR" (Slender Pill - Point #2 Refined) */}
                            <div className="px-12 pb-8 w-full flex justify-center">
                                <motion.button
                                    whileHover={inputValue.length >= 4 ? { scale: 1.02, filter: "brightness(1.1)" } : {}}
                                    whileTap={inputValue.length >= 4 ? { scale: 0.98 } : {}}
                                    onClick={() => {
                                        if (inputValue.length >= 4) {
                                            SoundManager.speakWelcome(inputValue); // "Welcome to Barbie's World, [Name]"
                                            handleEnter();
                                        } else {
                                            // Feedback: "Need more letters!"
                                            SoundManager.playClick();
                                        }
                                    }}
                                    style={{
                                        opacity: inputValue.length >= 4 ? 1 : 0.5,
                                        cursor: inputValue.length >= 4 ? 'pointer' : 'not-allowed'
                                    }}
                                    className="
                                        w-full max-w-2xl h-12 rounded-full
                                        relative overflow-hidden
                                        bg-gradient-to-r from-[#F59E0B] via-[#E0218A] to-[#F59E0B]
                                        background-animate
                                        text-white font-bold text-sm tracking-[0.3em] uppercase
                                        shadow-[0_0_20px_rgba(224,33,138,0.5)]
                                        flex items-center justify-center
                                        transition-all duration-300
                                        border border-white/30
                                   "
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                                    <span className="z-10 drop-shadow-sm flex items-center gap-2">
                                        ✨ {inputValue.length >= 4 ? "OPEN THE GATES" : "TYPE YOUR NAME..."} ✨
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>



                    {/* Footer Elements: Falling "Curtain" Bubbles */}
                    {/* Replaced by The "MagicBubbles" Component (Point #4) */}
                    <MagicBubbles />
                </div>
            </SplitScreen>

            {isWiping && (
                <Wormhole onComplete={handleWipeComplete} />
            )}
        </motion.div>
    );
};
