<template>
  <ClientOnly>
    <d-splitter class="bg-transparent
    ![&_.splitter]:h-full ![&_.splitter]:bg-blue ![&_.splitter]:w-4px
"
                orientation="horizontal"
                splitBarSize="3px"
    >
      <template v-slot:DSplitterPane>
        <d-splitter-pane minSize="1500px"
                         maxSize="98%"
                         @sizeChange="resize"
                         resizable

        >
          <lazy-kline :menu-options="actions" ref="chartRef"></lazy-kline>
        </d-splitter-pane>
        <!--        <template #left-pane>-->
        <!--        </template>-->
        <d-splitter-pane minSize="60px" max-size="400px"
                         :collapsed="false"
                         collapsible
                         @collapse="()=>rightViewKey=null"
        >
          <div class="h-full flex justify-end w-full  active:shadow-lg duration-100ms">
            <div class="h-full w-full flex flex-col gap-2px rounded-l-8px overflow-hidden hover:shadow-lg"
            >
              <div class="header px-12px flex items-center h-38px bg-white ">
                <u-dropdown :items="items"
                            :ui="{ item: { disabled: 'cursor-text select-text' } }"
                            :popper="{ placement: 'bottom-start' }">
                  <ui-icon icon="chevron-down-2" operable>
                    <template #prefix>
                      自选组
                    </template>
                  </ui-icon>

                  <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>
                    <ui-icon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
                  </template>
                </u-dropdown>
              </div>
              <div class="header min-w-300px max-w-400px h-full bg-white">
                <!--                <lazy-grid-table></lazy-grid-table>-->
                <outline-tree></outline-tree>
              </div>
            </div>
            <div
                class="w-58px flex-col flex  h-full items-center py-6px  active:shadow-lg duration-100ms bg-#FFF border-l-1 border-gray-100">
              <lazy-ui-menu-items :links="links"></lazy-ui-menu-items>
            </div>
          </div>

        </d-splitter-pane>
      </template>
    </d-splitter>
  </ClientOnly>
</template>
<script setup lang="ts">

import type {KLineChartsRootRef} from "~/components/kline/type";

import {computed, ref} from "vue";
import overlays, {OVERLAYS_DESCRIPTIONS} from "~/plugins/extensitons/overlays";
import {useKlineChartMemo} from "~/components/kline/core";
import OutlineTree from "~/pages/kline/outline-tree.vue";

const chartRef = ref<KLineChartsRootRef>();

const percent = ref(98);
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
    percent.value = Math.max(70, Math.min(98, val));
  }
});
const items = [
  [{
    label: '创建新的列表',
    icon: 'carbon:add-filled',

  }],
  [
    {
      label: '自选组',
      icon: 'carbon:add-filled',
    },
    {
      label: '属性树',
      icon: 'carbon:add-filled',
    },
  ],
];

const rightViewKey = ref<string | null>(null);

const links = [
  [
    {}
  ],
  [
    {
      icon: 'icon-beans',
      onClick: () => {
        console.log('beans');
        rightViewKey.value = 'data';
      }
    }
  ]
];
</script>
