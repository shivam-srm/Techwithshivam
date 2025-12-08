"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText((prev) => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 30); // Speed of typing
            return () => clearInterval(timer);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span className="inline-block relative">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle"
            />
        </span>
    );
};

const GlitterText = ({ text }: { text: string }) => {
    return (
        <span className="relative inline-block overflow-hidden">
            <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="block"
            >
                {text}
            </motion.span>
            <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                className="absolute inset-0 bg-white/30 skew-x-12"
                style={{ width: "50%" }}
            />
        </span>
    );
};

const StaggeredWord = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <span className="inline-block">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: delay + i * 0.05, duration: 0.4 }}
                    className="inline-block mr-[0.2em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};


export default function AdvancedHero() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 right-[10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-purple-400 font-bold tracking-[0.2em] text-sm uppercase mb-4 block h-6">
                            <TypewriterText text="designer, drone pilot, & part-time bug killer." delay={0.5} />
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9]">
                            <span className="text-white block overflow-hidden">
                                <GlitterText text="Creative" />
                            </span>
                            {/* Outlined Text Effect */}
                            <span
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"
                                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                            >
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                                    className="block"
                                >
                                    Developer
                                </motion.span>
                            </span>
                        </h1>
                    </motion.div>

                    <div className="text-white/60 max-w-md text-lg leading-relaxed">
                        <StaggeredWord
                            text="Building digital experiences that look good, run fast, and only occasionally explode (far less than my early drones). Converting chaotic ideas into smooth interfaces, flashy visuals, and code so clean it could pass a lab test."
                            delay={1.5}
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href="/resume.pdf"
                            download="Shivam_Rai_Resume.pdf"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-white tracking-wider shadow-lg shadow-purple-900/50 inline-flex items-center gap-3 overflow-hidden"
                        >
                            <span className="relative z-10">RESUME</span>
                            <motion.span
                                initial={{ y: 0 }}
                                whileHover={{ y: 3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative z-10"
                            >
                                <Download size={20} />
                            </motion.span>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                        </motion.a>

                    </div>
                </div>

                {/* Right Graphic (Circle Mask) */}
                <ThreeDImage />


            </div>
        </div >
    );
}

function ThreeDImage() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        const { innerWidth, innerHeight } = window;
        const xPct = clientX / innerWidth - 0.5;
        const yPct = clientY / innerHeight - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            className="relative flex justify-center perspective-1000 w-full h-full"
        >
            {/* The Purple Circle - Background Layer */}
            <motion.div
                style={{ translateZ: -50 }}
                className="w-64 h-64 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] rounded-full bg-[#8b5cf6] flex items-center justify-center relative shadow-2xl shadow-purple-900/50"
            >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614726365723-49cfae96c694?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50" />
                </div>

                {/* Floating Elements on top */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                    style={{ translateZ: 50 }}
                >
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[55rem] md:h-[55rem] mx-auto md:-mr-32 md:right-16 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <Image
                            src="/shivam1.png"
                            alt="Shivam"
                            fill
                            className="object-contain"
                            priority
                        />
                        {/* Enhanced 3D Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-50 rounded-full mix-blend-overlay pointer-events-none" />
                    </div>
                </motion.div>
            </motion.div>
            {/* Floating 'Planet' or orb */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-20 h-20 border-2 border-white/20 rounded-full border-dashed pointer-events-none"
                style={{ translateZ: 20 }}
            />
        </motion.div>
    );
}
