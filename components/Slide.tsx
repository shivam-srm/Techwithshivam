"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SlideProps {
    children: ReactNode;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

export default function Slide({ children, className = "", id, fullWidth = false }: SlideProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: false });

    return (
        <section
            id={id}
            ref={ref}
            className={`h-screen w-full snap-start snap-always flex flex-col justify-center items-center overflow-hidden relative ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`${fullWidth ? "w-full h-full" : "w-full max-w-7xl mx-auto px-6"} relative z-10`}
            >
                {children}
            </motion.div>
        </section>
    );
}
