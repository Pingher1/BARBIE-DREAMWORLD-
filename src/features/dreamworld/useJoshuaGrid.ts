import { useState, useCallback } from 'react';

// The "Data Tree" Node Structure
export interface JoshuaNode {
    id: string;
    type: 'sector' | 'asset' | 'logic';
    label: string;
    data?: any;
    children?: JoshuaNode[];
}

// The "World State" - Hundreds of Assets
const INITIAL_WORLD_DATA: JoshuaNode = {
    id: 'root',
    type: 'sector',
    label: 'The Kingdom',
    children: [
        {
            id: 'sector-boutique',
            type: 'sector',
            label: 'Royal Boutique',
            children: Array.from({ length: 50 }).map((_, i) => ({
                id: `gown-${i}`,
                type: 'asset',
                label: `Designer Gown ${i + 1}`,
                data: { rarity: 'heirloom', hue: Math.random() * 360 }
            }))
        },
        {
            id: 'sector-pets',
            type: 'sector',
            label: 'Pet Park',
            children: Array.from({ length: 50 }).map((_, i) => ({
                id: `pet-${i}`,
                type: 'asset',
                label: `Magic Pet ${i + 1}`,
                data: { species: 'unicorn', sparkleLevel: Math.random() }
            }))
        }
    ]
};

export const useJoshuaGrid = () => {
    const [worldTree, setWorldTree] = useState<JoshuaNode>(INITIAL_WORLD_DATA);
    const [activeSector, setActiveSector] = useState<string>('root');

    const igniteWorld = useCallback(() => {
        console.log("🔥 JOSHUA GRID IGNITED: Expanding World Tree...");
        // Logic to "explode" the world or load dynamic assets could go here
    }, []);

    return {
        worldTree,
        activeSector,
        setActiveSector,
        igniteWorld
    };
};
