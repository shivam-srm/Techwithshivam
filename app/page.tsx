"use client";

import AdvancedHero from '@/components/AdvancedHero';
import ProjectCard from '@/components/ProjectCard';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Slide from '@/components/Slide';

import InfiniteMarquee from '@/components/InfiniteMarquee';

export default function Home() {
    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#050505]">
            <Slide id="hero" fullWidth>
                <div className="relative w-full h-full flex flex-col justify-center">
                    <AdvancedHero />
                    <div className="absolute bottom-0 left-0 right-0 z-20 w-full">
                        <InfiniteMarquee />
                    </div>
                </div>
            </Slide>

            <Slide id="about">
                <About />
            </Slide>

            <Slide id="skills">
                <Skills />
            </Slide>

            <Slide id="work">
                <Work />
            </Slide>

            <Slide id="contact">
                <Contact />
            </Slide>
        </main>
    );
}
