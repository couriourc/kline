<script lang="ts" setup>
import {useKLineTheme} from "~/components/kline/config";
import {useKlineChart} from "~/components/kline/index";
import {useKlineChartLang} from "~/components/kline/lang";
import type {KLineChart, KLineChartsRootRef} from "~/components/kline/type";
import {ActionType, registerIndicator, registerOverlay} from "klinecharts";
import overlays from "~/components/kline/extensitons/overlays";
import indicators from "~/components/kline/extensitons/indicators";

const chartRef = ref<HTMLDivElement>();

const cacheFn = new Set<Function>();

function onSubscribeAction() {

}

type Emits = "OnCrosshairChange" |
    "OnTooltipIconClick" |
    "OnZoom" |
    "OnCandleBarClick" |
    "OnScroll" |
    "OnVisibleRangeChange" |
    "OnDataReady" |
    "OnPaneDrag" | string;

//  bind Action
const actions = new Map([
  ["CrosshairChange", ActionType.OnCrosshairChange],
  ["TooltipIconClick", ActionType.OnTooltipIconClick],
  ["Zoom", ActionType.OnZoom],
  ["CandleBarClick", ActionType.OnCandleBarClick],
  ["Scroll", ActionType.OnScroll],
  ["VisibleRangeChange", ActionType.OnVisibleRangeChange],
  ["DataReady", ActionType.OnDataReady],
  ["PaneDrag", ActionType.OnPaneDrag],
]);
const emits = defineEmits<{
  (e: "CrosshairChange", event: any): void;
  (e: "TooltipIconClick", event: any): void;
  (e: "Zoom", event: any): void;
  (e: "CandleBarClick", event: any): void;
  (e: "Scroll", event: any): void;
  (e: "VisibleRangeChange", event: any): void;
  (e: "DataReady", event: any): void;
  (e: "PaneDrag", event: any): void;
}>();
const {chart} = useKlineChart(chartRef, (chart: KLineChart) => {
  const dom = chart.getDom();
  const size = chart.getSize();
  dom?.setAttribute("width", (`${size?.width}px`) ?? "");
  dom?.setAttribute("height", (`${size?.height}px`) ?? "");
  overlays.forEach(registerOverlay);
  indicators.forEach(registerIndicator);
  // 配置默认指示器
  actions.forEach((rawType: ActionType, type: Emits,) => {
    chart.subscribeAction(rawType, (ev) => {
      emits(type as any, ev);
    });
  });
  cacheFn.forEach(fn => fn(chart));
});
useKLineTheme(chart);
useKlineChartLang();
// Expose
const exposed: KLineChartsRootRef = {
  get chart() {
    return chart.value as KLineChart;
  },
  onChartLoad(fn) {
    cacheFn.add(fn);
    return;
  }
};
defineExpose<KLineChartsRootRef>(exposed);
provide<KLineChartsRootRef>("klinechart", exposed);
onUnmounted(() => {
  cacheFn.clear();
});


</script>
<template>
  <div ref="chartRef" class="w-full h-full">
    <slot></slot>
  </div>
</template>
