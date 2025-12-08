"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

interface ScrambleTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function ScrambleText({ children, className = "", delay = 0 }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const maxIterations = 20; // How many scrambles before settling

        // Initial delay
        const startTimeout = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                setDisplayText(
                    children
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return children[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= children.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }

                iteration += 1 / 2; // Speed of decoding
            }, 30);
        }, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isInView, children, delay]);

    return (
        <span ref={ref} className={className}>
            {displayText || children.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")}
        </span>
    );
}
