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
  {field: "stock_code", header: "股票代码"},
  {field: "stock_name", header: "股票名"},
  {field: "code_type", header: "代码类型"},
  {field: "exchange", header: "交易所"},
]);
const dataSource = ref([
  {'stock_code': '16', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '794', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '438', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '712', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '117', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '608', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '587', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '808', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
  {'stock_code': '965', 'stock_name': '中国平安', 'code_type': '股票', 'exchange': 'SZ'},
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
