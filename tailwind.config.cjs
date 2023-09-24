/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                hexedbun: {
                    "primary": "#fdba74",
                    "secondary": "#fb923c",
                    "accent": "#ea580c",
                    "neutral": "#292524",
                    "base-100": "#1c1917",
                    "info": "#0092d6",
                    "success": "#4ade80",
                    "warning": "#fde047",
                    "error": "#dc2626",
                },
            },
        ]
    }
}

