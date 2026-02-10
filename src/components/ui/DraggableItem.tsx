import React from 'react';
import { motion } from 'framer-motion';

interface DraggableItemProps {
    id: string;
    icon?: string;
    imageSrc?: string;
    type: 'doll' | 'clothing' | 'pet';
    initialX?: number;
    initialY?: number;
    className?: string; // Allow custom sizing
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, icon, imageSrc, initialX = 0, initialY = 0, className = "" }) => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
            initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`cursor-grab active:cursor-grabbing ${className}`}
            style={{ position: 'relative' }} // Changed from absolute to relative to sit inside Stage properly
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt={id}
                    className="w-full h-full object-contain drop-shadow-xl pointer-events-none"
                    draggable={false}
                />
            ) : (
                <span className="text-6xl filter drop-shadow-xl">{icon}</span>
            )}
        </motion.div>
    );
};
