import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import FloatingOrbs from '@/components/FloatingOrbs';
import MagneticField from '@/components/MagneticField';
import GeometricTrail from '@/components/GeometricTrail';
import ModernGradientBackground from '@/components/ModernGradientBackground';
import Preloader from '@/components/Preloader';
import { ReactLenis } from '@studio-freight/react-lenis';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: 'TechWithShivi | Premium Portfolio',
    description: 'Digital Experience Designer & Developer',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="antialiased selection:bg-accent selection:text-background">
                {/* <ReactLenis root> */}
                {/* Note: ReactLenis might need client component wrapper, we'll implement that later if needed. 
                 For now laying out structure. */}
                <div className="noise-overlay fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <ModernGradientBackground />
                <MagneticField />
                <FloatingOrbs />
                <GeometricTrail />
                <Preloader />
                <Navbar />
                {children}
                {/* </ReactLenis> */}
            </body>
        </html>
    );
}
