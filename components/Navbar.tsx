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

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    return (
        <>
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
                        <motion.button
                            onClick={() => setPaymentModalOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold font-outfit tracking-wide transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                        >
                            <span>☕</span>
                            <span>Buy Coffee</span>
                        </motion.button>
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
                            <motion.button
                                onClick={() => {
                                    setPaymentModalOpen(true);
                                    setMobileMenuOpen(false);
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold font-outfit shadow-lg shadow-orange-500/20 flex items-center gap-2"
                            >
                                <span>☕</span>
                                <span>Buy Coffee</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Payment Modal */}
            <AnimatePresence>
                {paymentModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setPaymentModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-[#121212] border border-white/10 p-8 rounded-3xl max-w-sm w-full relative shadow-2xl flex flex-col items-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setPaymentModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="p-3 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                                    <span className="text-3xl">☕</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white font-outfit">Buy Me a Coffee</h3>
                                <p className="text-white/60 text-sm">Scan with any UPI app to support my work!</p>
                            </div>

                            <div className="p-4 bg-white rounded-xl border-4 border-white/10 shadow-inner">
                                {/* Using qrserver for dynamic QR generation */}
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=shivam983840@ptyes&pn=Shivam%20Rai&cu=INR`}
                                    alt="UPI QR Code"
                                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                                />
                            </div>

                            <div className="flex flex-col items-center gap-2 w-full">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 w-full justify-center group cursor-pointer hover:bg-white/10 transition-colors">
                                    <span className="text-xs text-white/40 uppercase tracking-widest font-mono">UPI ID</span>
                                    <span className="text-white font-mono text-sm select-all">shivam983840@ptyes</span>
                                </div>
                                <a
                                    href="upi://pay?pa=shivam983840@ptyes&pn=Shivam%20Rai&cu=INR"
                                    className="text-yellow-500 hover:text-yellow-400 text-xs font-bold uppercase tracking-wide transition-colors mt-2"
                                >
                                    Tap to Pay (Mobile)
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
