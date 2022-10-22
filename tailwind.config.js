/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                cardBg: 'var(--card-bg)',
                cardActiveBg: 'var(--card-selected-bg)',
                priceColor: 'var(--price-color)',
                priceActiveColor: 'var(--price-active-color)'
            },
            fontFamily: {
                mono: 'var(--font-mono)',
                sans: 'var(--font-sans)'
            }
        }
    }
}