<script lang="ts" setup>
import type {MenuOption} from 'naive-ui';
import type {KLineChart, KLineChartsRootRef} from "~/components/kline/type";

defineProps<{
  menuOptions: MenuOption[]
}>();
const chartRef = ref<KLineChart | null>(null);
defineExpose<KLineChartsRootRef>({
  get chart() {
    return chartRef.value.chart as unknown as KLineChart;
  },
  onChartLoad(fn: (chart: KLineChart) => any): void {

  }
});
</script>
<template>
  <KlineContextMenu :menus="menuOptions">
    <template #default="{onContextMenu}">
      <div @contextmenu.prevent.stop="onContextMenu"
           ref="chartContainerRef"
           v-bind="$attrs"
           class="w-full box-border h-screen active:shadow-lg duration-100ms overflow-hidden bg-white rounded-12px">
        <KlineChartsRoot ref="chartRef">
          <KlineChartsIndicator name="BOLL" :args="{isStack:false}"/>
          <KlineChartsIndicator name="VOL" :args="{isStack:true}"/>
          <KlineChartsDataProvider/>
        </KlineChartsRoot>
        <ui-floating-action-button>
          <ul class="p-12px bg-white flex flex-col items-center gap-12px shadow-lg rounded-6px mb-12px">
            <li class="" v-for="i in 4">{{ i }}</li>
          </ul>
          <template #reference>
            <div>
              <u-icon icon="carbon:menu"></u-icon>
            </div>
          </template>
        </ui-floating-action-button>
      </div>
    </template>
  </KlineContextMenu>
</template>
