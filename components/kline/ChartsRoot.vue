<script lang="ts" setup>
import {useKLineTheme} from "~/components/kline/config";
import {useKlineChart} from "~/components/kline/core";
import {useKlineChartLang} from "~/components/kline/lang";
import type {KLineChart, KLineChartsRootRef} from "~/components/kline/type";
import {ActionType} from "klinecharts";
import * as fabric from 'fabric';

const chartRef = ref<HTMLDivElement>();

const cacheFn = new Set<Function>();

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
  // 转发 actions
  subscribeActions();
//  ((chart as any).getAllDrawPanes)?.().map(item => {
//      }
//  );

  // 触发 onLoad
  cacheFn.forEach(fn => fn(chart));
});
useKLineTheme(chart);
useKlineChartLang();

function subscribeActions() {
  actions.forEach((rawType: ActionType, type: Emits,) => {
    chart.value!.subscribeAction(rawType, (ev) => {
      emits(type as any, ev);
    });
  });
}

// Expose
const exposed: KLineChartsRootRef = {
  get chart() {
    return chart.value as KLineChart;
  },
  onChartLoad(fn) {
    if (chart.value) {
      fn(chart.value as KLineChart);
      return;
    }
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
