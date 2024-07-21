import VueDevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import {defineNuxtPlugin} from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueDevUI);
});
