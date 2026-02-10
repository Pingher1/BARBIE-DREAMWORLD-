
import React from 'react';

export const WeatherEngine = ({ type }: { type: 'RAIN' | 'SUN' | 'RAINBOW' }) => {
    if (type === 'SUN') return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {/* CSS FOR RAIN moved to style tag for self-containment */}
            <style>{`
          @keyframes fall {
            0% { transform: translateY(-10vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .rain-drop {
            position: absolute;
            width: 2px;
            height: 15px;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(100,200,255,0.8));
            animation: fall 1s linear infinite;
          }
        `}</style>

            {/* RAIN DROPS */}
            {type === 'RAIN' && Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="rain-drop"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${0.5 + Math.random() * 0.5}s`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}

            {/* RAINBOW */}
            {type === 'RAINBOW' && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] rounded-[100%] border-[20px] md:border-[40px] border-transparent opacity-60 filter blur-xl"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 60%, rgba(255,0,0,0.2) 62%, rgba(255,165,0,0.2) 64%, rgba(255,255,0,0.2) 66%, rgba(0,128,0,0.2) 68%, rgba(0,0,255,0.2) 70%, rgba(75,0,130,0.2) 72%, rgba(238,130,238,0.2) 74%)'
                    }}
                >
                    {/* CSS Gradient Rainbow Arch */}
                    <div className="w-full h-full rounded-[100%] border-[40px] border-double border-transparent"
                        style={{
                            boxShadow: '0 -20px 40px rgba(255,255,255,0.5), inset 0 20px 40px rgba(255,255,255,0.5)'
                        }}
                    />
                </div>
            )}
        </div>
    );
};
