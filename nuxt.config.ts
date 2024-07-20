// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    modules: [
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-swiper',
        'nuxt-bezier',
        '@nuxtjs/i18n',
        "nuxtjs-naive-ui",
        "@nuxt/ui",
    ],
    vite: {
        vue: {
            customElement: true
        },
        vueJsx: {
            mergeProps: true
        },
    },
    unocss: {
        nuxtLayers: true,
    },
    runtimeConfig: {
        public: {
            apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
            apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
        }
    },
    tailwindcss: {
        mode: 'jit',
        quiet: false,
        corePlugins: {
            preflight: false,
        },
        viewer: false,
    },
    imports: {
        autoImport: true,
        scan: false
    },
    i18n: {
        langDir: './locales',
        locales: [
            {
                code: 'zh',
                dir: 'ltr',
                file: 'zh.json',
                name: '中文',
            },

        ]
    },
    build: {
        transpile: ['klinecharts'],
        optimizeDeps: {
            include: ['klinecharts', 'vue3-easy-data-table', '@iconify/vue', 'underscore']
        },
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
    }
});
