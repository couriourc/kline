// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    modules: [
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'radix-vue/nuxt',
        'nuxt-swiper',
        'nuxt-bezier',
        '@nuxtjs/i18n',
        "nuxtjs-naive-ui",
        "@nuxt/ui",
    ],
    unocss: {
        nuxtLayers: true,
    },
    runtimeConfig: {
        public: {
            apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
            apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
        }
    },
    i18n: {
        langDir: './locales',
        locales: [
            {
                code: 'en-GB',
                dir: 'ltr',
                file: 'en-GB.json',
                name: 'English',
                flag: 'gb',
            },
            {
                code: 'zh',
                dir: 'ltr',
                file: 'zh.json',
                name: '中文',
            },

        ]
    },
    build: {
        transpile: ['klinecharts']
    },
    css: [
        '~/assets/scss/reset.scss'
    ]
});
