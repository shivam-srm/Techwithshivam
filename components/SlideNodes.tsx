"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
    { id: "hero", label: "Home", number: "01" },
    { id: "about", label: "About", number: "02" },
    { id: "skills", label: "Skills", number: "03" },
    { id: "work", label: "Work", number: "04" },
    { id: "contact", label: "Contact", number: "05" },
];

export default function SlideNodes() {
    const [activeId, setActiveId] = useState("hero");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        slides.forEach((slide) => {
            const el = document.getElementById(slide.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50 hidden md:flex">
            {slides.map((slide) => (
                <button
                    key={slide.id}
                    onClick={() => scrollTo(slide.id)}
                    className="group relative flex items-center justify-end"
                >
                    {/* Hover Label */}
                    <span
                        className={`absolute right-12 px-2 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-mono opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 whitespace-nowrap`}
                    >
                        {slide.label}
                    </span>

                    {/* Numeric Indicator */}
                    <div className="flex flex-col items-center gap-1">
                        <span className={`font-mono text-[10px] transition-colors duration-300 ${activeId === slide.id ? "text-accent font-bold" : "text-white/20"}`}>
                            {slide.number}
                        </span>
                        <motion.div
                            animate={{
                                scale: activeId === slide.id ? 1.5 : 1,
                                backgroundColor: activeId === slide.id ? "#ff4d5a" : "rgba(255,255,255,0.1)",
                                borderColor: activeId === slide.id ? "transparent" : "rgba(255,255,255,0.1)"
                            }}
                            className="w-2 h-2 rounded-full border border-white/20 transition-colors duration-300"
                        />
                    </div>
                </button>
            ))}

            {/* Connecting Line */}
            <div className="absolute top-2 bottom-2 right-[3px] w-[1px] bg-white/5 -z-10" />
        </div>
    );
}
