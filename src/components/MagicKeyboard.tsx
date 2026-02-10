
import React, { useState } from 'react';
import { Delete, Key, Star } from 'lucide-react';

export const MagicKeyboard = ({ onUnlock }: { onUnlock: (name: string) => void }) => {
    const [name, setName] = useState('');

    const handleKeyPress = (char: string) => {
        if (name.length < 12) {
            setName((prev) => prev + char);
            // Placeholder for Phonics Sound: /assets/sounds/A.mp3
            console.log(`🔊 Phonics: ${char}`);
        }
    };

    const handleDelete = () => {
        setName((prev) => prev.slice(0, -1));
    };

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden z-[100]">

            {/* BACKGROUND DECOR */}
            <div className="absolute top-10 left-10 animate-bounce delay-700 opacity-50"><Star className="text-yellow-400" size={40} /></div>
            <div className="absolute top-20 right-20 animate-bounce delay-1000 opacity-50"><Star className="text-pink-400" size={30} /></div>

            {/* 1. TITLE SEQUENCE */}
            <div className="text-center mb-8 relative z-10">
                <h3 className="text-pink-600 font-bold tracking-[0.4em] uppercase text-xs mb-2 animate-pulse">
                    Welcome to Barbie's World
                </h3>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 drop-shadow-sm" style={{ fontFamily: 'cursive' }}>
                    Start Dreaming
                </h1>
            </div>

            {/* 2. NAME DISPLAY */}
            <div className="mb-10 relative group">
                <div className="bg-white border-[6px] border-pink-300 rounded-full h-24 min-w-[320px] flex items-center justify-center shadow-2xl px-8 transform transition-transform group-hover:scale-105">
                    {name ? (
                        <span className="text-5xl font-black text-pink-600 tracking-widest">{name}</span>
                    ) : (
                        <span className="text-4xl font-black text-gray-200 animate-pulse">TYPE NAME</span>
                    )}
                </div>
            </div>

            {/* 3. THE 3D "CHUNKY" KEYBOARD */}
            <div className="bg-[#fdf2f8] p-8 rounded-[3rem] border-[8px] border-white shadow-2xl max-w-5xl relative z-10">
                <div className="flex flex-wrap justify-center gap-3">
                    {letters.map((char) => (
                        <button
                            key={char}
                            onClick={() => handleKeyPress(char)}
                            // THE 3D CSS LOGIC
                            className="
                w-10 h-10 md:w-16 md:h-16 rounded-2xl 
                bg-[#eecfa1] 
                border-b-[4px] md:border-b-[6px] border-r-[2px] border-[#8b4513] 
                text-[#5d4037] font-black text-lg md:text-2xl 
                shadow-lg hover:brightness-110 active:border-b-0 active:translate-y-1.5 transition-all
                flex items-center justify-center
              "
                        >
                            {char}
                        </button>
                    ))}

                    <button
                        onClick={handleDelete}
                        className="w-14 h-10 md:w-16 md:h-16 rounded-2xl bg-pink-200 border-b-[4px] md:border-b-[6px] border-r-[2px] border-pink-600 text-pink-700 hover:brightness-110 active:border-b-0 active:translate-y-1.5 transition-all flex items-center justify-center"
                    >
                        <Delete size={24} />
                    </button>
                </div>
            </div>

            {/* 4. THE BOUNCING BRASS KEY */}
            {name.length > 0 && (
                <div className="mt-12 animate-bounce cursor-pointer z-50">
                    <button
                        onClick={() => onUnlock(name)}
                        className="group relative flex flex-col items-center transition-transform hover:scale-110"
                    >
                        <div className="
              relative bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 
              text-yellow-900 px-12 py-4 rounded-full 
              shadow-[0_20px_50px_rgba(234,179,8,0.6)] 
              border-y-4 border-yellow-200
            ">
                            <div className="flex items-center gap-3 font-black text-xl uppercase tracking-widest drop-shadow-md">
                                <Key className="w-8 h-8 rotate-90" strokeWidth={3} />
                                <span>Enter</span>
                            </div>
                            <div className="absolute top-2 left-4 right-4 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
                        </div>
                        {/* Key Teeth Visual */}
                        <div className="w-4 h-8 bg-yellow-600 mt-[-2px] rounded-b-lg shadow-lg" />
                    </button>
                </div>
            )}
        </div>
    );
};
