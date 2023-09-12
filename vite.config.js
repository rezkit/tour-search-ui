import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts()
    ],

    build: {
        copyPublicDir: false,
        lib: {
            name: 'tour_search_ui',
            entry: resolve(__dirname, 'src/main.ts'),
            fileName: 'toursui',
        },
    }
})