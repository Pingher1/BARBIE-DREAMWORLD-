
import React from 'react';
import { Save, RotateCcw, Volume2, VolumeX, CloudSun, CloudRain, User } from 'lucide-react';

interface RibbonNorthProps {
    childName: string;
    isCartoon: boolean;
    toggleCartoon: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    onSave: () => void;
    onRestore: () => void;
}

export const RibbonNorth: React.FC<RibbonNorthProps> = ({
    childName, isCartoon, toggleCartoon, isMuted, toggleMute, onSave, onRestore
}) => {
    return (
        <div className="absolute top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-50 pointer-events-none">
            {/* BACKGROUND GLASS */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm -z-10 h-32 pointer-events-none" />

            {/* LEFT: IDENTITY BADGE */}
            <div className="pointer-events-auto flex items-center gap-4 bg-white/60 p-2 rounded-full border-2 border-pink-200 shadow-lg backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-pink-300 border-2 border-white overflow-hidden shadow-inner">
                    {/* Dynamic Avatar Placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                        <User className="text-white" size={24} />
                    </div>
                </div>
                <div className="pr-4">
                    <h1 className="font-cursive text-2xl text-pink-600 drop-shadow-sm transform -rotate-1">
                        Princess {childName}
                    </h1>
                    <div className="text-[10px] text-pink-400 font-bold uppercase tracking-widest leading-none">
                        Dreamworld OS v5.0
                    </div>
                </div>
            </div>

            {/* CENTER: REALITY ENGINE SWITCH */}
            <div className="pointer-events-auto flex bg-white/80 rounded-full p-1 shadow-inner border border-pink-100">
                <button
                    onClick={toggleCartoon}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${isCartoon ? 'bg-pink-500 text-white shadow-md scale-105' : 'text-gray-400 hover:text-pink-400'}`}
                >
                    Cartoon
                </button>
                <button
                    onClick={toggleCartoon}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${!isCartoon ? 'bg-purple-600 text-white shadow-md scale-105' : 'text-gray-400 hover:text-purple-400'}`}
                >
                    Royal
                </button>
            </div>

            {/* RIGHT: SYSTEM TOOLS */}
            <div className="pointer-events-auto flex gap-2">
                <ToolButton icon={isMuted ? VolumeX : Volume2} onClick={toggleMute} color="bg-blue-100 text-blue-500 border-blue-200" />
                <ToolButton icon={CloudSun} onClick={() => { }} color="bg-yellow-100 text-yellow-600 border-yellow-200" />
                <div className="w-px h-8 bg-gray-300 mx-1 self-center" />
                <ToolButton icon={RotateCcw} onClick={onRestore} color="bg-gray-100 text-gray-500 border-gray-200" />
                <ToolButton icon={Save} onClick={onSave} color="bg-green-100 text-green-600 border-green-200" />
            </div>
        </div>
    );
};

const ToolButton = ({ icon: Icon, onClick, color }: any) => (
    <button
        onClick={onClick}
        className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-b-4 active:border-b-2 active:translate-y-[2px] transition-all shadow-sm ${color}`}
    >
        <Icon size={20} />
    </button>
);
