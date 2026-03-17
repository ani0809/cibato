import { useEffect, useRef } from 'react';

const HologramGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const gridSize = 50;
        let animationFrame: number;
        let offset = 0;

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                const opacity = 0.05 + Math.sin((x + offset) * 0.01) * 0.03;
                ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Draw horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                const opacity = 0.05 + Math.sin((y + offset) * 0.01) * 0.03;
                ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Add some glowing dots at intersections
            for (let x = 0; x < canvas.width; x += gridSize * 2) {
                for (let y = 0; y < canvas.height; y += gridSize * 2) {
                    const glowIntensity = 0.3 + Math.sin((x + y + offset) * 0.02) * 0.2;
                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3);
                    gradient.addColorStop(0, `rgba(41, 242, 255, ${glowIntensity})`);
                    gradient.addColorStop(1, 'transparent');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            offset += 0.5;
            animationFrame = requestAnimationFrame(drawGrid);
        };

        drawGrid();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.4 }}
        />
    );
};

export default HologramGrid;
