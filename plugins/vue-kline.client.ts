import {defineNuxtPlugin} from "nuxt/app";
import overlays from "./extensitons/overlays";
import {registerIndicator, registerOverlay} from "klinecharts";
import indicators from "./extensitons/indicators";

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
