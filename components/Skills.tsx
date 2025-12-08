"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Code2, Globe, Database, Cpu, Palette, Video, Box, Plane, Terminal,
    Layers, Shield, LayoutTemplate, Coffee, Server, Atom, FileCode,
    Camera, Radio, Rocket, Orbit, Zap, GitBranch, Clapperboard
} from "lucide-react";

// Custom Low-Poly Sphere Background SVG
const PolySphere = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fillOpacity="0.9" />
        <path d="M50 0 L50 50 L93.3 25" fill="#ffffff" fillOpacity="0.1" />
        <path d="M6.7 25 L50 50 L50 100" fill="#000000" fillOpacity="0.2" />
        <path d="M6.7 75 L50 100" fill="#000000" fillOpacity="0.3" />
    </svg>
);

const skills = [
    { name: "After Effects", icon: Video, color: "#9999FF" },
    { name: "Premiere Pro", icon: Clapperboard, color: "#D489FF" },
    { name: "Photoshop", icon: Palette, color: "#31A8FF" },
    { name: "Blender", icon: Box, color: "#E87D0D" },
    { name: "Next.js", icon: Zap, color: "#FFFFFF" },
    { name: "React", icon: Atom, color: "#61DAFB" },
    { name: "Node.js", icon: Server, color: "#339933" },
    { name: "HTML5", icon: LayoutTemplate, color: "#E34F26" },
    { name: "CSS3", icon: Palette, color: "#1572B6" },
    { name: "JavaScript", icon: FileCode, color: "#F7DF1E" },
    { name: "MongoDB", icon: Database, color: "#47A248" },
    { name: "Express.js", icon: Cpu, color: "#aaaaaa" },
    { name: "GitHub", icon: GitBranch, color: "#F0F6FC" },
    { name: "Redux", icon: Layers, color: "#764ABC" },
    { name: "MySQL", icon: Database, color: "#4479A1" },
    { name: "Java", icon: Coffee, color: "#E76F00" },
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });
    const momentum = useRef({ x: 0.002, y: 0.002 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - lastMouse.current.x;
        const deltaY = e.clientY - lastMouse.current.y;
        lastMouse.current = { x: e.clientX, y: e.clientY };
        setRotation(prev => ({
            x: prev.x + deltaY * 0.005,
            y: prev.y + deltaX * 0.005
        }));
        momentum.current = { x: deltaY * 0.005, y: deltaX * 0.005 };
    };

    const handleMouseUp = () => isDragging.current = false;

    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            if (!isDragging.current) {
                momentum.current.x *= 0.95;
                momentum.current.y *= 0.95;
                if (Math.abs(momentum.current.x) < 0.001) momentum.current.x = 0.001 * Math.sign(momentum.current.x || 1);
                if (Math.abs(momentum.current.y) < 0.001) momentum.current.y = 0.001 * Math.sign(momentum.current.y || 1);
                setRotation(prev => ({ x: prev.x + momentum.current.x, y: prev.y + momentum.current.y }));
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const points = useMemo(() => {
        const phi = Math.PI * (3.0 - Math.sqrt(5.0));
        const n = skills.length;
        const radius = 220;
        return skills.map((skill, i) => {
            const y = 1 - (i / (n - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            return {
                ...skill,
                x: Math.cos(theta) * radiusAtY * radius,
                y: y * radius,
                z: Math.sin(theta) * radiusAtY * radius
            };
        });
    }, []);

    return (
        <section id="skills" className="min-h-screen py-24 relative flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 w-full h-full">
                <div className="grid lg:grid-cols-12 gap-8 items-center h-full min-h-[600px]">

                    {/* Left Column: Heading & Text */}
                    <div className="lg:col-span-4 relative z-20 pointer-events-none select-none text-left pl-8 md:pl-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-6xl md:text-8xl font-bold font-heading text-white uppercase tracking-tighter leading-none mb-6">
                                Tech <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Cosmos</span>
                            </h2>
                            <p className="text-white/40 text-lg font-mono tracking-widest border-l-2 border-accent pl-4">
                                INTERACTIVE 3D SYSTEM <br />
                                DRAG TO EXPLORE
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: 3D Galaxy */}
                    <div
                        ref={containerRef}
                        className="lg:col-span-8 relative w-full h-[800px] flex items-center justify-center cursor-move"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px] transform-style-3d">
                            {points.map((point, i) => {
                                const cosY = Math.cos(rotation.y);
                                const sinY = Math.sin(rotation.y);
                                const x1 = point.x * cosY - point.z * sinY;
                                const z1 = point.z * cosY + point.x * sinY;
                                const cosX = Math.cos(rotation.x);
                                const sinX = Math.sin(rotation.x);
                                const y1 = point.y * cosX - z1 * sinX;
                                const z2 = z1 * cosX + point.y * sinX;
                                const scale = (400 + z2) / 400;
                                const opacity = Math.max(0.1, (z2 + 220) / 440);

                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute flex flex-col items-center justify-center w-20 h-20 group"
                                        style={{
                                            transform: `translate3d(${x1}px, ${y1}px, 0) scale(${scale})`,
                                            zIndex: Math.floor(z2) + 100,
                                            opacity,
                                        }}
                                    >
                                        {/* The Geometric "Planet" Background */}
                                        <div className="absolute inset-0 text-white/10 group-hover:text-white/20 transition-colors">
                                            <PolySphere className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                                        </div>

                                        {/* Inner Glow (Planet Core) */}
                                        <div
                                            className="absolute inset-4 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"
                                            style={{ backgroundColor: point.color }}
                                        />

                                        {/* Icon */}
                                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                            <point.icon size={28} color={point.color} />
                                        </div>

                                        {/* Label */}
                                        {z2 > 0 && (
                                            <motion.span
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -bottom-6 text-[10px] font-bold tracking-widest text-white/80 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap"
                                            >
                                                {point.name}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
