import {defineNuxtPlugin} from "nuxt/app";
import overlays from "./extensitons/overlays";
import {registerFigure, registerIndicator, registerOverlay} from "klinecharts";
import indicators from "./extensitons/indicators";
import figures from "./extensitons/figures";

function registerOverlays() {
    overlays.forEach(registerOverlay);
}

function registerIndicators() {
    indicators.forEach(registerIndicator);
}

function registerFigures() {
    figures.forEach(registerFigure);
}

export default defineNuxtPlugin((nuxtApp) => {

    registerOverlays();
    registerIndicators();
    registerFigures();
});
