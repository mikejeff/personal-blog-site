// @ts-check
import { defineConfig } from 'astro/config';
import sugarcube from "@sugarcube-sh/vite";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://mikejeff.com",
  integrations: [preact()],
  vite: {
    plugins: [sugarcube()],
  },
});
