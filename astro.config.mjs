import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// El adaptador de Netlify arranca un servidor Deno en desarrollo que falla en este equipo.
// Solo se carga en build/deploy.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://cbnunalm.netlify.app',
  output: 'static',
  ...(isDev ? {} : { adapter: netlify() }),
  integrations: [react(), markdoc(), keystatic()],
});
