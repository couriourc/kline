import type {KlineChartStoreState} from "~/stores/interfaces";
import {defineStore} from 'pinia';
import {shallowReactive, shallowRef, triggerRef} from "vue";

export const useKlineChartStore = defineStore<"KlineChartStoreState", KlineChartStoreState>(
    "KlineChartStoreState", () => {
        const _overlays = shallowRef([]);
        return {
            overlays: _overlays,
            addOverlays(overlays) {
                overlays.map((overlay) => {
                    _overlays.value.push(overlay);
                });
                return triggerRef(_overlays);
            }
        };
    });
