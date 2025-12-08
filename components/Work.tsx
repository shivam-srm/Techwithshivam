"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Layers } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const projects = [
    {
        id: 1,
        title: "NEON HORIZONS",
        category: "IMMERSIVE WEB EXPERIENCE",
        description: "A futuristic landing page featuring WebGL experiments, interactive heavy particles, and gravity-defying physics.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        tags: ["React", "Three.js", "WebGL", "GSAP"],
        color: "#00f3ff"
    },
    {
        id: 2,
        title: "CYBER ESTATE",
        category: "REAL ESTATE PLATFORM",
        description: "Next-gen property marketplace with VR tours, AI-driven price prediction, and blockchain-based smart contracts.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        tags: ["Next.js", "Solidity", "Tailwind", "Prisma"],
        color: "#ff00aa"
    },
    {
        id: 3,
        title: "QUANTUM DASH",
        category: "SAAS ANALYTICS",
        description: "High-frequency data visualization dashboard processing millions of events in real-time with zero latency.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        tags: ["Vue", "D3.js", "Node.js", "Redis"],
        color: "#aa00ff"
    },
    {
        id: 4,
        title: "AERO VISION",
        category: "DRONE TELEMETRY",
        description: "Advanced flight control interface for autonomous drones, featuring mapping, waypoint navigation and live video feed.",
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2033&auto=format&fit=crop",
        tags: ["TypeScript", "WebSockets", "Mapbox", "ROS"],
        color: "#00ff66"
    }
];

function HolographicCard({ project, index }: { project: typeof projects[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Shine effect
    const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="perspective-1000"
        >
            <motion.div
                ref={ref}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative h-[280px] w-full bg-black/40 rounded-2xl border border-white/10 overflow-hidden cursor-none"
            >
                {/* Background Image with Parallax Depth */}
                <motion.div
                    style={{ translateZ: -50 }}
                    className="absolute inset-0"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </motion.div>

                {/* Holographic Shine */}
                <motion.div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                    style={{
                        background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.4), transparent 60%)`
                    }}
                />

                {/* Content Content floating in 3D */}
                <div className="relative z-20 h-full p-8 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full">
                            <span className="text-xs font-bold tracking-widest text-white uppercase">{project.category}</span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-[-10px] group-hover:translate-y-0">
                            <button className="p-2 rounded-full bg-white text-black hover:scale-110 transition-transform">
                                <Github size={20} />
                            </button>
                            <button className="p-2 rounded-full bg-white text-black hover:scale-110 transition-transform">
                                <ExternalLink size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl sm:text-4xl font-bold font-heading text-white uppercase leading-none" style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}>
                            {project.title}
                        </h3>
                        <p className="text-white/70 line-clamp-3 text-sm font-light leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded bg-black/50 text-white/60">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hover Border Glow */}
                <div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-300 pointer-events-none"
                    style={{ borderColor: project.color }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Work() {
    return (
        <section id="work" className="min-h-screen pt-24 pb-10 relative overflow-hidden">
            {/* Ambient Background - Removed for transparency */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 w-full">

                {/* Mobile Header (Visible only on small screens) */}
                <div className="md:hidden mb-8 text-center">
                    <h2 className="text-3xl font-bold font-heading text-white uppercase tracking-widest">
                        Selected Works
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16">
                    {/* Left Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:flex flex-col items-center justify-center h-full gap-2"
                    >
                        {"SELECTED".split("").map((char, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold font-heading text-white uppercase leading-none select-none">
                                {char}
                            </span>
                        ))}
                    </motion.div>

                    {/* Central Grid */}
                    <div className="flex-1 max-w-5xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {projects.map((project, index) => (
                                <HolographicCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:flex flex-col items-center justify-center h-full gap-2"
                    >
                        {"WORKS".split("").map((char, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-500 uppercase leading-none select-none">
                                {char}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
