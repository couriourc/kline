<script lang="ts" setup>

import {ref} from "vue";

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

const properties = ref([
  {field: "open", header: "开"},
  {field: "close", header: "收"},
  {field: "low", header: "低"},
  {field: "high", header: "高"},
  {field: "volume", header: "成"},
]);
const dataSource = ref([
  {close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204},
  {close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194},
  {close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197},
  {close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28},
  {close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184},
  {close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191},
  {close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105},
  {close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35},
  {close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135},
  {close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76}
]);

</script>
<template>

  <div class="header px-12px flex flex-col items-center h-38px bg-white ">
    <div class="w-full flex ">
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
    <div class="  max-w-400px h-full bg-white">
      <ui-grid-table :data="dataSource" :columns="properties"/>
    </div>
  </div>
</template>
