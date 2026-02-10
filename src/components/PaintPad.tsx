
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, PenTool } from 'lucide-react';

export const PaintPad = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState('#ec4899'); // Default Pink
    const [isDrawing, setIsDrawing] = useState(false);

    // Setup Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineWidth = 5;
            }
        }
    }, []);

    const startDraw = (e: React.MouseEvent) => {
        setIsDrawing(true);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            // Need to offset by the canvas position
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
                ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
            }
        }
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        const rect = canvasRef.current?.getBoundingClientRect();
        if (ctx && rect) {
            ctx.strokeStyle = color;
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        }
    };

    return (
        <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-pink-200 z-50 pointer-events-auto">
            <div className="flex justify-between mb-2">
                <div className="flex gap-2">
                    {['#ec4899', '#a855f7', '#fbbf24', '#3b82f6'].map(c => (
                        <button key={c} onClick={() => setColor(c)} className="w-6 h-6 rounded-full border-2 border-white shadow-md transform hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                    ))}
                </div>
                <button onClick={() => setColor('#ffffff')} className="p-1 hover:bg-gray-100 rounded"><Eraser size={20} className="text-gray-400" /></button>
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                className="bg-gray-50 rounded-xl cursor-crosshair touch-none border-2 border-dashed border-gray-300 w-full h-full"
            />
        </div>
    );
};
