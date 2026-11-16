// @ts-check
import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
    build: {
        // The page has a single small stylesheet: inlining it in the HTML avoids a
        // render-blocking request (Lighthouse performance on mobile).
        inlineStylesheets: 'always',
    },
    image: {
        // Host of the GDG Community event pictures: allows Astro to download and
        // resize them at build time (see LatestEventStatic.astro).
        domains: ['res.cloudinary.com'],
    },
    vite: {
        plugins: [yaml()],
    },
    integrations: [icon()],
})
