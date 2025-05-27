/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Colores principales de Nordvital
                nordvital: {
                    primary: '#049ae7',    // Azul principal
                    secondary: '#6fbda7',  // Verde secundario
                    teal: {
                        400: '#5eaaa0',     // Teal claro
                        500: '#14b8a6',     // Teal medio
                        600: '#0d9488',     // Teal oscuro
                    },
                    gray: {
                        50: '#f9fafb',
                        100: '#f3f4f6',     
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827',
                    },
                    blue: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        500: '#3b82f6',
                        600: '#2563eb',
                    },
                    indigo: {
                        100: '#e0e7ff',
                        500: '#6366f1',     
                        600: '#4f46e5',
                        700: '#4338ca',
                    },
                    red: {
                        50: '#fef2f2',
                        300: '#fca5a5',
                        500: '#ef4444',
                        600: '#dc2626',
                    },
                    green: {
                        500: '#10b981',
                        700: '#047857',
                    },
                    sky: {
                        500: '#0ea5e9',    
                        600: '#0284c7',
                    }
                }
            }
        },
    },
    plugins: [],
}