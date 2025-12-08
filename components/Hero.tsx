"use client";

import { motion } from "framer-motion";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl"
            >
                <motion.p variants={itemVariants} className="mb-6 text-xl tracking-[0.2em] text-accent uppercase font-medium">
                    Designer & Developer
                </motion.p>

                <motion.h1 variants={itemVariants} className="mb-8 font-heading text-6xl font-black uppercase leading-[0.9] md:text-9xl tracking-tighter mix-blend-difference">
                    WHO THE FUCK IS<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
                        ALEX MORGAN?
                    </span>
                </motion.h1>

                <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
                    Full Stack Developer & UI/UX Designer crafting robust, scalable and visually appealing applications for startups to Fortune 500s.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-12">
                    <a href="#work" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:pr-12 hover:border-accent">
                        <span>See My Work</span>
                        <span className="absolute right-4 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-accent">
                            →
                        </span>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
