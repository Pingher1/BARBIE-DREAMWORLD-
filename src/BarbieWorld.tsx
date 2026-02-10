
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Dog, Camera, Palette, Home, Shirt, FerrisWheel, Mic, Book, ChevronUp, ChevronDown } from 'lucide-react';

// --- BARBIE PLAYHOUSE: SAFE MODE (No External Deps) ---

interface BarbieWorldProps {
    onExit: () => void;
}

export const BarbieWorld: React.FC<BarbieWorldProps> = ({ onExit }) => {
    const [view, setView] = useState<'GATE' | 'HOME' | 'BOUTIQUE' | 'PETS' | 'PLAYLAND' | 'KARAOKE' | 'STORIES' | 'MAKEUP'>('GATE');
    const [childName, setChildName] = useState('');
    const [activeDoll, setActiveDoll] = useState('/assets/dolls/doll1.webp');
    const [showSouthRibbon, setShowSouthRibbon] = useState(true);

    // DOLL ASSET LIST (22 Dolls)
    const DOLL_ASSETS = Array.from({ length: 22 }, (_, i) => ({
        id: `doll${i + 1}`,
        src: `/assets/dolls/doll${i + 1}.webp`,
        name: `Princess ${i + 1}`
    }));

    // Auto-hide South Ribbon after inactivity
    useEffect(() => {
        if (view === 'GATE') return;
        const timer = setTimeout(() => setShowSouthRibbon(false), 8000);
        return () => clearTimeout(timer);
    }, [view, showSouthRibbon]);

    // --- SIMPLIFIED ENTRY HANDLER ---
    const handleEntry = (e: React.FormEvent) => {
        e.preventDefault();
        if (childName.trim().length > 0) {
            setView('HOME');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#ffe6f2] font-sans overflow-hidden select-none text-pink-900">

            {/* BACKGROUND: Static Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5] to-[#ffe6f2] -z-10" />

            {/* TOP HEADER */}
            {view !== 'GATE' && (
                <div className="fixed top-0 left-0 right-0 h-16 md:h-20 flex justify-between items-center px-4 md:px-8 z-40">
                    <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-md border-2 border-pink-200">
                        <h1 className="font-cursive text-xl md:text-3xl text-pink-500 transform -rotate-2">
                            Harmony & {childName || 'Yara'}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={onExit} className="p-2 md:p-3 bg-red-100 rounded-2xl shadow-sm hover:scale-105 border-2 border-red-200 text-red-400">
                            <ArrowLeft size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <div className="w-full h-full">

                {/* --- GATE (Simplified Form) --- */}
                {view === 'GATE' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative z-10 p-4 transition-opacity duration-500">
                        <h1 className="text-4xl md:text-6xl font-black text-pink-500 mb-8 drop-shadow-white tracking-tight text-center font-cursive">
                            Sign In
                        </h1>

                        {/* SIMPLE FORM */}
                        <form onSubmit={handleEntry} className="flex flex-col gap-4 w-full max-w-sm">
                            <input
                                type="text"
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                                placeholder="Enter Princess Name..."
                                className="w-full px-6 py-4 rounded-[2rem] border-4 border-pink-300 text-pink-600 text-center text-xl font-bold bg-white focus:outline-none focus:border-pink-500 shadow-xl placeholder:text-pink-200"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!childName.trim()}
                                className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                            >
                                ENTER PLAYHOUSE
                            </button>
                        </form>
                    </div>
                )}

                {/* --- HOME (Playground) --- */}
                {view === 'HOME' && (
                    <CentralStage>
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <img
                                src="https://images.unsplash.com/photo-1560963689-02e07191147a?w=500&auto=format&fit=crop"
                                className="max-h-[60vh] object-contain drop-shadow-2xl rounded-3xl animate-bounce-slow"
                                alt="Castle"
                            />
                        </div>
                    </CentralStage>
                )}

                {/* --- BOUTIQUE (Grid Only - Stage Disabled temporarily) --- */}
                {view === 'BOUTIQUE' && (
                    <div className="absolute inset-0 pt-20 pb-28 px-2 md:px-4 flex gap-2 md:gap-4">

                        {/* LEFT: DOLL PREVIEW (Simplified) */}
                        <div className="flex-1 relative bg-white/30 rounded-[2rem] border-2 border-white flex items-center justify-center">
                            <img src={activeDoll} className="max-h-[80%] object-contain drop-shadow-xl" />
                            {/* <MagicDollStage activeDoll={activeDoll} /> */}
                        </div>

                        {/* RIGHT: Character Select (2-Column Grid) */}
                        <div className="w-24 md:w-64 bg-white/60 backdrop-blur-md rounded-[2rem] p-2 flex flex-col gap-2 overflow-y-auto z-20 shadow-xl border-2 border-white no-scrollbar">
                            <h3 className="hidden md:block text-center font-bold text-pink-400 tracking-widest uppercase mb-2 text-xs">Collection</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
                                {DOLL_ASSETS.map((doll) => (
                                    <button
                                        key={doll.id}
                                        onClick={() => setActiveDoll(doll.src)}
                                        className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${activeDoll === doll.src ? 'border-pink-500 ring-2 ring-pink-300 scale-105 z-10' : 'border-transparent hover:border-pink-200'}`}
                                    >
                                        <img src={doll.src} className="w-full h-full object-cover" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- OTHER VIEWS (Placeholders) --- */}
                {view === 'PETS' && <SimpleMsg icon={Dog} text="Puppy Bath Time!" color="text-orange-500" />}
                {view === 'PLAYLAND' && <SimpleMsg icon={FerrisWheel} text="Ferris Wheel & Fun!" color="text-purple-500" />}
                {view === 'KARAOKE' && <SimpleMsg icon={Mic} text="Sing Along!" color="text-pink-600" />}
                {view === 'STORIES' && <SimpleMsg icon={Book} text="Once Upon A Time..." color="text-blue-500" />}
                {view === 'MAKEUP' && <SimpleMsg icon={Palette} text="Lipstick & Blush" color="text-red-400" />}

            </div>


            {/* -------------------- SOUTH RIBBON (The Menu) -------------------- */}
            {view !== 'GATE' && (
                <>
                    {/* TRIGGER HANDLE (Visible when Ribbon Hidden) */}
                    {!showSouthRibbon && (
                        <button
                            onClick={() => setShowSouthRibbon(true)}
                            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/80 backdrop-blur rounded-t-xl border-t-2 border-x-2 border-white flex items-center justify-center shadow-lg z-40 animate-bounce-slow"
                        >
                            <ChevronUp size={20} className="text-pink-400" />
                        </button>
                    )}

                    {/* THE RIBBON ITSELF */}
                    {showSouthRibbon && (
                        <div
                            onMouseEnter={() => setShowSouthRibbon(true)}
                            className="fixed bottom-0 left-0 right-0 h-24 md:h-28 z-50 flex items-center justify-center pb-2 md:pb-4 px-2 md:px-4 pointer-events-none transition-transform duration-300"
                        >
                            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_50px_rgba(236,72,153,0.3)] border-2 border-white p-1 md:p-2 flex items-center gap-1 md:gap-4 pointer-events-auto overflow-x-auto max-w-full no-scrollbar">
                                <RibbonBtn icon={Home} label="HOME" active={view === 'HOME'} onClick={() => setView('HOME')} />
                                <RibbonBtn icon={Shirt} label="BOUTIQUE" active={view === 'BOUTIQUE'} onClick={() => setView('BOUTIQUE')} />
                                <RibbonBtn icon={Dog} label="PETS" active={view === 'PETS'} onClick={() => setView('PETS')} />
                                <RibbonBtn icon={FerrisWheel} label="PLAYLAND" active={view === 'PLAYLAND'} onClick={() => setView('PLAYLAND')} />
                                <RibbonBtn icon={Mic} label="KARAOKE" active={view === 'KARAOKE'} onClick={() => setView('KARAOKE')} />
                                <RibbonBtn icon={Book} label="STORIES" active={view === 'STORIES'} onClick={() => setView('STORIES')} />
                                <RibbonBtn icon={Palette} label="MAKEUP" active={view === 'MAKEUP'} onClick={() => setView('MAKEUP')} />

                                <div className="w-px bg-pink-200 mx-1 md:mx-2 h-10" />

                                {/* Collapse Button */}
                                <button onClick={() => setShowSouthRibbon(false)} className="p-2 text-pink-300 hover:text-pink-500 transition-colors">
                                    <ChevronDown size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

        </div>
    );
}

// --- SUB-COMPONENTS ---

const RibbonBtn = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 min-w-[3rem] md:min-w-[5rem] py-1 md:py-2 rounded-2xl transition-all ${active ? 'bg-pink-50' : 'hover:bg-gray-50'}`}>
        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center border-2 ${active ? 'bg-white border-pink-400 text-pink-500 shadow-md' : 'bg-pink-100 border-white text-pink-300'}`}>
            <Icon size={16} className="md:w-6 md:h-6" />
        </div>
        <span className={`text-[8px] md:text-[9px] font-bold tracking-widest ${active ? 'text-pink-500' : 'text-pink-200'}`}>{label}</span>
    </button>
);

const CentralStage = ({ children }: any) => (
    <div className="absolute inset-0 pt-20 pb-28 px-4 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-5xl h-full bg-white/60 backdrop-blur-sm rounded-[3rem] border-4 border-white shadow-xl relative overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-pink-50 opacity-50" />
            {children}
        </div>
    </div>
);

const SimpleMsg = ({ icon: Icon, text, color }: any) => (
    <CentralStage>
        <div className="flex flex-col items-center justify-center h-full animate-bounce-slow">
            <Icon size={80} className={`${color} mb-4 md:mb-8 drop-shadow-md md:w-32 md:h-32`} />
            <h1 className={`text-2xl md:text-4xl font-black ${color} font-cursive text-center px-4`}>{text}</h1>
        </div>
    </CentralStage>
);
