import type {Overlay} from "klinecharts";
import type {Ref} from "vue";
import type {DropdownItem} from "#ui/types";

export interface KlineChartStoreState {
    overlays: Ref<Overlay[]>;
    asides: Ref<DropdownItem & { children?: (DropdownItem & Record<string, any>)[][] }[][]>;
    addOverlays: (overlays: Overlay[]) => void;
    removeOverlays: (overlays: Overlay[]) => void;
    handleSelectAside: (info: any) => any;
}
