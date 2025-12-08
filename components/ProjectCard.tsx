"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    description?: string;
    year?: string;
    category?: string;
    className?: string;
    href?: string;
    image?: string;
}

export default function ProjectCard({
    title,
    description,
    year,
    category,
    className,
    href = "#",
    image
}: ProjectCardProps) {
    return (
        <Link href={href} className="block w-full">
            <motion.div
                whileHover={{ y: -10 }}
                className={cn("group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-full transition-colors hover:border-accent/50 hover:bg-white/10 flex flex-col", className)}
            >
                {/* Image Area if provided */}
                {image && (
                    <div className="relative h-64 w-full overflow-hidden border-b border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        {category && (
                            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
                                {category}
                            </span>
                        )}
                        {year && (
                            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-accent">
                                {year}
                            </span>
                        )}
                    </div>

                    <h3 className="mb-2 text-3xl font-heading font-bold uppercase text-white transition-colors group-hover:text-accent-secondary">
                        {title}
                    </h3>

                    {description && (
                        <p className="max-w-md text-white/60 font-light leading-relaxed mb-6">
                            {description}
                        </p>
                    )}

                    {/* Arrow Icon */}
                    <div className="mt-auto self-end">
                        <div className="text-white/20 transition-all group-hover:text-accent group-hover:translate-x-2">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Gradient Glow on Hover */}
                <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-accent/10 to-transparent rounded-2xl" />
            </motion.div>
        </Link>
    );
}
