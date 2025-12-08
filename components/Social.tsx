"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, Users } from "lucide-react";

export default function Social() {
    const socials = [
        { icon: Youtube, number: "550K+", label: "YouTube Subscribers" },
        { icon: Instagram, number: "150K+", label: "Instagram Followers" },
        { icon: Users, number: "22K+", label: "Community Members" },
    ];

    return (
        <section id="social" className="py-24 bg-gradient-to-br from-[#0a0a0a] to-[#151515] relative overflow-hidden">
            {/* SVG Background pattern sim using CSS/SVG logic from original if needed, or keeping clean */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {socials.map((social, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-12 transition-colors hover:border-accent-secondary hover:shadow-2xl"
                        >
                            <social.icon className="w-12 h-12 mx-auto mb-6 text-accent-secondary" />
                            <h3 className="text-5xl font-bold text-accent-secondary mb-2">{social.number}</h3>
                            <p className="text-lg uppercase tracking-widest text-white/80">{social.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
