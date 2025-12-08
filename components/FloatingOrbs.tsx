"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function FloatingOrbs() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse movement to create a fluid lag/parallax feel
    const springConfig = { damping: 25, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Center the coordinate system for better parallax calculations
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX - innerWidth / 2);
            mouseY.set(e.clientY - innerHeight / 2);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const orbs = [
        // Original Red/Teal Theme
        {
            width: "40vw", // Responsive width
            height: "40vw",
            color: "rgba(255, 77, 90, 0.15)", // Vivid Red
            top: "10%",
            left: "20%",
            depth: 0.05, // Moves slowly (far away)
            duration: 25,
        },
        {
            width: "30vw",
            height: "30vw",
            color: "rgba(0, 255, 208, 0.15)", // Vivid Teal
            top: "60%",
            left: "70%",
            depth: 0.08,
            duration: 30,
        },
        // New Colors: Violets & Purples
        {
            width: "50vw",
            height: "50vw",
            color: "rgba(120, 40, 255, 0.1)", // Deep Violet
            top: "20%",
            left: "80%",
            depth: 0.12, // Moves faster (closer)
            duration: 35,
        },
        {
            width: "25vw",
            height: "25vw",
            color: "rgba(255, 0, 128, 0.1)", // Hot Pink/Magenta
            top: "80%",
            left: "15%",
            depth: 0.06,
            duration: 28,
        },
        // Subtle fills
        {
            width: "60vw",
            height: "60vw",
            color: "rgba(0, 255, 208, 0.05)", // Large fainter teal
            top: "-20%",
            left: "-10%",
            depth: 0.03,
            duration: 40,
        },
        {
            width: "35vw",
            height: "35vw",
            color: "rgba(100, 100, 255, 0.08)", // Blue-ish
            top: "40%",
            left: "40%",
            depth: 0.09,
            duration: 22,
        }
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {orbs.map((orb, i) => (
                <ParallaxOrb key={i} orb={orb} mouseX={springX} mouseY={springY} />
            ))}
        </div>
    );
}

function ParallaxOrb({ orb, mouseX, mouseY }: { orb: any, mouseX: any, mouseY: any }) {
    // Create parallax movement opposite to mouse (-1 * depth)
    const x = useTransform(mouseX, (val: number) => val * -orb.depth);
    const y = useTransform(mouseY, (val: number) => val * -orb.depth);

    return (
        <motion.div
            style={{
                x,
                y,
                top: orb.top,
                left: orb.left,
                width: orb.width,
                height: orb.height,
                opacity: 0.8, // Base opacity, handled by rgba
            }}
            className="absolute"
        >
            <motion.div
                animate={{
                    y: [0, -100, 0, 100, 0], // Increased range from 30 to 100
                    x: [0, 50, 0, -50, 0], // Increased range from 20 to 50
                    scale: [1, 1.2, 1, 0.8, 1], // More visible breathing
                    opacity: [0.8, 0.5, 0.8], // Add pulsing opacity
                }}
                transition={{
                    duration: orb.duration * 0.8, // Speed it up slightly
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                    filter: "blur(50px)",
                    mixBlendMode: "screen", // Key for that glowing overlap look
                }}
            />
        </motion.div>
    );
}
