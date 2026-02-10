
import React from 'react';
import { Sparkles } from 'lucide-react';

interface RibbonEastProps {
    currentRoom: string;
}

export const RibbonEast: React.FC<RibbonEastProps> = ({ currentRoom }) => {

    // DYNAMIC CONTENT BASED ON ROOM
    const getItemList = () => {
        switch (currentRoom) {
            case 'BOUTIQUE':
                return ['Gowns', 'Tops', 'Skirts', 'Shoes', 'Jewelry', 'Wings'];
            case 'PETS':
                return ['Puppy', 'Kitten', 'Unicorn', 'Bone', 'Soap', 'Brush'];
            case 'STORIES':
                return ['Heart Sticker', 'Star', 'Rainbow', 'Pen', 'Eraser'];
            case 'MAKEUP':
                return ['Lipstick', 'Blush', 'Mascara', 'Glitter', 'Wipes'];
            default:
                return [];
        }
    };

    const items = getItemList();

    if (items.length === 0) return null; // Hide if room has no items

    return (
        <div className="absolute top-24 bottom-32 right-4 w-20 md:w-24 z-40 pointer-events-none flex flex-col items-end">
            {/* DRAWER CONTAINER */}
            <div className="pointer-events-auto bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-white shadow-xl h-full flex flex-col items-center py-4 gap-3 overflow-y-auto no-scrollbar">

                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest writing-vertical-lr rotate-180 py-2">
                    {currentRoom} VAULT
                </div>

                {items.map((item, i) => (
                    <button
                        key={i}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-pink-50 to-white border-2 border-white shadow-sm flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform"
                    >
                        {/* Placeholder Icons (would use real assets) */}
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-300">
                            {item[0]}
                        </div>
                    </button>
                ))}

                <div className="mt-auto">
                    <button className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center animate-spin-slow">
                        <Sparkles size={16} />
                    </button>
                </div>

            </div>
        </div>
    );
};
