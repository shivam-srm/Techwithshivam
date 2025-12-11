"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Instagram, Linkedin, ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";

export default function Contact() {
    return (
        <section id="contact" className="min-h-[auto] relative flex items-center justify-center py-10 overflow-hidden">
            {/* Spotlight Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">

                {/* Main Heading with Interactive Hover */}
                <div className="mb-8 relative group cursor-default">
                    <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-outfit uppercase leading-[0.9] tracking-tighter">
                        {/* Let's Create - White text that dims on hover */}
                        <div className="block text-white group-hover:text-white/10 transition-colors duration-500">
                            <WaveText text="Let's Create" />
                        </div>

                        {/* Something - Gradient Text */}
                        <div className="block">
                            <WaveText
                                text="Something"
                                className="gradient-text"
                                delay={0.1}
                            />
                        </div>

                        {/* Extraordinary - Gradient Text */}
                        <div className="block">
                            <WaveText
                                text="Extraordinary"
                                className="gradient-text"
                                delay={0.2}
                            />
                        </div>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-base md:text-lg text-white/60 font-light mb-6 tracking-wide max-w-2xl"
                >
                    Get in touch via mail, Instagram, LinkedIn or Github
                </motion.p>

                {/* Magnetic Social Buttons */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    <MagneticButton
                        href="mailto:shivamrai83170@gmail.com"
                        icon={<Mail className="group-hover:text-[#ff4d4d] transition-colors" size={24} />}
                        label="Email"
                        color="#ff4d4d"
                    />
                    <MagneticButton
                        href="https://instagram.com/shivam.raiii"
                        icon={<Instagram className="group-hover:text-[#ff0066] transition-colors" size={24} />}
                        label="Instagram"
                        color="#ff0066"
                    />
                    <MagneticButton
                        href="https://www.linkedin.com/in/shivam-rai-a32b69252/"
                        icon={<Linkedin className="group-hover:text-[#0077b5] transition-colors" size={24} />}
                        label="LinkedIn"
                        color="#0077b5"
                    />
                    <MagneticButton
                        href="https://github.com/shivam-srm"
                        icon={<Github className="group-hover:text-white transition-colors" size={24} />}
                        label="Github"
                        color="#ffffff"
                    />
                </div>

                {/* Interactive Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-white/40 font-light tracking-wide text-sm bg-white/5 px-6 py-2 rounded-full border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm">
                        <span>Created with</span>
                        <motion.div
                            whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-red-500 cursor-help"
                        >
                            ❤️
                        </motion.div>
                        <span>by</span>
                        <span
                            className="cursor-pointer text-white font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300 relative group"
                        >
                            Shivam Rai
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </span>
                    </div>
                    <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">
                        © 2025 All Rights Reserved
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function WaveText({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
    const letters = text.split("");
    const isGradient = className.includes('gradient-text');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            }
        },
        hidden: {
            opacity: 0,
            y: 30,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        }
    };

    const gradientStyle = isGradient ? {
        background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 'bold',
        userSelect: 'none' as const,
    } : {};

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="cursor-default inline-block"
            style={gradientStyle}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block"
                    style={{ whiteSpace: "pre" }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
}

function MagneticButton({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const xVal = e.clientX - (left + width / 2);
        const yVal = e.clientY - (top + height / 2);
        x.set(xVal * 0.35); // Control the magnetic pull strength
        y.set(yVal * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className="group relative flex items-center gap-4 px-8 py-5 rounded-full bg-white/5 border border-white/10 overflow-hidden"
        >
            {/* Hover Glow Background */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: color }}
            />

            {/* Border Glow */}
            <div
                className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[color:var(--hover-color)] transition-colors duration-300"
                style={{ '--hover-color': color } as any}
            />

            <span className="relative z-10">{icon}</span>
            <span className="relative z-10 text-lg font-medium text-white group-hover:text-white transition-colors">
                {label}
            </span>

            <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "auto" }}
                className="relative z-10 overflow-hidden"
            >
                <ArrowUpRight size={18} className="ml-2 text-white/50" />
            </motion.div>
        </motion.a>
    );
}
