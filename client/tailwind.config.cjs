/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '128': '33rem',
                '150': '48rem',
            },
            colors: {
                // Configure your color palette here
                'custom-green': '#66bb6a',
                'custom-blue': '#2265CA',
                'custom-blue1': '#628CEA',
                // 'custom-blue1': '#4876db',
            },

        },

    },
    plugins: [],

}