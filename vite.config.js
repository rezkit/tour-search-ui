import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        dts(),
        vue(),
    ],

    build: {
        copyPublicDir: false,
        lib: {
            name: 'tour_search_ui',
            entry: resolve(__dirname, 'src/main.ts'),
            fileName: 'toursui',
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.ts'),
            },
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    }
})