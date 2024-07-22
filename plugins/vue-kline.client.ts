import {defineNuxtPlugin} from "nuxt/app";
import overlays from "~/components/kline/extensitons/overlays";
import {registerIndicator, registerOverlay} from "klinecharts";
import indicators from "~/components/kline/extensitons/indicators";

function registerOverlays() {
    overlays.forEach(registerOverlay);
}

function registerIndicators() {
    indicators.forEach(registerIndicator);
}

export default defineNuxtPlugin((nuxtApp) => {
    registerOverlays();
    registerIndicators();
});
