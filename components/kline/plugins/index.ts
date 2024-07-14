import type {Chart} from "klinecharts";

export function createIndicator(indicator: "BOLL" | "VOL" | string, ...args: any[]) {
    return (chart?: Chart) => chart?.createIndicator(indicator, ...args);
}
