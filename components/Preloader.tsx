"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const text = "Welcome to Planet Shivam";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode='wait'>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1]
                        }
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <div className={styles.loaderWrapper}>
                        <div className="flex flex-row relative">
                            {text.split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    className={styles.loaderLetter}
                                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <div className={styles.loader}></div>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
