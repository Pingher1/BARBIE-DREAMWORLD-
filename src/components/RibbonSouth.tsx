
import React from 'react';
import { Home, Shirt, Dog, FerrisWheel, Mic, Book, Palette, Smartphone } from 'lucide-react';

interface RibbonSouthProps {
    currentRoom: string;
    setRoom: (room: string) => void;
    onPhoneClick: () => void;
}

export const RibbonSouth: React.FC<RibbonSouthProps> = ({ currentRoom, setRoom, onPhoneClick }) => {
    const APPS = [
        { id: 'HOME', label: 'HOME', icon: Home, color: 'text-pink-500' },
        { id: 'BOUTIQUE', label: 'BOUTIQUE', icon: Shirt, color: 'text-purple-500' },
        { id: 'PETS', label: 'PETS', icon: Dog, color: 'text-orange-500' },
        { id: 'PLAYLAND', label: 'PLAYLAND', icon: FerrisWheel, color: 'text-blue-500' },
        { id: 'KARAOKE', label: 'KARAOKE', icon: Mic, color: 'text-red-500' },
        { id: 'STORIES', label: 'STORIES', icon: Book, color: 'text-green-600' },
        { id: 'MAKEUP', label: 'MAKEUP', icon: Palette, color: 'text-rose-500' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 h-28 flex items-end justify-center z-50 pointer-events-none pb-4">

            {/* PHONE FLOAT (Independent) */}
            <div className="absolute right-8 bottom-32 pointer-events-auto animate-bounce-slow">
                <button
                    onClick={onPhoneClick}
                    className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                    <Smartphone size={32} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                </button>
            </div>

            {/* DOCK CONTAINER */}
            <div className="pointer-events-auto bg-white/90 backdrop-blur-xl border-t-2 border-x-2 border-pink-100 rounded-t-[2.5rem] px-8 pb-2 pt-4 shadow-[0_-10px_40px_rgba(236,72,153,0.2)] flex gap-4 items-end">
                {APPS.map((app) => (
                    <DockIcon
                        key={app.id}
                        icon={app.icon}
                        label={app.label}
                        active={currentRoom === app.id}
                        onClick={() => setRoom(app.id)}
                        color={app.color}
                    />
                ))}
            </div>
        </div>
    );
};

const DockIcon = ({ icon: Icon, label, active, onClick, color }: any) => (
    <button
        onClick={onClick}
        className={`group flex flex-col items-center gap-1 transition-all duration-300 ${active ? '-translate-y-4 scale-110' : 'hover:-translate-y-2'}`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-md transition-all ${active ? 'bg-white border-pink-400 shadow-pink-200' : 'bg-pink-50 border-white group-hover:bg-white'}`}>
            <Icon size={24} className={`${active ? color : 'text-gray-400 group-hover:text-pink-300'}`} />
        </div>
        <span className={`text-[9px] font-black tracking-widest transition-colors ${active ? 'text-pink-600' : 'text-gray-300'}`}>
            {label}
        </span>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1" />}
    </button>
);
