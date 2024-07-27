import type {Overlay} from "klinecharts";
import type {Ref} from "vue";
import type {DropdownItem} from "#ui/types";

export interface KlineChartStoreState {
    overlays: Ref<Overlay[]>;
    asides: Ref<DropdownItem[][]>;
    addOverlays: (overlays: Overlay[]) => void;
    removeOverlays: (overlays: Overlay[]) => void;
    handleSelectAside: (info: any) => any;
}
