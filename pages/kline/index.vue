<template>
  <ClientOnly>
    <VueSplitter class="bg-transparent
    ![&_.splitter]:h-full ![&_.splitter]:bg-blue ![&_.splitter]:w-4px
"
                 @splitter-click="resize"
                 v-model:percent="limitedPercent"
                 initial-percent="95"
    >
      <template #left-pane>
        <lazy-kline :menu-options="actions" ref="chartRef"></lazy-kline>
      </template>
      <template #right-pane>
        <div class="h-full flex  w-full pr-12px active:shadow-lg duration-100ms">
          <div class="h-full w-full flex flex-col gap-2px rounded-l-8px overflow-hidden hover:shadow-lg"
               v-if="!!rightViewKey"
          >
            <div class="header px-12px flex items-center h-38px bg-white ">
              <u-dropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                          :popper="{ placement: 'bottom-start' }">
                <ui-icon icon="chevron-down-2" operable>
                  <template #prefix>
                    自选组
                  </template>
                </ui-icon>

                <template #item="{ item ,}">
                  <span class="truncate">{{ item.label }}</span>
                  <ui-icon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
                </template>
              </u-dropdown>
            </div>
            <div class="header h-full bg-white">
              <lazy-grid-table></lazy-grid-table>
            </div>
          </div>

          <div
              class="w-58px flex-col flex  h-full items-center py-6px  active:shadow-lg duration-100ms bg-#FFF border-l-1 border-gray-100">

            <button
                class="p-2px outline-none
                border-0
                border-transparent
                border-l-1px
                hover:bg-blue-50
                w-full
                rounded-2px
                 border-solid
                peer-[.active]:border-blue group flex items-center flex-center
"
                @click="rightViewKey = !rightViewKey? 'data':null"
            >
              <ui-icon :icon="!!rightViewKey?'nav-expand':'nav-collapse'"

                       class="text-20px  group-hover:drop-shadow-sm  group-hover:text-blue">

              </ui-icon>
            </button>


            <button
                class="p-2px outline-none
                border-0
                border-transparent
                border-l-1px
                hover:bg-blue-50
                w-full
                rounded-2px
                 border-solid
                peer-[.active]:border-blue group flex items-center flex-center
">
              <ui-icon icon="carbon:table"
                       class="text-20px  group-hover:drop-shadow-sm  group-hover:text-blue"></ui-icon>
            </button>
          </div>
        </div>
      </template>
    </VueSplitter>
  </ClientOnly>
</template>
<script setup lang="ts">

import type {KLineChartsRootRef} from "~/components/kline/type";
import VueSplitter from '@rmp135/vue-splitter';

import {computed, ref} from "vue";
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
    percent.value = Math.max(70, Math.min(95, val));
  }
});
const items = [
  [{
    label: '创建新的列表',
    icon: 'carbon:add-filled',

  }], [{
    label: '自选组',
    icon: 'carbon:add-filled',
  }],
];

const rightViewKey = ref<string | null>(null);
watch(rightViewKey, () => {
  if (!rightViewKey.value) {
    limitedPercent.value = 95;
  } else {
    limitedPercent.value = 80;
  }
});
</script>
