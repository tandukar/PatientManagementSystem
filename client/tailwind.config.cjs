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
                '30': '20rem',
                '128': '33rem',
                '150': '48rem',
                '200': '69rem',
            },
            height: {
                '329': '25rem',
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