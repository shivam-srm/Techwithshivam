"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="group relative z-50">
                    <motion.span
                        className="text-lg md:text-2xl font-bold font-outfit tracking-tighter"
                        whileHover={{ scale: 1.05 }}
                    >
                        Shivam<span className="hidden sm:inline"> | TechwithShivu</span><span className="text-accent">.</span>
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <NavLink key={item.name} href={item.href} name={item.name} onClick={(e) => handleScroll(e, item.href)} />
                    ))}
                    <motion.a
                        href="https://wa.me/918317068532"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold font-outfit tracking-wide transition-all"
                    >
                        Let's Talk
                    </motion.a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                >
                    <motion.span
                        animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
                        className="w-8 h-0.5 bg-white origin-center transition-transform"
                    />
                    <motion.span
                        animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                        className="w-8 h-0.5 bg-white transition-opacity"
                    />
                    <motion.span
                        animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
                        className="w-8 h-0.5 bg-white origin-center transition-transform"
                    />
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
                    >
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.3 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className="text-4xl font-bold font-outfit hover:text-accent transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.a
                            href="https://wa.me/918317068532"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="px-8 py-3 rounded-full bg-white text-black font-bold font-outfit"
                        >
                            Let's Talk
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

function NavLink({ href, name, onClick }: { href: string; name: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onClick={onClick}
            className="relative text-sm font-bold text-white/80 hover:text-white transition-colors font-outfit tracking-wide"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {name}
            {/* Animated Underline */}
            <motion.span
                className="absolute -bottom-1 left-0 h-[1px] bg-accent"
                initial={{ width: 0 }}
                animate={{ width: hovered ? "100%" : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </Link>
    );
}
