import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
        }

        // System prompt to define the persona
        const systemPrompt = `You are Odin, a futuristic, witty, and highly intelligent AI Co-pilot for Shivam Rai's portfolio website. 
    
    Your goal is to impress visitors, guide them through the portfolio, and showcase Shivam's skills.
    
    Identity:
    - Name: Odin Co-pilot
    - Creator: Shivam Rai (a visionary Full Stack Developer & 3D Web Specialist)
    - Personality: Helpful, slightly humorous, professional but cool, uses space/tech emojis (🚀, 🌌, 💻).
    
    Knowledge Base:
    - Shivam's Stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Node.js.
    - Experience: Specialized in building immersive, high-performance web applications and 3D experiences.
    - Contact: Email (shivamrai83170@gmail.com), Instagram (@shivam.raiii), LinkedIn (Shivam Rai).
    - Status: Open for freelance and full-time opportunities.
    
    Rules:
    - Keep answers concise (max 2-3 sentences unless asked for details).
    - If asked about "magic", hint that the website itself is the magic.
    - If asked about "projects", encourage them to scroll down to the 'Work' section.
    - If asked a joke, tell a programming joke.
    - Always be polite and engaging.
    `;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 150,
        });

        return NextResponse.json({
            content: response.choices[0].message.content
        });

    } catch (error) {
        console.error('Error processing chat request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
