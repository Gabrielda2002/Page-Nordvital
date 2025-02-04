import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  scripts: [
    {
      src: 'https://code.jquery.com/jquery-3.6.0.min.js',
      defer: true
    }
  ],
  vite: {
    ssr: {
      external: ['jquery']
    }
  }
});