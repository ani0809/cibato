import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    opacity: number;
    scale: number;
}

const CursorParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let particleId = 0;
        const maxParticles = 20;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            setParticles((prev) => {
                const newParticle: Particle = {
                    id: particleId++,
                    x: e.clientX,
                    y: e.clientY,
                    opacity: 1,
                    scale: 1,
                };

                const updated = [...prev, newParticle].slice(-maxParticles);
                return updated;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const interval = setInterval(() => {
            setParticles((prev) =>
                prev
                    .map((p) => ({
                        ...p,
                        opacity: p.opacity - 0.05,
                        scale: p.scale * 0.95,
                    }))
                    .filter((p) => p.opacity > 0)
            );
        }, 50);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* Cursor Glow */}
            <div
                className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    left: mousePos.x - 16,
                    top: mousePos.y - 16,
                    background: 'radial-gradient(circle, rgba(41, 242, 255, 0.6), transparent)',
                    transition: 'left 0.1s, top 0.1s',
                }}
            />

            {/* Particle Trail */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="fixed w-2 h-2 rounded-full pointer-events-none z-[9998]"
                    style={{
                        left: particle.x - 4,
                        top: particle.y - 4,
                        opacity: particle.opacity,
                        transform: `scale(${particle.scale})`,
                        background: `radial-gradient(circle, rgba(0, 200, 255, ${particle.opacity}), transparent)`,
                        transition: 'opacity 0.05s, transform 0.05s',
                    }}
                />
            ))}
        </>
    );
};

export default CursorParticles;
