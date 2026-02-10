
import React, { useState, useEffect, useRef } from 'react';
import { SoundManager } from '../utils/SoundManager';

interface Bubble {
  id: number;
  x: number;          // X Position (0-100%)
  y: number;          // Y Position (0-100%)
  size: number;       // Size in Pixels
  vx: number;         // Velocity X (Wind)
  vy: number;         // Velocity Y (Buoyancy/Gravity)
  wobbleOffset: number; // Unique phase for wobble
  wobbleSpeed: number; // Speed of wobble
  opacity: number;    // Translucency
  isPopping: boolean;
}

export const MagicBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const requestRef = useRef<number>();

  // The "Atmosphere" Simulation Paramaters
  const GRAVITY = 0.005; // Slight downward pull
  const WIND_VARIANCE = 0.02; // Random horizontal shifts
  const BUOYANCY_BASE = -0.05; // Base upward force (Helium)
  const THERMAL_POCKETS = [20, 50, 80]; // X-positions where "heat" rises faster

  // 1. Initialize the Sovereign Entities
  useEffect(() => {
    const initialBubbles = Array.from({ length: 15 }).map((_, i) => createAutonomousBubble(i));
    setBubbles(initialBubbles);
  }, []);

  const createAutonomousBubble = (id: number): Bubble => ({
    id,
    x: Math.random() * 100, // Random Start X
    y: Math.random() * 100 + 100, // Start below screen (or random vertically for initial pop)
    size: Math.random() * 80 + 40, // 40px - 120px
    vx: (Math.random() - 0.5) * 0.1, // Slight random drift left/right
    vy: (Math.random() * -0.1) - 0.05, // Upward lift
    wobbleOffset: Math.random() * 100,
    wobbleSpeed: Math.random() * 0.05 + 0.02,
    opacity: Math.random() * 0.3 + 0.1, // 10% - 40% Opacity (Very Translucent/Glassy)
    isPopping: false
  });

  // 2. The Physics Loop (The "Heartbeat")
  const animate = () => {
    setBubbles(prevBubbles => {
      // Logic for Respawning if needed:
      // If a bubble goes off top (y < -20), wrap it to bottom or respawn

      return prevBubbles.map(b => {
        if (b.isPopping) return b; // Don't move popping bubbles

        // A. Apply Forces
        let newVx = b.vx + (Math.random() - 0.5) * WIND_VARIANCE; // Random turbulence
        let newVy = b.vy; // Buoyancy is mostly constant, but let's add "Drafts"

        // Thermal Pockets Logic: If near a "Pocket", rise faster
        // Simple distance check to 20, 50, 80
        const nearPocket = THERMAL_POCKETS.some(p => Math.abs(b.x - p) < 5);
        if (nearPocket) newVy -= 0.002; // Lift!

        // B. Apply Velocity
        let newX = b.x + newVx;
        let newY = b.y + newVy;

        // C. Boundaries (The "World" Limits - Wrap Around)
        if (newY < -20) {
          newY = 120; // Respawn at bottom
          newX = Math.random() * 100; // New X
          newVx = (Math.random() - 0.5) * 0.1; // New Drift
        }
        if (newX > 110) newX = -10;
        if (newX < -10) newX = 110;

        // D. Drag/Friction (Air Resistance)
        newVx *= 0.99;

        return {
          ...b,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          wobbleOffset: b.wobbleOffset + b.wobbleSpeed
        };
      });
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const popBubble = (id: number) => {
    SoundManager.playPop();
    setBubbles(prev => prev.map(b =>
      b.id === id ? { ...b, isPopping: true } : b
    ));
    setTimeout(() => {
      // Respawn logic handled by the loop naturally finding "dead" bubbles or just overwrite here
      setBubbles(prev => prev.map(b => b.id === id ? createAutonomousBubble(Date.now() + Math.random()) : b));
    }, 200);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id)}
          // We use inline styles for the physics updates instead of Classes for smooth frame-rate
          style={{
            position: 'absolute',
            left: `${b.x}% `,
            top: `${b.y}% `,
            width: `${b.size} px`,
            height: `${b.size} px`,
            opacity: b.isPopping ? 0 : b.opacity,
            transform: `scale(${b.isPopping ? 2 : 1 + Math.sin(b.wobbleOffset) * 0.1})`, // Visual Wobble
            transition: b.isPopping ? 'all 0.15s ease-out' : 'none', // Snap movement, smooth pop
            pointerEvents: 'auto',
            cursor: 'pointer',
            borderRadius: '50%',
            // The "God Mode" Shader (Inline to ensure it applies consistently)
            boxShadow: `
                inset 0 40px 100px rgba(255, 255, 255, 0.5),
  inset 10px 0 40px rgba(234, 245, 252, 0.4),
    inset 80px 0 60px rgba(248, 223, 255, 0.4),
      inset - 20px - 60px 60px rgba(253, 244, 214, 0.4),
        0 0 10px rgba(255, 255, 255, 0.4)
          `,
            background: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(1px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          className={b.isPopping ? "bubble-pop" : ""}
        />
      ))}
    </div>
  );
};
