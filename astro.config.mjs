// @ts-check
import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import icon from 'astro-icon'

import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [yaml()],
    },
    integrations: [
        preact({
            compat: true,
        }),
        icon(),
    ],
})
