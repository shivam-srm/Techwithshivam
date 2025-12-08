"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrambleText from "./ScrambleText";
import { useRef } from "react";
import Image from "next/image";

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
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
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    return (
        <section id="about" className="h-full min-h-screen py-24 relative overflow-hidden flex items-center">
            {/* Background Grid - HUD Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: 3D Identity Card */}
                    <div className="perspective-1000 flex justify-center lg:justify-start">
                        <TiltCard className="w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 p-1 rounded-2xl group">
                            {/* Glowing Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                            <div className="relative bg-[#0a0a0a] rounded-xl p-8 h-full overflow-hidden">
                                {/* HUD Corners */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/50" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50" />

                                {/* Avatar / Image Placeholder */}
                                <div className="w-32 h-32 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full animate-pulse blur-md opacity-50" />
                                    <div className="relative w-full h-full rounded-full bg-zinc-800 border-2 border-white/20 overflow-hidden flex items-center justify-center">
                                        <Image
                                            src="/shivam2.jpg"
                                            alt="Shivam"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap z-10">
                                        LVL 99 DEV
                                    </div>
                                </div>

                                <div className="text-center space-y-2 mb-8">
                                    <h3 className="text-2xl font-bold text-white"><ScrambleText>Shivam Rai</ScrambleText></h3>
                                    <p className="text-accent font-mono text-sm">FULL STACK OPERATOR</p>
                                </div>

                                <div className="space-y-4 font-mono text-sm text-white/60">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Location</span>
                                        <span className="text-white">Lucknow, Uttar Pradesh</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Status</span>
                                        <span className="text-green-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            Online
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Experience</span>
                                        <span className="text-white">Ready to Deploy 🚀</span>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* Right Column: Bio & Stats */}
                    <div className="space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-mono mb-6">
                                <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                                SYSTEM INITIALIZED
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight">
                                <span className="opacity-50">Decoding</span> <br />
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Future.</span>
                            </h2>
                            <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                                I don't just write code; I architect digital realities.
                                Blending artistic intuition with algorithmic precision to build
                                interfaces that feel alive.
                            </p>
                        </div>

                        {/* Interactive Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "PROJECTS", value: "6+" },
                                { label: "TECHNOLOGIES", value: "20+" },
                                { label: "COMMITMENT", value: "100%" },
                                { label: "CAFFEINE", value: "∞" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    className="p-6 bg-white/[0.02] border border-white/10 rounded-xl group cursor-crosshair transition-colors"
                                >
                                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-mono text-white/40 tracking-widest">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
