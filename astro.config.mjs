import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nordvitalips.com',
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
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