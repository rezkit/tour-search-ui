import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'
import stylelint from 'vite-plugin-stylelint'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        dts(),
        vue(),
        stylelint({
            build: false,
            include: ['src/**/*.{scss,sass}'],
            lintInWorker: true,
            lintOnStart: true,
        }),
    ],

    build: {
        copyPublicDir: false,
        sourcemap: true,
        lib: {
            name: 'tour_search_ui',
            entry: resolve(__dirname, 'src/main.ts'),
            fileName: 'toursui',
            formats: ['es', 'cjs'],
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
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '@': resolve(__dirname, 'src'),
            'vue': 'vue/dist/vue.esm-bundler.js',
            $fonts: resolve('/src/assets/fonts'),
            $images: resolve('/src/assets/images')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: [
                    '@import "~bootstrap/scss/bootstrap-utilities";' +
                    '@import "src/assets/scss/template/base/mixins";' +
                    '@import "src/assets/scss/template/base/variables";',
                ],
            },
        },
    },
})
