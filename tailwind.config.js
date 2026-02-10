
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'barbie-pink': 'var(--barbie-pink)',
                'digital-pink': 'var(--digital-pink)',
                'soft-pink': 'var(--soft-pink)',
                'gemini-gold': 'var(--gemini-gold)',
                'sovereign-cyan': 'var(--sovereign-cyan)',
                'deep-navy': 'var(--deep-navy)',
                'pure-white': 'var(--pure-white)',
            },
            fontFamily: {
                'royal': ['var(--font-royal)'],
                'clean': ['var(--font-clean)'],
            },
        },
    },
    plugins: [],
}
