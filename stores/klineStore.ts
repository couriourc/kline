import type {KlineChartStoreState} from "~/stores/interfaces";
import {defineStore} from 'pinia';
import {shallowRef, triggerRef} from "vue";
import type {DropdownItem} from "#ui/types";
import executeCommand from "~/components/kline/commands";

export const useKlineChartStore = defineStore<"KlineChartStoreState", KlineChartStoreState>(
    "KlineChartStoreState", () => {
        const _overlays = shallowRef([]);
        const _asides = shallowRef([
            [
                {
                    avatar: {
                        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
                    },
                }
            ],
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
                    icon: 'icon-beans',
                    children: [
                        [{
                            label: 'Kline',
                            icon: 'icon-chart',
                        }]
                    ]
                },
            ]
        ] as DropdownItem[][]);

        return {
            overlays: _overlays,
            asides: _asides,
            addOverlays(overlays) {
                overlays.map((overlay, index) => {
                    _overlays.value.push(overlay);
                    overlay.onRemoved = (info) => {
                        console.log(`[🪪]info-->`, info);

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
                executeCommand("createOverlay", {
                    name: 'textInput',
                    onRightClick(info) {
                        console.log(info);
                        return true;
                    }
                });
            }
        };
    });
