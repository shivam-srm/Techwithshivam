"use client";

import { useEffect, useRef } from "react";

export default function GeometricTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particles = useRef<Shape[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    class Shape {
        x: number;
        y: number;
        size: number;
        color: string;
        rotation: number;
        rotationSpeed: number;
        life: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 20 + 10;
            this.color = Math.random() > 0.5 ? "#ff4d5a" : "#00ffd0"; // Theme colors
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
            this.life = 1.0;
        }

        update() {
            this.life -= 0.02; // Fade out
            this.size *= 0.95; // Shrink
            this.rotation += this.rotationSpeed;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2; // Thin geometry
            ctx.globalAlpha = this.life;

            // Draw Diamond/Square
            ctx.beginPath();
            ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.stroke();

            ctx.restore();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particle at mouse position frequently
            if (Math.random() > 0.1) { // 90% chance per frame if moving
                // We only want to spawn if mouse moved or maybe just always decay...
                // Let's spawn if we have a mouse position that isn't 0,0
            }

            // Actually simpler: just spawn one per frame at mouse pos
            if (mouse.current.x !== 0 && mouse.current.y !== 0) {
                particles.current.push(new Shape(mouse.current.x, mouse.current.y));
            }

            // Update and draw
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.update();
                p.draw(ctx);
                if (p.life <= 0 || p.size < 1) {
                    particles.current.splice(i, 1);
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", init);
        window.addEventListener("mousemove", handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", init);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50 mix-blend-screen hidden md:block"
        // z-50 to be on top of everything for the cool trail effect
        />
    );
}
