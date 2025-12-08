"use client";

import { useEffect, useRef } from "react";

export default function MagneticField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const mouse = useRef({ x: 0, y: 0 });
    const points = useRef<Point[]>([]);

    class Point {
        x: number;
        y: number;
        ox: number; // Original X
        oy: number; // Original Y
        vx: number;
        vy: number;
        size: number;
        color: string;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.ox = x;
            this.oy = y;
            this.vx = 0;
            this.vy = 0;
            this.size = 1.5;
            this.color = "rgba(255, 255, 255, 0.15)";
        }

        update(mx: number, my: number) {
            const dx = mx - this.x;
            const dy = my - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDistance = 150;
            const force = 10;

            let tx = this.ox;
            let ty = this.oy;

            // Magnetic repulsion/attraction
            if (distance < forceDistance) {
                const angle = Math.atan2(dy, dx);
                // Move AWAY from mouse (ripple)
                tx = this.ox - Math.cos(angle) * force * (1 - distance / forceDistance);
                ty = this.oy - Math.sin(angle) * force * (1 - distance / forceDistance);
            }

            // Spring physics to return to original position
            const ax = (tx - this.x) * 0.1;
            const ay = (ty - this.y) * 0.1;

            this.vx += ax;
            this.vy += ay;

            this.vx *= 0.85; // Friction
            this.vy *= 0.85;

            this.x += this.vx;
            this.y += this.vy;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
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
            points.current = [];
            const gap = 40; // Grid spacing

            for (let x = 0; x < canvas.width; x += gap) {
                for (let y = 0; y < canvas.height; y += gap) {
                    points.current.push(new Point(x, y));
                }
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            points.current.forEach((p) => {
                p.update(mouse.current.x, mouse.current.y);
                p.draw(ctx);
            });

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
            className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay"
        />
    );
}
