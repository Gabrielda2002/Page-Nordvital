import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  scripts: [
    {
      src: 'https://code.jquery.com/jquery-3.6.0.min.js',
      defer: true
    }
  ],
  vite: {
    plugins: [
      tailwindcss()
    ],
    ssr: {
      external: ['jquery']
    }
  }
});