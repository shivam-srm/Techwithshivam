"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}

export default function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
            particles.current = [];

            const colors = ["rgba(255, 77, 90, 0.8)", "rgba(0, 255, 208, 0.8)", "rgba(255, 255, 255, 0.5)"];

            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connect particles
            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i; j < particles.current.length; j++) {
                    const dx = particles.current[i].x - particles.current[j].x;
                    const dy = particles.current[i].y - particles.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1500})`; // Fade out line
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.current.forEach((p) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction (Repel)
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    p.vx -= Math.cos(angle) * 0.2;
                    p.vy -= Math.sin(angle) * 0.2;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
}
