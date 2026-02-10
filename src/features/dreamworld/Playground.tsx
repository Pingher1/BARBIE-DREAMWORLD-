import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { RibbonNorth } from '../../components/layout/RibbonNorth';
import { RibbonSouth } from '../../components/layout/RibbonSouth';
import { RibbonEast } from '../../components/layout/RibbonEast';
import { DraggableItem } from '../../components/ui/DraggableItem';
import { ShowcaseStage } from '../../components/ui/ShowcaseStage';
import { ParticleEffects } from '../../components/effects/ParticleEffects';

import castleBg from '../../assets/castle-bg.png';
import boutiqueBg from '../../assets/boutique-bg.png';
import petParkBg from '../../assets/pet-park-bg.png';

// Official Assets
import realBarbieImg from '../../assets/real-barbie-doll.jpg';
import realFashionImg from '../../assets/real-fashion-set.jpg';
import realPetImg from '../../assets/real-pets.jpg';

interface PlaygroundProps {
    onExit: () => void;
    playerName: string;
}

export const Playground: React.FC<PlaygroundProps> = ({ onExit, playerName }) => {
    const [activeWorld, setActiveWorld] = useState('playground');
    const [customBg, setCustomBg] = useState<string | null>(null);

    // 3D Dreaming: Parallax State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Create a "Universe" depth effect. 
    // Background moves SLOWLY opposite to mouse (far away).
    // Midground (if we had it) moves faster.
    const bgX = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
    const bgY = useTransform(mouseY, [0, window.innerHeight], [20, -20]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Determine background based on active world or custom selection
    const getBackground = () => {
        // If we are in playground and have a custom background, use it
        if (activeWorld === 'playground' && customBg) return customBg;

        switch (activeWorld) {
            case 'boutique': return boutiqueBg;
            case 'pets': return petParkBg;
            default: return castleBg;
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden bg-black/80">
            {/* 3D Universe Background Layer */}
            <motion.div
                key={activeWorld + (customBg || '')}
                initial={{ opacity: 0, scale: 1.1 }} // Scale up slightly to avoid edges showing during parallax
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="absolute inset-[-50px] bg-cover bg-center z-0" // Negative margin to allow movement
                style={{
                    backgroundImage: `url(${getBackground()})`,
                    x: bgX,
                    y: bgY
                }}
            >
                {/* Visual Polish: A subtle vignette to focus the "God Mode" eye on the center */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
            </motion.div>

            {/* UI Layer */}
            <RibbonNorth />
            <RibbonEast onBackgroundSelect={setCustomBg} />
            <RibbonSouth activeWorld={activeWorld} onWorldSelect={(world) => {
                setActiveWorld(world);
                setCustomBg(null); // Reset custom bg when switching worlds
            }} />

            {/* Exit / Rest Button */}
            <button
                onClick={onExit}
                className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 hover:bg-white/40 transition-all z-50 group shadow-lg"
            >
                <span className="text-xl group-hover:scale-110 block transition-transform">🚪</span>
            </button>

            {/* Active World Assets */}
            <AnimatePresence mode='wait'>
                {activeWorld === 'playground' && (
                    <motion.div key="playground-assets" className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="pointer-events-auto relative">
                            {/* Real Barbie Doll in "God Mode" Showcase */}
                            <ShowcaseStage isActive={activeWorld === 'playground'}>
                                <DraggableItem
                                    id="real-barbie"
                                    imageSrc={realBarbieImg}
                                    type="doll"
                                    initialX={0} // Centered by Stage in CSS mostly, but Draggable handles positioning
                                    initialY={0}
                                    className="w-48 h-96 mix-blend-normal drop-shadow-2xl" // Removing multiply to let the stage light hit her
                                />
                            </ShowcaseStage>

                            <DraggableItem id="passport" icon="📖" type="clothing" initialX={100} initialY={window.innerHeight - 150} />
                            <DraggableItem id="pet1" icon="🦄" type="pet" initialX={200} initialY={window.innerHeight - 200} />
                        </div>
                    </motion.div>
                )}

                {activeWorld === 'boutique' && (
                    <motion.div key="boutique-assets" className="absolute inset-0 pointer-events-none">
                        <div className="pointer-events-auto">
                            {/* Fashion Set */}
                            <DraggableItem
                                id="fashion-set"
                                imageSrc={realFashionImg}
                                type="clothing"
                                initialX={window.innerWidth / 2 - 100}
                                initialY={window.innerHeight / 2}
                                className="w-64 h-64 mix-blend-multiply"
                            />

                            <DraggableItem id="shoes1" icon="👠" type="clothing" initialX={500} initialY={window.innerHeight - 200} />
                        </div>
                    </motion.div>
                )}

                {activeWorld === 'pets' && (
                    <motion.div key="pets-assets" className="absolute inset-0 pointer-events-none">
                        <div className="pointer-events-auto">
                            {/* Real Pets */}
                            <DraggableItem
                                id="real-pets"
                                imageSrc={realPetImg}
                                type="pet"
                                initialX={window.innerWidth / 2 - 100}
                                initialY={window.innerHeight - 300}
                                className="w-56 h-56 mix-blend-multiply"
                            />

                            <DraggableItem id="bone" icon="🦴" type="clothing" initialX={window.innerWidth - 150} initialY={window.innerHeight - 150} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
