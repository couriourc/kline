import {defineNuxtPlugin} from "nuxt/app";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenu from '@imengyu/vue3-context-menu';

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.use(ContextMenu);
});
