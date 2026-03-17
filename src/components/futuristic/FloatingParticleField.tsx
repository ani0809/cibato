import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

const FloatingParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        };

        const createParticles = () => {
            if (!canvas) return;
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.5 - 0.2,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.5 ? '#00C8FF' : '#7A3CFF'
                });
            }
        };

        resizeCanvas();
        setIsReady(true);
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Pulsing opacity
                particle.opacity = 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.3;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                const alpha = Math.max(0, Math.min(255, Math.floor(particle.opacity * 255)));
                ctx.fillStyle = `${particle.color}${alpha.toString(16).padStart(2, '0')}`;
                ctx.fill();

                // Draw glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 4
                );
                const glowAlpha = Math.max(0, Math.min(100, Math.floor(particle.opacity * 100)));
                gradient.addColorStop(0, `${particle.color}${glowAlpha.toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles
                particles.forEach((otherParticle, otherIndex) => {
                    if (otherIndex <= index) return;

                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        const lineOpacity = Math.max(0, Math.min(1, (1 - distance / 150) * 0.2));
                        ctx.strokeStyle = `rgba(0, 200, 255, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ opacity: 0.6 }}
        />
    );
};

export default FloatingParticleField;
