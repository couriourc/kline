import VueDevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueDevUI);
});
