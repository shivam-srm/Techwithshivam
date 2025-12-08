"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
// Removed external dependency to fix build error
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll(); // Note: This defaults to window scroll.
    // In a snap container, this might need the container ref passed down contextually, 
    // but for the "Presentation" feel, even a constant nice flow is good.
    // To make it truly robust in the snap-container, we'd need to track the MAIN element scroll.
    // For now, let's rely on time-based animation + standard velocity which usually captures wheel events too.

    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on
     * the size of the text and viewport. For now, we manually repeat.
     */
    return (
        <div className="parallax">
            <motion.div className="scroller flex flex-nowrap whitespace-nowrap" style={{ x }}>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
                <span className="flex items-center gap-4 text-sm font-bold uppercase text-white tracking-[0.2em] mr-12">{children} </span>
            </motion.div>
        </div>
    );
}

const Star = () => (
    <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="inline-block text-accent mx-2"
    >
        ✦
    </motion.span>
);

export default function InfiniteMarquee() {
    return (
        <section className="w-full py-4 bg-black border-t border-white/20 overflow-hidden relative z-20">
            <ParallaxText baseVelocity={-2}>
                <div className="flex items-center">
                    Web Development <Star /> MERN Stack <Star /> Java <Star /> 3D & Motion (Three.js) <Star /> UI Engineering <Star /> Drone Systems <Star />
                </div>
            </ParallaxText>
        </section>
    );
}

