<template>
  <ClientOnly>
    <VueSplitter class="bg-transparent" @splitter-click="resize" v-model:percent="limitedPercent"
                 initial-percent="80">
      <template #left-pane>
        <Kline :menu-options="actions" ref="chartRef"></Kline>
      </template>
      <template #right-pane>
        <div class="h-full flex flex-col gap-12px w-full pr-12px  rounded-12px active:shadow-lg duration-100ms">
          <div
              class="h-48px w-full flex-center flex justify-start space-x-2 px-12px  active:shadow-lg duration-100ms bg-#FFF rounded-12px">
            <n-button circle>
              <Icon icon="carbon:4k-filled"/>
            </n-button>
            <n-button circle>
              <Icon icon="carbon:4k-filled"/>
            </n-button>
          </div>
          <n-card class="h-full w-full rounded-12px ">
            <!--            <GridTable></GridTable>-->
            <ul class="h-88vh border-solid flex flex-col gap-12px overflow-y-auto ">
              <li
                  @click="action.onClick()"
                  v-for="action in actions" class="py-12px px-6px hover:bg-green-100  ease-in-out
               duration-200ms transition-background-color rounded-12px cursor-pointer border-solid border-1px border-green
                hover:text-green-700">{{
                  action.label ?? "未定义"
                }}
              </li>
            </ul>
          </n-card>
        </div>
      </template>
    </VueSplitter>
  </ClientOnly>
</template>
<script setup lang="ts">

import type {KLineChartsRootRef} from "~/components/kline/type";
import VueSplitter from '@rmp135/vue-splitter';

import {NButton, NCard} from "naive-ui";

import {computed, ref} from "vue";
import {Icon} from "@iconify/vue";
import overlays, {OVERLAYS_DESCRIPTIONS} from "~/components/kline/extensitons/overlays";
import {useKlineChartMemo} from "~/components/kline/core";

const chartRef = ref<KLineChartsRootRef>();

const percent = ref(85);
const chartMemo = useKlineChartMemo();

function resize() {
  console.log(chartMemo?.chart?.resize());
}

const actions = overlays.map((overlay) => {
  return {
    label: OVERLAYS_DESCRIPTIONS[overlay.name as keyof typeof OVERLAYS_DESCRIPTIONS].name,
    key: overlay.name,
    icon: 'carbon:4k-filled',
    onClick() {
      chartMemo.chart?.createOverlay(overlay.name);
    }
  };
});
const limitedPercent = computed({
  get() {
    return percent.value;
  },
  set(val: number) {
    percent.value = Math.max(70, Math.min(90, val));
  }
});


</script>
