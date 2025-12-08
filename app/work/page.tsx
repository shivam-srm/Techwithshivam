"use client";

import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Slide from '@/components/Slide';

export default function WorkPage() {
    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#050505]">
            <Slide id="work">
                <Work />
            </Slide>

            <Slide id="contact">
                <Contact />
            </Slide>
        </main>
    );
}
