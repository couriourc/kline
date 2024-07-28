import type {KlineChartStoreState} from "~/stores/interfaces";
import {defineStore} from 'pinia';
import {shallowRef, triggerRef} from "vue";
import executeCommand from "~/components/kline/commands";

export const useKlineChartStore = defineStore<"KlineChartStoreState", KlineChartStoreState>(
    "KlineChartStoreState", () => {
        const _overlays = shallowRef([]);
        const _asides = shallowRef([
            [
                {
                    icon: 'icon-chart',
                    children: [
                        [{
                            label: '标记文本',
                            icon: 'icon-text',
                            type: 'textInput'
                        }]
                    ]
                },
                {
                    icon: 'clear-style',
                    children: [
                        [{
                            label: '清除标记',
                            icon: 'icon-text',
                            type: 'clear',

                        }]
                    ]
                },
            ]
        ] as unknown as KlineChartStoreState['asides']);

        return {
            overlays: _overlays,
            asides: _asides,
            addOverlays(overlays) {
                overlays.map((overlay, index) => {
                    _overlays.value.push(overlay);
                    overlay.onRemoved = (info) => {
                        overlays.splice(_overlays.value.indexOf(overlay), 1);
                        triggerRef(_overlays);
                        return true;
                    };
                });
                return triggerRef(_overlays);
            },
            removeOverlays(overlay) {
                overlay.forEach((overlay) => {
                    _overlays.value.splice(_overlays.value.indexOf(overlay), 1);
                });
                triggerRef(_overlays);
            },
            handleSelectAside(info) {
                if (!info.type) {
                    return;
                }
                switch (info.type) {
                    case 'clear':
                        _overlays.value.forEach((overlay) => executeCommand("removeOverlay", overlay));
                        break;
                    default:
                        executeCommand("createOverlay", {
                            name: 'textInput',
                            onRightClick(info) {
                                console.log(info);
                                return true;
                            }
                        });

                }

            }
        };
    });
