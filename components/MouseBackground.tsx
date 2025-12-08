"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function MouseBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        function handleMouseMove({ clientX, clientY }: MouseEvent) {
            mouseX.set(clientX);
            mouseY.set(clientY);
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 mix-blend-screen">
            <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 77, 90, 0.25),
              transparent 80%
            )
          `,
                }}
            />
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 255, 208, 0.2),
              transparent 80%
            )
          `,
                }}
            />
        </div>
    );
}
