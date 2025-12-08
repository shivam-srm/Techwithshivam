"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function ModernGradientBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
            {/* 1. Base Gradients (Red Left, Blue Right) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#4d00ff]/20 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow delay-1000" />

            {/* 2. Interactive Mouse Glow - REMOVED per user request */}

            {/* 3. Grid Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"
            />

            {/* 4. Floating Particles */}
            <Particles />
        </div>
    );
}

function Particles() {
    // Generate static particles to avoid heavy hydration mismatch, or use client-side only gen
    // Using a fixed set for simplicity and performance in this demo
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20"
                    style={{
                        top: p.top,
                        left: p.left,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    )
}
