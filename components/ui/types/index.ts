import type {MenuOption as NMenuOption} from "naive-ui";
import {VNode} from "vue";

export type MenuOption = Omit<NMenuOption, "icon"> & {
    icon: string | (() => VNode);
    onClick?: (option: MenuOption) => any;
}

