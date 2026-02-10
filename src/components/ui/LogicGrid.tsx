import React from 'react';
import { motion } from 'framer-motion';
import { JoshuaNode } from '../../features/dreamworld/useJoshuaGrid';

interface LogicGridProps {
    data: JoshuaNode;
    className?: string;
}

const TreeNode: React.FC<{ node: JoshuaNode; depth: number; x: number; y: number; totalWidth: number }> = ({ node, depth, x, y, totalWidth }) => {
    const childCount = node.children?.length || 0;

    return (
        <group>
            {/* The Node Point */}
            <motion.circle
                cx={x} cy={y} r={depth === 0 ? 15 : 5}
                fill={depth === 0 ? "#F59E0B" : "#E0218A"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: depth * 0.2 }}
            />

            {/* The Label (Only for top levels to avoid clutter) */}
            {depth < 2 && (
                <text x={x} y={y + 20} textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace" className="uppercase tracking-widest opacity-60">
                    {node.label}
                </text>
            )}

            {/* Connections to Children */}
            {node.children?.map((child, i) => {
                const sectorWidth = totalWidth / childCount;
                const childX = x - (totalWidth / 2) + (sectorWidth * i) + (sectorWidth / 2);
                const childY = y + 100;

                return (
                    <React.Fragment key={child.id}>
                        {/* The Wire */}
                        <motion.line
                            x1={x} y1={y} x2={childX} y2={childY}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: depth * 0.2 }}
                        />
                        {/* Recursive Render */}
                        <TreeNode
                            node={child}
                            depth={depth + 1}
                            x={childX}
                            y={childY}
                            totalWidth={sectorWidth}
                        />
                    </React.Fragment>
                );
            })}
        </group>
    );
};

export const LogicGrid: React.FC<LogicGridProps> = ({ data, className = "" }) => {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            <svg className="w-full h-full overflow-visible">
                {/* A Grid Background */}
                <defs>
                    <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />

                {/* The Joshua Tree Visualization */}
                <g transform="translate(0, 100)"> {/* Shift down a bit */}
                    <TreeNode
                        node={data}
                        depth={0}
                        x={window.innerWidth / 2}
                        y={100}
                        totalWidth={window.innerWidth * 0.8}
                    />
                </g>
            </svg>

            {/* Matrix Data Stream Effect (Overlay) */}
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-black/20 to-transparent flex flex-col items-end p-4 font-mono text-xs text-[#00FF9D]/30 opacity-50">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: [0, 1, 0], x: 0 }}
                        transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 5 }}
                    >
                        {`0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
