<script lang="ts" setup>

import {injectKlineChart} from "~/components/kline/index";
import type {PaneOptions} from "klinecharts";

const injector = injectKlineChart();
const props = defineProps<{
  name: string,

  args?: {
    [arg: string]: any;
    isStack?: boolean;
    paneOptions?: PaneOptions,
  };
}>();

const indicatorId = ref<string | null>("");
const create = () =>
    indicatorId.value = injector.chart?.createIndicator({
      name: props.name,
      ...(props.args ?? {})
    }, (props.args ?? {}).isStack, props.args?.paneOptions ?? {})!;


onMounted(() => {
  console.log("mounted");

  injector.onChartLoad((chart) => {

  });
});
//onUpdated(() => {
//  if (!indicatorId.value) create();
//});
onBeforeUnmount(() => {
  if (!indicatorId.value) return;
  console.log("rem oveed");
  injector.chart?.removeIndicator(indicatorId.value);
  indicatorId.value = null;
});

</script>

<template></template>
