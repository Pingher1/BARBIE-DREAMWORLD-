import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './features/dreamworld/WelcomeScreen';
import { Playground } from './features/dreamworld/Playground';
import { ToyChest } from './features/dreamworld/ToyChest';
import { SoundManager } from './utils/SoundManager';

function App() {
    const [hasEntered, setHasEntered] = useState(false);
    const [playerName, setPlayerName] = useState('PRINCESS');

    const handleEnter = (name: string) => {
        setPlayerName(name);
        setHasEntered(true);
    };

    return (
        <div className="App relative w-full h-screen overflow-hidden">
            {/* Playground is always rendered behind, or renders after entry */}
            {hasEntered && (
                <>
                    <Playground playerName={playerName} onExit={() => setHasEntered(false)} />
                    {/* Point #8: Toy Chest (World Only) */}
                    <ToyChest onClick={() => SoundManager.playClick()} />
                </>
            )}

            {/* Welcome Screen overlays the playground until entered */}
            <AnimatePresence>
                {!hasEntered && (
                    <WelcomeScreen onEnter={handleEnter} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
