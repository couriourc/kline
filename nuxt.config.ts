// https://nuxt.com/docs/api/configuration/nuxt-config
import {buildLocalIconNames} from "./assets/scripts/buildIcons";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    modules: [
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-swiper',
        'nuxt-bezier',
        "nuxtjs-naive-ui",
        "@nuxt/ui",
    ],


    imports: {
        dirs: ['stores'],
        global: true,
        autoImport: true,
        scan: false
    },
    experimental: {
        renderJsonPayloads: false
    },
    typescript: {
        shim: false,
        typeCheck: false
    },
    hooks: {
        'build:before': () => {
            buildLocalIconNames();
        },
    },
    vueuse: {
        ssrHandlers: true,
    },

    pinia: {
        disableVuex: true,
    },
    sourcemap: {
        server: true,
        client: false,
    },
    ui: {
        icons: ['heroicons', 'simple-icons'],
        safelistColors: ['primary', 'red', 'orange', 'green']
    },
    vite: {
        vue: {
            customElement: true
        },
        vueJsx: {
            mergeProps: true
        },
        optimizeDeps: {
            exclude: ['@iconify/vue'],
            include: ['klinecharts', 'vue3-easy-data-table', 'underscore']
        },
    },
    runtimeConfig: {
        public: {
            apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
            apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
        }
    },
    tailwindcss: {
        mode: 'jit',
        quiet: true,
        corePlugins: {
            preflight: false,
        },
        viewer: false,
    },
    unocss: {},
//    i18n: {
//        langDir: './locales',
//        locales: [
//            {
//                code: 'zh',
//                dir: 'ltr',
//                file: 'zh.json',
//                name: '中文',
//            },
//
//        ]
//    },
    build: {
        transpile: ['klinecharts', 'd3'],
    },
    app: {
        head: {
            "meta": [
                {
                    "name": "viewport",
                    "content": "width=device-width, initial-scale=1"
                },
                {
                    "charset": "utf-8"
                }
            ],
        }
    },
    css: [
        '~/assets/scss/reset.scss'
    ],
    icon: {
        mode: 'css',
        provider: 'iconify',
        serverBundle: false,
        customCollections: [
            {
                prefix: 'my-icon',
                dir: './assets/icons'
            }
        ]
    },
    colorMode: {
        disableTransition: true
    },
    future: {
        compatibilityVersion: 4
    },
    typescript: {
        strict: false
    },
});
