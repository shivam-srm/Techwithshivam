"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export default function FlowField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initialize Noise
        const noise3D = createNoise3D();

        let particles: Particle[] = [];
        const particleCount = 1000; // High count for fluid look
        const colors = ["#ff4d5a", "#00ffd0", "#ffffff", "#4d00ff"];
        let time = 0;

        // Configuration
        const zoom = 0.003; // Scale of the noise
        const speed = 0.001; // Speed of noise evolution
        const force = 2; // Speed of particles

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            life: number;
            maxLife: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 0;
                this.maxLife = Math.random() * 200 + 100;
            }

            update(width: number, height: number, noiseVal: number) {
                // Calculate angle from noise
                const angle = noiseVal * Math.PI * 4;

                // Add velocity vector
                this.vx += Math.cos(angle) * 0.1;
                this.vy += Math.sin(angle) * 0.1;

                // Friction
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Move
                this.x += this.vx * force;
                this.y += this.vy * force;

                // Wrap around
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;

                // Age
                this.life++;
                if (this.life > this.maxLife) {
                    this.life = 0;
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = 0;
                    this.vy = 0;
                }
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = this.color;
                // Fade out based on life
                context.globalAlpha = 1 - (this.life / this.maxLife);
                context.fill();
                context.globalAlpha = 1;
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;

            // Trail effect: instead of clearRect, we draw a semi-transparent rect
            ctx.fillStyle = "rgba(5, 5, 5, 0.05)"; // Match bg color with low opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Get noise value at particle position
                const noiseVal = noise3D(p.x * zoom, p.y * zoom, time * speed);
                p.update(canvas.width, canvas.height, noiseVal);
                p.draw(ctx);
            });

            time++;
            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", init);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", init);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
        />
    );
}
