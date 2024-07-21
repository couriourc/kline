import {VNode} from "vue";

export type MenuOption = {
    label: string,
    key?: string,
    icon?: string | (() => VNode);
    onClick?: (option: MenuOption) => any;
    children?: Partial<MenuOption>[];
    href?: string;
}

