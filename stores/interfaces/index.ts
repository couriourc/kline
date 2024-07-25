import type {Overlay} from "klinecharts";
import type {Ref} from "vue";

export interface KlineChartStoreState {
    overlays: Ref<Overlay[]>;
    addOverlays: (overlays: Overlay[]) => void;
}
