export default function Work() {
    return (
        <section id="work" className="min-h-screen pt-24 pb-10 relative overflow-hidden">
            {/* Ambient Background - Removed for transparency */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 w-full">

                {/* Mobile Header (Visible only on small screens) */}
                <div className="md:hidden mb-8 text-center">
                    <h2 className="text-3xl font-bold font-heading text-white uppercase tracking-widest">
                        Selected Works
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16">
                    {/* Left Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:flex flex-col items-center justify-center h-full gap-2"
                    >
                        {"SELECTED".split("").map((char, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold font-heading text-white uppercase leading-none select-none">
                                {char}
                            </span>
                        ))}
                    </motion.div>

                    {/* Central Grid */}
                    <div className="flex-1 max-w-5xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {projects.map((project, index) => (
                                <HolographicCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right Vertical Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:flex flex-col items-center justify-center h-full gap-2"
                    >
                        {"WORKS".split("").map((char, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-500 uppercase leading-none select-none">
                                {char}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
